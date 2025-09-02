import Header from '../components/Header'
import Footer from '../components/Footer'
import { FileText, Upload, Download, Shield, Users, Settings, Zap, Clock, AlertTriangle } from 'lucide-react'

const DocumentationPage = () => {
    const guides = [
        {
            title: 'Getting Started',
            icon: Zap,
            sections: [
                {
                    heading: 'Quick Start Guide',
                    content: [
                        'Visit the FileNinja app page',
                        'Drag and drop your files or click to browse',
                        'Enter recipient email addresses (separate with commas)',
                        'Add an optional message',
                        'Click "Send Files" to complete your transfer'
                    ]
                },
                {
                    heading: 'Supported File Types',
                    content: [
                        'Documents: PDF, DOC, DOCX, TXT, RTF',
                        'Images: JPG, PNG, GIF, BMP, SVG, TIFF',
                        'Videos: MP4, AVI, MOV, WMV, FLV, MKV',
                        'Audio: MP3, WAV, FLAC, AAC, OGG',
                        'Archives: ZIP, RAR, 7Z, TAR, GZ',
                        'And many more - we support all file types!'
                    ]
                }
            ]
        },
        {
            title: 'File Uploads',
            icon: Upload,
            sections: [
                {
                    heading: 'Upload Limits',
                    content: [
                        'Free users: Up to 3GB total per transfer',
                        'Basic plan: Up to 10GB total per transfer',
                        'Premium plan: Unlimited file size',
                        'Individual file size: No limit within your plan'
                    ]
                },
                {
                    heading: 'Upload Best Practices',
                    content: [
                        'Use a stable internet connection for large files',
                        'Close other bandwidth-heavy applications',
                        'Upload during off-peak hours for faster speeds',
                        'Compress large files when possible',
                        'Use our drag-and-drop interface for multiple files'
                    ]
                },
                {
                    heading: 'Multiple File Uploads',
                    content: [
                        'Select multiple files using Ctrl+Click (Cmd+Click on Mac)',
                        'Drag and drop entire folders',
                        'All files will be included in a single transfer',
                        'Files are automatically organized by the recipient'
                    ]
                }
            ]
        },
        {
            title: 'File Downloads',
            icon: Download,
            sections: [
                {
                    heading: 'How Recipients Download',
                    content: [
                        'Recipients receive an email with a secure download link',
                        'Click the link to access the file transfer page',
                        'All files are automatically packaged in a ZIP archive',
                        'Download the entire package or individual files',
                        'No registration required for recipients'
                    ]
                },
                {
                    heading: 'Download Link Expiry',
                    content: [
                        'Free users: 7 days from upload date',
                        'Basic plan: 7 days from upload date',
                        'Premium plan: 30 days from upload date',
                        'Links automatically expire after the time limit',
                        'Contact the sender if you need files re-uploaded'
                    ]
                },
                {
                    heading: 'Download Troubleshooting',
                    content: [
                        'Ensure you\'re using the complete download link',
                        'Check if the link has expired',
                        'Try a different browser if downloads fail',
                        'Contact support if you encounter persistent issues'
                    ]
                }
            ]
        },
        {
            title: 'Security & Privacy',
            icon: Shield,
            sections: [
                {
                    heading: 'Data Protection',
                    content: [
                        'All files are encrypted during transfer (SSL/TLS)',
                        'Files are stored in secure, encrypted data centers',
                        'We never scan or analyze your file contents',
                        'Only virus scanning is performed for user protection',
                        'Files are automatically deleted after expiry'
                    ]
                },
                {
                    heading: 'Access Control',
                    content: [
                        'Only people with the download link can access files',
                        'Links are randomly generated and secure',
                        'We never share your files with third parties',
                        'You can track download activity (Premium users)',
                        'Immediate deletion option available'
                    ]
                },
                {
                    heading: 'Privacy Compliance',
                    content: [
                        'GDPR compliant data handling',
                        'No personal data collection without consent',
                        'Automatic data retention policies',
                        'Right to data deletion and portability',
                        'Transparent privacy practices'
                    ]
                }
            ]
        },
        {
            title: 'Account Management',
            icon: Users,
            sections: [
                {
                    heading: 'Creating an Account',
                    content: [
                        'Click "Sign Up" in the header navigation',
                        'Enter your email address and create a password',
                        'Verify your email address',
                        'Complete your profile information',
                        'Start using premium features immediately'
                    ]
                },
                {
                    heading: 'Premium Features',
                    content: [
                        'Unlimited file transfers and storage',
                        'Extended file retention periods',
                        'Priority customer support',
                        'Download tracking and analytics',
                        'Custom branding options',
                        'API access for developers'
                    ]
                },
                {
                    heading: 'Billing & Subscriptions',
                    content: [
                        'Monthly subscription billing',
                        'PayPal and cryptocurrency payments accepted',
                        'Easy plan upgrades and downgrades',
                        'Cancel anytime with continued access until period end',
                        'Detailed billing history and receipts'
                    ]
                }
            ]
        },
        {
            title: 'Troubleshooting',
            icon: AlertTriangle,
            sections: [
                {
                    heading: 'Common Issues',
                    content: [
                        'Upload fails: Check file size limits and internet connection',
                        'Download link expired: Contact the sender for new upload',
                        'Email not received: Check spam folder and email address',
                        'Slow uploads: Close other applications and try during off-peak hours',
                        'Browser compatibility: Use modern browsers (Chrome, Firefox, Safari, Edge)'
                    ]
                },
                {
                    heading: 'Getting Help',
                    content: [
                        'Check our FAQ section for quick answers',
                        'Visit the Help Center for detailed guides',
                        'Contact support via email or phone',
                        'Check service status for any ongoing issues',
                        'Community forum for user discussions'
                    ]
                }
            ]
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
                            FileNinja Documentation
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive guides and tutorials to help you get the most out of FileNinja. 
                            From basic file transfers to advanced features, we've got you covered.
                        </p>
                    </div>
                </section>

                {/* Documentation Content */}
                <section className="section-padding">
                    <div className="container-max max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Table of Contents */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Table of Contents
                                    </h2>
                                    <nav className="space-y-2">
                                        {guides.map((guide, index) => (
                                            <a
                                                key={index}
                                                href={`#${guide.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="block text-ninja-600 hover:text-ninja-700 font-medium py-2 transition-colors duration-200"
                                            >
                                                {guide.title}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <div className="space-y-12">
                                    {guides.map((guide, guideIndex) => (
                                        <div key={guideIndex} id={guide.title.toLowerCase().replace(/\s+/g, '-')}>
                                            <div className="flex items-center space-x-3 mb-8">
                                                <div className="w-12 h-12 bg-ninja-100 rounded-xl flex items-center justify-center">
                                                    <guide.icon className="w-6 h-6 text-ninja-600" />
                                                </div>
                                                <h2 className="text-3xl font-bold text-gray-900">
                                                    {guide.title}
                                                </h2>
                                            </div>

                                            <div className="space-y-8">
                                                {guide.sections.map((section, sectionIndex) => (
                                                    <div key={sectionIndex} className="bg-gray-50 rounded-xl p-6">
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                                            {section.heading}
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {section.content.map((item, itemIndex) => (
                                                                <li key={itemIndex} className="flex items-start space-x-3">
                                                                    <div className="w-2 h-2 bg-ninja-500 rounded-full mt-2 flex-shrink-0"></div>
                                                                    <span className="text-gray-700">{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Additional Resources */}
                                <div className="mt-16 bg-ninja-50 rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                        Need More Help?
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                                                <Clock className="w-8 h-8 text-ninja-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Video Tutorials</h4>
                                            <p className="text-sm text-gray-600 mb-3">
                                                Watch step-by-step video guides
                                            </p>
                                            <a href="/help" className="text-ninja-600 hover:text-ninja-700 font-medium text-sm">
                                                Watch Videos →
                                            </a>
                                        </div>

                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                                                <Settings className="w-8 h-8 text-ninja-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">FAQ</h4>
                                            <p className="text-sm text-gray-600 mb-3">
                                                Find quick answers to common questions
                                            </p>
                                            <a href="/help" className="text-ninja-600 hover:text-ninja-700 font-medium text-sm">
                                                Browse FAQ →
                                            </a>
                                        </div>

                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                                                <FileText className="w-8 h-8 text-ninja-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Contact Support</h4>
                                            <p className="text-sm text-gray-600 mb-3">
                                                Get help from our support team
                                            </p>
                                            <a href="/contact" className="text-ninja-600 hover:text-ninja-700 font-medium text-sm">
                                                Contact Us →
                                            </a>
                                        </div>
                                    </div>
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

export default DocumentationPage
