import { Upload, Mail, Star } from 'lucide-react'

const HowItWorks = () => {
    const steps = [
        {
            icon: Upload,
            title: "Drag & Drop Your Files",
            description: "Simply drag and drop your files into the upload area, or click to browse and select them.",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: Mail,
            title: "Add Your Friend's Email",
            description: "Enter the recipient's email address and add a personal message if you'd like.",
            color: "from-ninja-500 to-ninja-600"
        },
        {
            icon: Star,
            title: "Hit Send & We'll Deliver",
            description: "Click send and we'll securely deliver your files. Recipients get a download link via email.",
            color: "from-purple-500 to-purple-600"
        }
    ]

    return (
        <section className="section-padding bg-gray-50">
            <div className="container-max">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Getting started with FileNinja is as simple as 1, 2, 3
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Step number */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-2 border-ninja-200 rounded-full flex items-center justify-center text-sm font-bold text-ninja-600 z-10">
                                {index + 1}
                            </div>

                            {/* Card */}
                            <div className="pt-8 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
                                <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                                    <step.icon className="w-10 h-10 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {step.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-ninja-200 to-blue-200 transform -translate-y-1/2"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-lg text-gray-600 mb-6">
                        Ready to send your first file?
                    </p>
                    <a
                        href="/app"
                        className="btn-primary text-lg inline-flex items-center space-x-2"
                    >
                        <span>Try It Now</span>
                        <Star className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
