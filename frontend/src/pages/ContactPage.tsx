import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            // In a real application, you would send this to your backend API
            // For now, we'll simulate the submission
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Simulate sending email to hello@fileninja.nl
            console.log('Sending contact form to hello@fileninja.nl:', formData)
            
            setSubmitStatus('success')
            setFormData({ name: '', email: '', message: '' })
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            content: 'hello@fileninja.nl',
            href: 'mailto:hello@fileninja.nl'
        },
        {
            icon: Phone,
            title: 'Phone',
            content: '+31 (0) 20 123 4567',
            href: 'tel:+31201234567'
        },
        {
            icon: MapPin,
            title: 'Address',
            content: 'Amsterdam, Netherlands',
            href: '#'
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-20">
                {/* Hero Section */}
                <section className="section-padding bg-gradient-to-br from-ninja-50 to-ninja-100">
                    <div className="container-max text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Have questions about FileNinja? Need support? Want to discuss a partnership? 
                            We'd love to hear from you.
                        </p>
                    </div>
                </section>

                {/* Contact Form & Info */}
                <section className="section-padding">
                    <div className="container-max">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Contact Form */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                    Send us a Message
                                </h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ninja-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ninja-500 focus:border-transparent transition-all duration-200"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={6}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ninja-500 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                        <span>
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </span>
                                    </button>

                                    {/* Status Messages */}
                                    {submitStatus === 'success' && (
                                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-green-800">
                                                Thank you! Your message has been sent successfully. We'll get back to you soon.
                                            </p>
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-red-800">
                                                Sorry, there was an error sending your message. Please try again or contact us directly.
                                            </p>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                    Contact Information
                                </h2>
                                
                                <div className="space-y-8">
                                    {contactInfo.map((info, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-ninja-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <info.icon className="w-6 h-6 text-ninja-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {info.title}
                                                </h3>
                                                <a
                                                    href={info.href}
                                                    className="text-ninja-600 hover:text-ninja-700 transition-colors duration-200"
                                                >
                                                    {info.content}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Additional Info */}
                                <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Business Hours
                                    </h3>
                                    <p className="text-gray-600 mb-2">
                                        Monday - Friday: 9:00 AM - 6:00 PM CET
                                    </p>
                                    <p className="text-gray-600">
                                        We typically respond within 24 hours during business days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default ContactPage
