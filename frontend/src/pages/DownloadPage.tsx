import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Download, Mail, Clock, File, ArrowLeft } from 'lucide-react'
import { TransferInfo } from '../types'

const DownloadPage = () => {
    const { transferId } = useParams<{ transferId: string }>()
    const [transferInfo, setTransferInfo] = useState<TransferInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isDownloading, setIsDownloading] = useState(false)

    useEffect(() => {
        if (transferId) {
            fetchTransferInfo()
        }
    }, [transferId])

    const fetchTransferInfo = async () => {
        try {
            const response = await fetch(`/api/transfers/${transferId}`)

            if (!response.ok) {
                if (response.status === 404) {
                    setError('Transfer not found')
                } else if (response.status === 410) {
                    setError('This transfer has expired')
                } else {
                    setError('Failed to load transfer information')
                }
                return
            }

            const data = await response.json()
            setTransferInfo(data)
        } catch (err) {
            console.error('Error fetching transfer info:', err)
            setError('Failed to load transfer information')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDownload = async () => {
        if (!transferId) return

        setIsDownloading(true)
        try {
            const response = await fetch(`/api/transfers/${transferId}/download`)

            if (!response.ok) {
                throw new Error('Download failed')
            }

            // Create a blob from the response and trigger download
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `fileninja-transfer-${transferId}.zip`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (err) {
            console.error('Download error:', err)
            setError('Failed to download files. Please try again.')
        } finally {
            setIsDownloading(false)
        }
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-ninja-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-ninja-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                        <img src="/logo.png" alt="FileNinja Logo" className="w-12 h-auto" />
                    </div>
                    <p className="text-lg text-gray-600">Loading transfer information...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock className="w-8 h-8 text-red-600" />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            {error === 'This transfer has expired' ? 'Transfer Expired' : 'Transfer Not Found'}
                        </h1>

                        <p className="text-gray-600 mb-6">
                            {error === 'This transfer has expired'
                                ? 'This file transfer has expired and the files are no longer available.'
                                : 'The transfer you\'re looking for could not be found.'
                            }
                        </p>

                        <Link
                            to="/"
                            className="btn-primary inline-flex items-center space-x-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Go to FileNinja</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    if (!transferInfo) {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-ninja-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center group">
                            <img 
                                src="/logo.png" 
                                alt="FileNinja" 
                                className="h-12 md:h-14 w-auto group-hover:scale-105 transition-transform duration-200"
                            />
                        </Link>
                        <div className="text-sm text-gray-600">
                            File Transfer
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Transfer Info */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Files Ready for Download
                        </h1>
                        <p className="text-lg text-gray-600">
                            Someone has shared files with you via FileNinja
                        </p>
                    </div>

                    {/* Sender Info */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <Mail className="w-5 h-5 text-ninja-600" />
                            <h3 className="text-lg font-semibold text-gray-900">From</h3>
                        </div>
                        <p className="text-gray-700">{transferInfo.fromEmail}</p>
                        {transferInfo.message && (
                            <div className="mt-3 p-3 bg-white rounded border-l-4 border-ninja-500">
                                <p className="text-gray-700 italic">"{transferInfo.message}"</p>
                            </div>
                        )}
                    </div>

                    {/* Files List */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Files ({transferInfo.files.length})
                        </h3>
                        <div className="space-y-3">
                            {transferInfo.files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                                >
                                    <div className="flex items-center space-x-3">
                                        <File className="w-5 h-5 text-ninja-600" />
                                        <div>
                                            <p className="font-medium text-gray-900">{file.originalName}</p>
                                            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Download Button */}
                    <div className="text-center">
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="btn-primary text-lg inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="w-5 h-5" />
                            <span>
                                {isDownloading ? 'Downloading...' : 'Download All Files'}
                            </span>
                        </button>

                        <p className="text-sm text-gray-500 mt-4">
                            Files will be downloaded as a ZIP archive
                        </p>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-500">
                            This transfer was created with FileNinja - Send big files the ninja way
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DownloadPage
