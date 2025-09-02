import Header from '../components/Header'
import Footer from '../components/Footer'
import { Play, Download, Upload, Users, Shield, Clock, FileText } from 'lucide-react'

const VideoTutorialsPage = () => {
    const tutorials = [
        {
            title: 'Getting Started with FileNinja',
            description: 'Learn the basics of uploading and sending files with FileNinja in this comprehensive tutorial.',
            duration: '3:45',
            icon: Play,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder - replace with actual tutorial video
            steps: [
                'Navigate to the FileNinja app page',
                'Drag and drop your files or click to browse',
                'Enter recipient email addresses',
                'Add an optional message',
                'Click "Send Files" to complete your transfer'
            ],
            features: ['No registration required', 'Up to 3GB free', 'Instant email delivery']
        },
        {
            title: 'Advanced File Management',
            description: 'Master advanced features like multiple file uploads, folder organization, and bulk operations.',
            duration: '5:20',
            icon: Upload,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
            steps: [
                'Select multiple files using Ctrl+Click',
                'Organize files into logical groups',
                'Use drag-and-drop for entire folders',
                'Preview files before sending',
                'Manage file permissions and access'
            ],
            features: ['Multiple file selection', 'Folder organization', 'File previews']
        },
        {
            title: 'Security and Privacy Features',
            description: 'Understand how FileNinja protects your files and maintains your privacy.',
            duration: '4:15',
            icon: Shield,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
            steps: [
                'Learn about SSL/TLS encryption',
                'Understand secure file storage',
                'Control who can access your files',
                'Set expiration dates for downloads',
                'Track file access (Premium users)'
            ],
            features: ['End-to-end encryption', 'Secure storage', 'Access control']
        },
        {
            title: 'Recipient Experience',
            description: 'See how recipients download and access files sent through FileNinja.',
            duration: '2:30',
            icon: Download,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
            steps: [
                'Recipient receives email notification',
                'Click secure download link',
                'Access file transfer page',
                'Download individual files or complete package',
                'Files are automatically organized'
            ],
            features: ['No registration required', 'Secure downloads', 'Automatic organization']
        }
    ]

    const quickGuides = [
        {
            title: 'File Size Limits',
            icon: FileText,
            content: 'Free users: 3GB, Basic: 10GB, Premium: Unlimited. Learn how to optimize your uploads.'
        },
        {
            title: 'Supported Formats',
            icon: Upload,
            content: 'All file types supported including documents, images, videos, audio, and archives.'
        },
        {
            title: 'Download Expiry',
            icon: Clock,
            content: 'Free/Basic: 7 days, Premium: 30 days. Links automatically expire for security.'
        },
        {
            title: 'Multiple Recipients',
            icon: Users,
            content: 'Send to multiple people at once. Separate email addresses with commas.'
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
                            Video Tutorials
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Watch step-by-step video guides to master FileNinja. From basic file transfers 
                            to advanced features, our tutorials will help you become a FileNinja expert.
                        </p>
                    </div>
                </section>

                {/* Main Tutorials */}
                <section className="section-padding">
                    <div className="container-max">
                        <div className="space-y-12">
                            {tutorials.map((tutorial, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Video Section */}
                                        <div className="p-8">
                                            <div className="flex items-center space-x-3 mb-6">
                                                <div className="w-12 h-12 bg-ninja-100 rounded-xl flex items-center justify-center">
                                                    <tutorial.icon className="w-6 h-6 text-ninja-600" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-900">
                                                        {tutorial.title}
                                                    </h2>
                                                    <p className="text-gray-600">
                                                        Duration: {tutorial.duration}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-700 mb-6">
                                                {tutorial.description}
                                            </p>

                                            {/* Video Embed */}
                                            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                                <iframe
                                                    src={tutorial.videoUrl}
                                                    title={tutorial.title}
                                                    className="w-full h-full"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>

                                            {/* Features */}
                                            <div className="mt-6">
                                                <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {tutorial.features.map((feature, featureIndex) => (
                                                        <span
                                                            key={featureIndex}
                                                            className="px-3 py-1 bg-ninja-100 text-ninja-700 rounded-full text-sm"
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Steps Section */}
                                        <div className="p-8 bg-gray-50">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                                Step-by-Step Guide
                                            </h3>
                                            <div className="space-y-4">
                                                {tutorial.steps.map((step, stepIndex) => (
                                                    <div key={stepIndex} className="flex items-start space-x-3">
                                                        <div className="w-8 h-8 bg-ninja-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                                            {stepIndex + 1}
                                                        </div>
                                                        <p className="text-gray-700">{step}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Reference Guides */}
                <section className="section-padding bg-gray-50">
                    <div className="container-max">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            Quick Reference Guides
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {quickGuides.map((guide, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="w-12 h-12 bg-ninja-100 rounded-lg flex items-center justify-center mb-4">
                                        <guide.icon className="w-6 h-6 text-ninja-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        {guide.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {guide.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional Resources */}
                <section className="section-padding">
                    <div className="container-max text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Need More Help?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Can't find what you're looking for? We have additional resources to help you succeed.
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
                                    Comprehensive written guides and tutorials.
                                </p>
                                <a href="/docs" className="text-ninja-600 hover:text-ninja-700 font-medium">
                                    Read Docs →
                                </a>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-ninja-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Clock className="w-8 h-8 text-ninja-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    FAQ
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Quick answers to common questions.
                                </p>
                                <a href="/help" className="text-ninja-600 hover:text-ninja-700 font-medium">
                                    Browse FAQ →
                                </a>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-ninja-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-ninja-600" />
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

export default VideoTutorialsPage
