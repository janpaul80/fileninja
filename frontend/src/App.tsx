import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LandingPage from './pages/LandingPage'
import FileTransferApp from './pages/FileTransferApp'
import DownloadPage from './pages/DownloadPage'
import ContactPage from './pages/ContactPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'
import StatusPage from './pages/StatusPage'
import DocumentationPage from './pages/DocumentationPage'
import VideoTutorialsPage from './pages/VideoTutorialsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OAuthSuccessPage from './pages/OAuthSuccessPage'

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<FileTransferApp />} />
                <Route path="/download/:transferId" element={<DownloadPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/docs" element={<DocumentationPage />} />
                <Route path="/videos" element={<VideoTutorialsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/auth/success" element={<OAuthSuccessPage />} />
            </Routes>
        </AuthProvider>
    )
}

export default App
