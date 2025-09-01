export interface FileWithPreview extends File {
    preview?: string
    id: string
}

export interface TransferData {
    fromEmail: string
    toEmails: string[]
    message: string
    files: FileWithPreview[]
}

export interface TransferResponse {
    success: boolean
    transferId: string
    message?: string
}

export interface TransferInfo {
    fromEmail: string
    message: string
    files: Array<{
        originalName: string
        size: number
    }>
    expired: boolean
}
