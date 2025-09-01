import { useState } from 'react'
import { CheckCircle, Copy, Download, RefreshCw, Zap } from 'lucide-react'

interface TransferSuccessProps {
    transferId: string
    onReset: () => void
}

const TransferSuccess = ({ transferId, onReset }: TransferSuccessProps) => {
    const [copied, setCopied] = useState(false)
    const downloadUrl = `${window.location.origin}/download/${transferId}`

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(downloadUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Success Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>

                    {/* Success Message */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Transfer Complete! 🎉
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Your files have been successfully uploaded and sent to your recipients.
                    </p>

                    {/* Transfer ID */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-600 mb-2">Transfer ID:</p>
                        <p className="font-mono text-lg font-semibold text-gray-900 break-all">
                            {transferId}
                        </p>
                    </div>

                    {/* Download Link */}
                    <div className="bg-ninja-50 rounded-lg p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Download Link
                        </h3>
                        <div className="flex items-center space-x-2 mb-4">
                            <input
                                type="text"
                                value={downloadUrl}
                                readOnly
                                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg font-mono text-sm"
                                aria-label="Download link"
                                title="Download link"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="px-4 py-3 bg-ninja-600 hover:bg-ninja-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                            >
                                <Copy className="w-4 h-4" />
                                <span>{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                        <p className="text-sm text-gray-600">
                            Share this link with your recipients to download the files
                        </p>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                        <div className="flex items-start space-x-3">
                            <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-white text-xs">!</span>
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-yellow-800 mb-1">Important:</p>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• Your transfer link will expire in 7 days</li>
                                    <li>• Recipients will receive an email with the download link</li>
                                    <li>• Files are automatically deleted after expiration</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center space-x-2"
                        >
                            <Download className="w-5 h-5" />
                            <span>Test Download</span>
                        </a>

                        <button
                            onClick={onReset}
                            className="btn-secondary inline-flex items-center space-x-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            <span>Send More Files</span>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <Zap className="w-5 h-5 text-ninja-500" />
                        <span className="text-sm">Powered by FileNinja</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransferSuccess
