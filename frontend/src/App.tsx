import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FileTransferApp from './pages/FileTransferApp'
import DownloadPage from './pages/DownloadPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<FileTransferApp />} />
            <Route path="/download/:transferId" element={<DownloadPage />} />
        </Routes>
    )
}

export default App
