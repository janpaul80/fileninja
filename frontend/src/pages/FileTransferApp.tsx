import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import RecipientForm from '../components/RecipientForm'
import TransferSuccess from '../components/TransferSuccess'
import { FileWithPreview } from '../types'

const FileTransferApp = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [transferId, setTransferId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFilesAdded = (newFiles: FileWithPreview[]) => {
        console.log('Files added to state:', newFiles)
        setFiles(prev => {
            const updatedFiles = [...prev, ...newFiles]
            console.log('Updated files state:', updatedFiles)
            return updatedFiles
        })
        setError(null)
    }

    const handleFileRemove = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleTransferComplete = (id: string) => {
        setTransferId(id)
    }

    const handleTransferError = (message: string) => {
        setError(message)
    }



    const handleReset = () => {
        setFiles([])
        setTransferId(null)
        setError(null)
    }

    if (transferId) {
        return <TransferSuccess transferId={transferId} onReset={handleReset} />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-ninja-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <img 
                                src="/logo.png" 
                                alt="FileNinja" 
                                className="h-12 md:h-14 w-auto"
                            />
                        </div>
                        <div className="text-sm text-gray-600">
                            Up to 3GB • No signup required
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Send Your Files
                    </h1>
                    <p className="text-lg text-gray-600">
                        Drag and drop your files below, or click to browse
                    </p>
                </div>

                {/* File Dropzone */}
                <FileDropzone
                    files={files}
                    onFilesAdded={handleFilesAdded}
                    onFileRemove={handleFileRemove}
                    error={error}
                />

                {/* Recipient Form */}
                {files.length > 0 && (
                    <RecipientForm
                        files={files}
                        onTransferComplete={handleTransferComplete}
                        onTransferError={handleTransferError}
                    />
                )}

                {/* Error Display */}
                {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">!</span>
                            </div>
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default FileTransferApp
