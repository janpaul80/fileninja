import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload, File, AlertCircle } from 'lucide-react'
import { FileWithPreview } from '../types'

interface FileDropzoneProps {
    files: FileWithPreview[]
    onFilesAdded: (files: FileWithPreview[]) => void
    onFileRemove: (index: number) => void
    error: string | null
}

const FileDropzone = ({
    files,
    onFilesAdded,
    onFileRemove,
    error
}: FileDropzoneProps) => {
    const MAX_TOTAL_SIZE = 3 * 1024 * 1024 * 1024 // 3GB in bytes

    const totalSize = useMemo(() => {
        const size = files.reduce((acc, file) => {
            console.log('File in totalSize calculation:', file.name, file.size, typeof file.size)
            return acc + (file.size || 0)
        }, 0)
        console.log('Total size calculated:', size)
        return size
    }, [files])

    const isOverLimit = totalSize > MAX_TOTAL_SIZE

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log('Files dropped:', acceptedFiles)
        const filesWithIds: FileWithPreview[] = acceptedFiles.map(file => {
            // Ensure we're properly extending the File object
            const fileWithPreview: FileWithPreview = Object.assign(file, {
                id: Math.random().toString(36).substr(2, 9),
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
            })
            console.log('Processed file:', fileWithPreview)
            return fileWithPreview
        })
        onFilesAdded(filesWithIds)
    }, [onFilesAdded])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    })

    return (
        <div className="space-y-6">
            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={`
           border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
           ${isDragActive
                        ? 'border-ninja-500 bg-ninja-50'
                        : 'border-gray-300 hover:border-ninja-400 hover:bg-gray-50'
                    }
         `}
            >
                <input {...getInputProps()} />

                <div className="space-y-4">
                    <div className="w-16 h-16 bg-ninja-100 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-ninja-600" />
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                        </p>
                        <p className="text-gray-600">
                            or click to browse files
                        </p>
                    </div>

                    <p className="text-sm text-gray-500">
                        Maximum total size: 3GB
                    </p>
                </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Selected Files ({files.length})
                        </h3>
                        <div className="text-sm text-gray-600">
                            Total: {formatFileSize(totalSize)}
                        </div>
                    </div>

                    {/* Size Warning */}
                    {isOverLimit && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <span className="text-red-700 font-medium">
                                    Total file size exceeds 3GB limit. Please remove some files.
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        {files.map((file, index) => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <File className="w-5 h-5 text-ninja-600" />
                                    <div>
                                        <p className="font-medium text-gray-900 truncate max-w-xs">
                                            {file.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onFileRemove(index)}
                                    className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200 disabled:opacity-50"
                                    aria-label={`Remove ${file.name}`}
                                    title={`Remove ${file.name}`}
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Transfer Button - Removed since RecipientForm is always visible */}
                </div>
            )}
        </div>
    )
}

export default FileDropzone
