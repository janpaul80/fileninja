# FileNinja

FileNinja is a file transfer app for sending large files through a simple upload flow. I built it as a WeTransfer style project with a React frontend and a Node backend.

The goal is to make file sending feel quick: drop files in, add recipients, send the link, and let the backend handle email, expiry, and cleanup.

## What it does

- Upload large files through a drag and drop interface
- Send files to one or more recipients
- Create download links for shared files
- Send email notifications through SMTP
- Expire files after a set period
- Clean up old uploads on a schedule
- Keep the frontend and backend separated for easier deployment

## Tech stack

- React, TypeScript, Vite
- Tailwind CSS and React Router
- Node.js and Express
- Multer for uploads
- Nodemailer for email
- Archiver for ZIP support
- node-cron for cleanup jobs

## Run it locally

```bash
git clone https://github.com/janpaul80/fileninja.git
cd fileninja
npm run install:all
npm run dev
```

The frontend runs on `http://localhost:3000`.
The backend runs on `http://localhost:5000`.

## Environment

Create a backend environment file:

```bash
cd backend
cp env.example .env
```

Example values:

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@fileninja.com
```

Use test mail credentials while developing. Do not commit real SMTP passwords.

## Useful scripts

```bash
npm run dev           # Start frontend and backend together
npm run dev:frontend  # Start only the frontend
npm run dev:backend   # Start only the backend
npm run build         # Build the frontend
npm run start         # Start the backend
npm run install:all   # Install root, frontend, and backend packages
```

## Notes

This repo currently has generated dependency folders committed in its history, which makes cloning slower than it should be. A good cleanup step would be removing `node_modules` from git and keeping only the lock files.

## Status

Prototype. The app is useful as a file sharing demo, but production use needs storage limits, virus scanning, stronger download permissions, rate limits, and a real object storage backend.
