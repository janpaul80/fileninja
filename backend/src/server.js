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

// Email configuration (TransIP SMTP)
// Validate required environment variables
if (!process.env.SMTP_HOST) {
    throw new Error('SMTP_HOST environment variable is required')
}
if (!process.env.SMTP_PORT) {
    throw new Error('SMTP_PORT environment variable is required')
}
if (!process.env.SMTP_USER) {
    throw new Error('SMTP_USER environment variable is required')
}
if (!process.env.SMTP_PASS) {
    throw new Error('SMTP_PASS environment variable is required')
}
if (!process.env.SMTP_FROM) {
    throw new Error('SMTP_FROM environment variable is required')
}
if (!process.env.FRONTEND_URL) {
    throw new Error('FRONTEND_URL environment variable is required')
}

const smtpPort = parseInt(process.env.SMTP_PORT)
const isSecurePort = smtpPort === 465

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: isSecurePort, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        // Do not fail on invalid certs (useful for some hosting providers)
        rejectUnauthorized: false
    }
})

// Verify SMTP connection configuration
console.log('📧 SMTP Configuration:')
console.log(`   Host: ${process.env.SMTP_HOST}`)
console.log(`   Port: ${smtpPort}`)
console.log(`   Secure: ${isSecurePort} (${isSecurePort ? 'SSL' : 'STARTTLS'})`)
console.log(`   User: ${process.env.SMTP_USER}`)

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP configuration error:', error.message)
        console.log('📧 Please check your SMTP settings in the .env file')
    } else {
        console.log('✅ SMTP server is ready to send emails')
    }
})

// Generate unique transfer ID
const generateTransferId = () => {
    return crypto.randomBytes(8).toString('hex')
}

// Send email notifications
const sendTransferEmails = async (transferId, fromEmail, toEmails, message) => {
    const downloadUrl = `${process.env.FRONTEND_URL}/download/${transferId}`

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

// OAuth callback routes
app.get('/auth/google/callback', async (req, res) => {
    try {
        const { code } = req.query
        
        if (!code) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_error`)
        }

        // Exchange code for access token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID || '862935629876-7odom0l6c8n502gdh4jsm6vjc9da34n3.apps.googleusercontent.com',
                client_secret: process.env.GOOGLE_SECRET_ID || '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',
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.BACKEND_URL || 'http://localhost:5000'}/auth/google/callback`
            })
        })

        const tokenData = await tokenResponse.json()
        
        if (!tokenData.access_token) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_error`)
        }

        // Get user info from Google
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`
            }
        })

        const userData = await userResponse.json()
        
        // Create user object
        const user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            plan: 'basic',
            provider: 'google'
        }

        // Store user in localStorage via redirect with data
        const userDataEncoded = encodeURIComponent(JSON.stringify(user))
        res.redirect(`${process.env.FRONTEND_URL}/auth/success?user=${userDataEncoded}`)

    } catch (error) {
        console.error('Google OAuth error:', error)
        res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_error`)
    }
})

app.get('/auth/github/callback', async (req, res) => {
    try {
        const { code } = req.query
        
        if (!code) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_error`)
        }

        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.GITHUB_CLIENT_ID || 'Ov23liPNlFEih9qK0oem',
                client_secret: process.env.GITHUB_SECRET_ID || '84972e2b9c9e815c59faf20e987e6919a8ec8507',
                code: code
            })
        })

        const tokenData = await tokenResponse.json()
        
        if (!tokenData.access_token) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_error`)
        }

        // Get user info from GitHub
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        })

        const userData = await userResponse.json()
        
        // Get user email (might be private)
        let email = userData.email
        if (!email) {
            const emailResponse = await fetch('https://api.github.com/user/emails', {
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            })
            const emails = await emailResponse.json()
            const primaryEmail = emails.find(e => e.primary)
            email = primaryEmail ? primaryEmail.email : userData.login + '@github.com'
        }
        
        // Create user object
        const user = {
            id: userData.id.toString(),
            name: userData.name || userData.login,
            email: email,
            plan: 'basic',
            provider: 'github'
        }

        // Store user in localStorage via redirect with data
        const userDataEncoded = encodeURIComponent(JSON.stringify(user))
        res.redirect(`${process.env.FRONTEND_URL}/auth/success?user=${userDataEncoded}`)

    } catch (error) {
        console.error('GitHub OAuth error:', error)
        res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_error`)
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

// Email test endpoint (for debugging SMTP configuration)
app.post('/api/test-email', async (req, res) => {
    try {
        const { to, subject, message } = req.body
        
        if (!to || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: to, subject, message'
            })
        }

        const testEmail = {
            from: process.env.SMTP_FROM || 'noreply@fileninja.com',
            to: to,
            subject: subject,
            html: `
                <h2>FileNinja Email Test</h2>
                <p>${message}</p>
                <p>This is a test email from your FileNinja server.</p>
                <p>Timestamp: ${new Date().toISOString()}</p>
            `
        }

        await transporter.sendMail(testEmail)
        
        res.json({
            success: true,
            message: 'Test email sent successfully'
        })
    } catch (error) {
        console.error('Email test error:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to send test email: ' + error.message
        })
    }
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
