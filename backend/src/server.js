import express from 'express'
import multer from 'multer'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import nodemailer from 'nodemailer'
import archiver from 'archiver'
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'
import cron from 'node-cron'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
}

// In-memory storage for transfers (in production, use a database)
const transfers = new Map()

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create a temporary directory for files before transfer ID is generated
        const tempDir = path.join(uploadsDir, 'temp')
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true })
        }
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        // Sanitize filename to prevent directory traversal
        const sanitizedName = path.basename(file.originalname).replace(/[^a-zA-Z0-9.-]/g, '_')
        cb(null, `${Date.now()}-${sanitizedName}`)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 3 * 1024 * 1024 * 1024, // 3GB per file
        files: 100 // Maximum 100 files per transfer
    }
})

// Email configuration (configure with your SMTP service)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password'
    }
})

// Generate unique transfer ID
const generateTransferId = () => {
    return crypto.randomBytes(8).toString('hex')
}

// Send email notifications
const sendTransferEmails = async (transferId, fromEmail, toEmails, message) => {
    const downloadUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/download/${transferId}`

    const emailTemplate = `
    <h2>FileNinja - New File Transfer</h2>
    <p>You have received files from <strong>${fromEmail}</strong>.</p>
    ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
    <p>Click the link below to download your files:</p>
    <p><a href="${downloadUrl}" style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Download Files</a></p>
    <p><strong>Important:</strong> This link will expire in 7 days.</p>
    <p>Best regards,<br>The FileNinja Team</p>
  `

    try {
        // Send to recipients
        for (const email of toEmails) {
            await transporter.sendMail({
                from: process.env.SMTP_FROM || 'noreply@fileninja.com',
                to: email,
                subject: 'New File Transfer from FileNinja',
                html: emailTemplate
            })
        }

        // Send confirmation to sender
        await transporter.sendMail({
            from: process.env.SMTP_FROM || 'noreply@fileninja.com',
            to: fromEmail,
            subject: 'FileNinja Transfer Confirmation',
            html: `
        <h2>FileNinja - Transfer Confirmation</h2>
        <p>Your files have been successfully sent to:</p>
        <ul>${toEmails.map(email => `<li>${email}</li>`).join('')}</ul>
        <p>Transfer ID: <strong>${transferId}</strong></p>
        <p>Download link: <a href="${downloadUrl}">${downloadUrl}</a></p>
        <p>Your transfer will expire in 7 days.</p>
        <p>Best regards,<br>The FileNinja Team</p>
      `
        })
    } catch (error) {
        console.error('Email sending failed:', error)
        // Don't fail the transfer if email fails
    }
}

// Cleanup expired transfers
const cleanupExpiredTransfers = () => {
    const now = Date.now()
    const expiredTransfers = []

    for (const [transferId, transfer] of transfers.entries()) {
        if (transfer.expiryDate < now) {
            expiredTransfers.push(transferId)
        }
    }

    expiredTransfers.forEach(transferId => {
        const transfer = transfers.get(transferId)
        if (transfer) {
            // Delete files
            const transferDir = path.join(uploadsDir, transferId)
            if (fs.existsSync(transferDir)) {
                fs.rmSync(transferDir, { recursive: true, force: true })
            }
            // Remove from memory
            transfers.delete(transferId)
        }
    })

    console.log(`Cleaned up ${expiredTransfers.length} expired transfers`)
}

// Schedule cleanup every hour
cron.schedule('0 * * * *', cleanupExpiredTransfers)

// API Routes

// Create a transfer
app.post('/api/transfers', upload.array('files'), async (req, res) => {
    try {
        const { fromEmail, toEmails, message } = req.body
        const files = req.files

        // Debug logging
        console.log('Transfer request received:', {
            fromEmail,
            toEmails,
            message,
            filesCount: files ? files.length : 0,
            bodyKeys: Object.keys(req.body)
        })

        // Validation
        if (!fromEmail || !toEmails || !files || files.length === 0) {
            console.log('Validation failed:', { fromEmail, toEmails, files: !!files, filesLength: files ? files.length : 0 })
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: fromEmail, toEmails, and files are required'
            })
        }

        // Parse toEmails if it's a JSON string
        let recipientEmails
        try {
            recipientEmails = typeof toEmails === 'string' ? JSON.parse(toEmails) : toEmails
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid toEmails format'
            })
        }

        // Validate email formats
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(fromEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid sender email format'
            })
        }

        if (!Array.isArray(recipientEmails) || recipientEmails.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one recipient email is required'
            })
        }

        for (const email of recipientEmails) {
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid recipient email format: ${email}`
                })
            }
        }

        // Calculate total file size
        const totalSize = files.reduce((acc, file) => acc + file.size, 0)
        const maxSize = 3 * 1024 * 1024 * 1024 // 3GB

        if (totalSize > maxSize) {
            return res.status(400).json({
                success: false,
                message: `Total file size (${(totalSize / (1024 * 1024 * 1024)).toFixed(2)}GB) exceeds the 3GB limit`
            })
        }

        // Generate transfer ID
        const transferId = generateTransferId()

        // Move files from temp directory to transfer-specific directory
        const transferDir = path.join(uploadsDir, transferId)
        if (!fs.existsSync(transferDir)) {
            fs.mkdirSync(transferDir, { recursive: true })
        }

        // Move files and update paths
        const movedFiles = []
        for (const file of files) {
            const newPath = path.join(transferDir, path.basename(file.path))
            fs.renameSync(file.path, newPath)
            movedFiles.push({
                originalName: file.originalname,
                path: newPath,
                size: file.size
            })
        }

        // Create transfer record
        const transfer = {
            transferId,
            fromEmail,
            toEmails: recipientEmails,
            message: message || '',
            files: movedFiles,
            expiryDate: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
            createdAt: Date.now()
        }

        // Store transfer
        transfers.set(transferId, transfer)

        // Send email notifications (async, don't wait)
        sendTransferEmails(transferId, fromEmail, recipientEmails, message)

        res.json({
            success: true,
            transferId,
            message: 'Transfer created successfully'
        })

    } catch (error) {
        console.error('Transfer creation error:', error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// Get transfer info
app.get('/api/transfers/:transferId', (req, res) => {
    try {
        const { transferId } = req.params
        const transfer = transfers.get(transferId)

        if (!transfer) {
            return res.status(404).json({
                success: false,
                message: 'Transfer not found'
            })
        }

        // Check if expired
        if (transfer.expiryDate < Date.now()) {
            return res.status(410).json({
                success: false,
                message: 'Transfer has expired'
            })
        }

        res.json({
            fromEmail: transfer.fromEmail,
            message: transfer.message,
            files: transfer.files.map(file => ({
                originalName: file.originalName,
                size: file.size
            })),
            expired: false
        })

    } catch (error) {
        console.error('Transfer info error:', error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// Download files
app.get('/api/transfers/:transferId/download', (req, res) => {
    try {
        const { transferId } = req.params
        const transfer = transfers.get(transferId)

        if (!transfer) {
            return res.status(404).json({
                success: false,
                message: 'Transfer not found'
            })
        }

        // Check if expired
        if (transfer.expiryDate < Date.now()) {
            return res.status(410).json({
                success: false,
                message: 'Transfer has expired'
            })
        }

        // Create ZIP archive
        const archive = archiver('zip', {
            zlib: { level: 9 } // Maximum compression
        })

        // Set response headers
        res.attachment(`fileninja-transfer-${transferId}.zip`)
        res.setHeader('Content-Type', 'application/zip')

        // Pipe archive to response
        archive.pipe(res)

        // Add files to archive
        for (const file of transfer.files) {
            if (fs.existsSync(file.path)) {
                archive.file(file.path, { name: file.originalName })
            }
        }

        // Finalize archive
        archive.finalize()

    } catch (error) {
        console.error('Download error:', error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        transfers: transfers.size
    })
})

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error)
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    })
})

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`🚀 FileNinja server running on port ${PORT}`)
    console.log(`📁 Uploads directory: ${uploadsDir}`)
    console.log(`⏰ Cleanup scheduled every hour`)
})

export default app
