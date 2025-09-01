// Demo Configuration for FileNinja
// This file contains demo settings for testing without email configuration

export const demoConfig = {
    // Demo mode - disables email sending
    demoMode: true,

    // Demo transfer settings
    demoTransfers: [
        {
            id: 'demo123',
            fromEmail: 'demo@fileninja.com',
            toEmails: ['recipient@example.com'],
            message: 'This is a demo transfer from FileNinja!',
            files: [
                { name: 'demo-document.pdf', size: 1024 * 1024 },
                { name: 'demo-image.jpg', size: 2 * 1024 * 1024 }
            ],
            createdAt: Date.now(),
            expiryDate: Date.now() + (7 * 24 * 60 * 60 * 1000)
        }
    ],

    // Demo file limits
    maxFileSize: 3 * 1024 * 1024 * 1024, // 3GB
    maxFiles: 100,

    // Demo cleanup interval (5 minutes for demo)
    cleanupInterval: '*/5 * * * *'
}

// To use demo mode, uncomment the following in server.js:
/*
import { demoConfig } from './demo-config.js'

if (demoConfig.demoMode) {
  console.log('🎭 Running in DEMO MODE - Email notifications disabled')
  console.log('📧 Configure SMTP settings in .env to enable email notifications')
}
*/
