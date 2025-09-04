import { useState } from 'react'
import { Mail, Plus, X, Send } from 'lucide-react'
import { FileWithPreview } from '../types';

interface RecipientFormProps {
    files: FileWithPreview[]
    onTransferComplete: (transferId: string) => void
    onTransferError: (message: string) => void
}

const RecipientForm = ({
    files,
    onTransferComplete,
    onTransferError
}: RecipientFormProps) => {
    const [fromEmail, setFromEmail] = useState('')
    const [toEmails, setToEmails] = useState([''])
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const addRecipient = () => {
        setToEmails([...toEmails, ''])
    }

    const removeRecipient = (index: number) => {
        if (toEmails.length > 1) {
            setToEmails(toEmails.filter((_, i) => i !== index))
        }
    }

    const updateRecipient = (index: number, value: string) => {
        const newEmails = [...toEmails]
        newEmails[index] = value
        setToEmails(newEmails)
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validateForm = (): boolean => {
        if (!fromEmail || !validateEmail(fromEmail)) {
            onTransferError('Please enter a valid sender email address')
            return false
        }

        // Check if there are any empty or invalid emails
        const emptyEmails = toEmails.some(email => !email.trim())
        if (emptyEmails) {
            onTransferError('Please fill in all recipient email addresses')
            return false
        }

        const invalidEmails = toEmails.some(email => email.trim() && !validateEmail(email.trim()))
        if (invalidEmails) {
            onTransferError('Please enter valid email addresses for all recipients')
            return false
        }

        const validRecipients = toEmails.filter(email => email.trim() && validateEmail(email.trim()))
        if (validRecipients.length === 0) {
            onTransferError('Please enter at least one valid recipient email address')
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        // Notify parent that upload is starting
        onTransferError('') // Clear any previous errors

        try {
            const formData = new FormData()

            // Add files
            files.forEach(file => {
                formData.append('files', file)
            })

            // Add form data
            formData.append('fromEmail', fromEmail)
            formData.append('toEmails', JSON.stringify(toEmails.filter(email => email.trim() && validateEmail(email.trim()))))
            formData.append('message', message)

            const response = await fetch('/api/transfers', {
                method: 'POST',
                body: formData
            })

            // Check if response is ok first
            if (!response.ok) {
                // Try to parse JSON error response
                let errorMessage = `Upload failed: ${response.statusText}`
                try {
                    const errorResult = await response.json()
                    errorMessage = errorResult.message || errorMessage
                } catch (parseError) {
                    // If JSON parsing fails, use the status text
                    console.error('Failed to parse error response:', parseError)
                }
                throw new Error(errorMessage)
            }

            // Parse successful response
            let result
            try {
                result = await response.json()
            } catch (parseError) {
                console.error('Failed to parse success response:', parseError)
                throw new Error('Invalid response from server. Please try again.')
            }

            if (result.success) {
                onTransferComplete(result.transferId)
            } else {
                onTransferError(result.message || 'Transfer failed. Please try again.')
            }
        } catch (error) {
            console.error('Upload error:', error)
            onTransferError(error instanceof Error ? error.message : 'An unexpected error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
            <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Recipient Information
                </h3>
                <p className="text-gray-600">
                    Enter the details for your file transfer
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sender Email */}
                <div>
                    <label htmlFor="fromEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email Address *
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            id="fromEmail"
                            value={fromEmail}
                            onChange={(e) => setFromEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ninja-500 focus:border-ninja-500 transition-colors duration-200"
                            placeholder="your.email@example.com"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                {/* Recipient Emails */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recipient Email Addresses *
                    </label>
                    <div className="space-y-3">
                        {toEmails.map((email, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => updateRecipient(index, e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ninja-500 focus:border-ninja-500 transition-colors duration-200"
                                        placeholder="recipient@example.com"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {toEmails.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeRecipient(index)}
                                        disabled={isSubmitting}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                        aria-label="Remove recipient"
                                        title="Remove recipient"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addRecipient}
                            disabled={isSubmitting}
                            className="flex items-center space-x-2 text-ninja-600 hover:text-ninja-700 font-medium disabled:opacity-50"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add another recipient</span>
                        </button>
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message (Optional)
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ninja-500 focus:border-ninja-500 transition-colors duration-200 resize-none"
                        placeholder="Add a personal message to your recipients..."
                        disabled={isSubmitting}
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary text-lg inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                        <span>
                            {isSubmitting ? 'Sending Files...' : 'Send Files'}
                        </span>
                    </button>

                    {isSubmitting && (
                        <p className="text-sm text-gray-600 mt-3">
                            Please wait while we upload your files and send the transfer...
                        </p>
                    )}
                </div>
            </form>
        </div>
    )
}

export default RecipientForm
