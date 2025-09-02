import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ChevronDown, Search, FileText, Upload, Download, Shield, Clock } from 'lucide-react'

const HelpPage = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const faqCategories = [
        {
            title: 'Getting Started',
            icon: FileText,
            faqs: [
                {
                    question: 'How do I start using FileNinja?',
                    answer: 'Simply visit our app page, drag and drop your files, enter recipient emails, and click send. No registration required!'
                },
                {
                    question: 'What file types are supported?',
                    answer: 'FileNinja supports all file types including documents, images, videos, audio files, and archives. We don\'t restrict file types.'
                },
                {
                    question: 'Do I need to create an account?',
                    answer: 'No account is required for basic file transfers. However, creating an account gives you access to premium features and better file management.'
                }
            ]
        },
        {
            title: 'File Uploads',
            icon: Upload,
            faqs: [
                {
                    question: 'What is the maximum file size I can upload?',
                    answer: 'Free users can upload files up to 3GB total per transfer. Premium users have unlimited file size options.'
                },
                {
                    question: 'How long does it take to upload files?',
                    answer: 'Upload speed depends on your internet connection and file size. We use advanced compression to make uploads as fast as possible.'
                },
                {
                    question: 'Can I upload multiple files at once?',
                    answer: 'Yes! You can select multiple files or drag and drop an entire folder. All files will be included in a single transfer.'
                }
            ]
        },
        {
            title: 'File Downloads',
            icon: Download,
            faqs: [
                {
                    question: 'How do recipients download files?',
                    answer: 'Recipients receive an email with a secure download link. They can click the link to download all files as a ZIP archive.'
                },
                {
                    question: 'What if the download link expires?',
                    answer: 'Download links expire after 7 days for free users and 30 days for premium users. You\'ll need to upload the files again if they expire.'
                },
                {
                    question: 'Can I track who downloaded my files?',
                    answer: 'Premium users can track download activity and receive notifications when files are accessed.'
                }
            ]
        },
        {
            title: 'Security & Privacy',
            icon: Shield,
            faqs: [
                {
                    question: 'How secure are my files?',
                    answer: 'All files are encrypted during transfer and storage. We use industry-standard SSL/TLS encryption and secure data centers.'
                },
                {
                    question: 'Who can access my uploaded files?',
                    answer: 'Only people with the download link can access your files. We never share your files with third parties.'
                },
                {
                    question: 'Are my files scanned or analyzed?',
                    answer: 'We only scan files for viruses to protect our users. We do not analyze or read the content of your files.'
                }
            ]
        },
        {
            title: 'Account & Billing',
            icon: Clock,
            faqs: [
                {
                    question: 'How do I upgrade to a premium plan?',
                    answer: 'Visit our pricing page, choose a plan, and follow the signup process. You can upgrade or downgrade at any time.'
                },
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept PayPal and various cryptocurrencies. More payment options are coming soon.'
                },
                {
                    question: 'Can I cancel my subscription?',
                    answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
                }
            ]
        }
    ]

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index)
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-20">
                {/* Hero Section */}
                <section className="section-padding bg-gradient-to-br from-ninja-50 to-ninja-100">
                    <div className="container-max text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Help Center
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                            Find answers to common questions and learn how to get the most out of FileNinja.
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-md mx-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for help..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ninja-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Categories */}
                <section className="section-padding">
                    <div className="container-max">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {faqCategories.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg p-8">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-ninja-100 rounded-lg flex items-center justify-center">
                                            <category.icon className="w-5 h-5 text-ninja-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {category.title}
                                        </h2>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {category.faqs.map((faq, faqIndex) => (
                                            <div key={faqIndex} className="border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => toggleFaq(categoryIndex * 10 + faqIndex)}
                                                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <span className="font-medium text-gray-900">
                                                        {faq.question}
                                                    </span>
                                                    <ChevronDown 
                                                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                                                            openFaq === categoryIndex * 10 + faqIndex ? 'rotate-180' : ''
                                                        }`}
                                                    />
                                                </button>
                                                
                                                {openFaq === categoryIndex * 10 + faqIndex && (
                                                    <div className="px-4 pb-4">
                                                        <p className="text-gray-600 leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional Help */}
                <section className="section-padding bg-gray-50">
                    <div className="container-max text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Still Need Help?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Can't find what you're looking for? Our support team is here to help.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-ninja-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-ninja-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Documentation
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Browse our comprehensive guides and tutorials.
                                </p>
                                <a href="#" className="text-ninja-600 hover:text-ninja-700 font-medium">
                                    View Docs →
                                </a>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-ninja-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Upload className="w-8 h-8 text-ninja-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Video Tutorials
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Watch step-by-step video guides.
                                </p>
                                <a href="#" className="text-ninja-600 hover:text-ninja-700 font-medium">
                                    Watch Videos →
                                </a>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-ninja-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-ninja-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Contact Support
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Get help from our support team.
                                </p>
                                <a href="/contact" className="text-ninja-600 hover:text-ninja-700 font-medium">
                                    Contact Us →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default HelpPage
