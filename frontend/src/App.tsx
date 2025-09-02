import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FileTransferApp from './pages/FileTransferApp'
import DownloadPage from './pages/DownloadPage'
import ContactPage from './pages/ContactPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'
import StatusPage from './pages/StatusPage'

function App() {
    return (
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
        </Routes>
    )
}

export default App
