# FileNinja 🥷

**Send Big Files. The Ninja Way.**

A modern, responsive file transfer application inspired by WeTransfer, built with React, Node.js, and Tailwind CSS. FileNinja allows users to send files up to 3GB for free with no registration required.

## ✨ Features

- **Large File Support**: Transfer files up to 3GB (vs WeTransfer's 2GB limit)
- **No Registration**: Send files immediately without creating an account
- **Drag & Drop**: Intuitive file upload interface
- **Multiple Recipients**: Send to multiple email addresses at once
- **Email Notifications**: Automatic email delivery to recipients
- **7-Day Expiry**: Files automatically expire for security
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, minimalist design with smooth animations

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **React Router** for navigation
- **React Dropzone** for file handling
- **Lucide React** for beautiful icons

### Backend
- **Node.js** with Express.js
- **Multer** for file upload handling
- **Nodemailer** for email notifications
- **Archiver** for ZIP file creation
- **Node-cron** for automated cleanup

## 📁 Project Structure

```
FileNinja/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main application component
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # Node.js backend API
│   ├── src/
│   │   └── server.js        # Express server
│   ├── uploads/             # File storage directory
│   └── package.json
└── package.json             # Root package.json
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FileNinja
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your SMTP settings
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

This will start both the frontend (port 3000) and backend (port 5000) servers concurrently.

## ⚙️ Configuration

### SMTP Setup (Required for Email Notifications)

1. **Gmail Setup** (Recommended for development):
   - Enable 2-factor authentication
   - Generate an App Password
   - Update `backend/.env` with your credentials

2. **Alternative SMTP Services**:
   - SendGrid: `smtp.sendgrid.net`
   - Mailgun: `smtp.mailgun.org`
   - Outlook: `smtp-mail.outlook.com`

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@fileninja.com
```

## 🎯 Usage

### Sending Files

1. **Visit the landing page** at `http://localhost:3000`
2. **Click "Start Your Transfer"** or go to `/app`
3. **Drag & drop files** or click to browse
4. **Enter recipient emails** and optional message
5. **Click "Send Files"** to complete the transfer

### Receiving Files

1. **Recipients receive an email** with download link
2. **Click the download link** to access files
3. **Download all files** as a ZIP archive
4. **Files expire automatically** after 7 days

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon
npm start            # Start production server
```

### API Endpoints

- `POST /api/transfers` - Create a new file transfer
- `GET /api/transfers/:id` - Get transfer information
- `GET /api/transfers/:id/download` - Download files
- `GET /api/health` - Health check endpoint

## 🚀 Production Deployment

### Frontend
```bash
cd frontend
npm run build
# Deploy the `dist/` folder to your hosting service
```

### Backend
```bash
cd backend
npm start
# Use PM2 or similar process manager for production
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Configure production SMTP credentials
- Set `FRONTEND_URL` to your production domain
- Consider using a cloud storage service (AWS S3, Google Cloud Storage)

## 🔒 Security Features

- **File Size Limits**: Strict 3GB total limit enforcement
- **Filename Sanitization**: Prevents directory traversal attacks
- **Automatic Cleanup**: Expired files are automatically deleted
- **Input Validation**: Comprehensive email and file validation
- **CORS Protection**: Configured for security
- **Helmet.js**: Security headers and protection

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: Stacked layout with touch-friendly buttons
- **Tablet**: Optimized spacing and navigation
- **Desktop**: Full-width layout with hover effects

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  'ninja': {
    500: '#0ea5e9',  // Primary blue
    600: '#0284c7',  // Darker blue
    // ... more shades
  }
}
```

### Styling
Modify `frontend/src/index.css` for custom CSS classes and animations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by WeTransfer's clean design
- Built with modern web technologies
- Icons from Lucide React
- Styling with Tailwind CSS

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Made with ❤️ for seamless file sharing**
