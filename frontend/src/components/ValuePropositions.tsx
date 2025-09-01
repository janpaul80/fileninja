import { Shield, Send, Smartphone } from 'lucide-react'

const ValuePropositions = () => {
    const features = [
        {
            icon: Shield,
            title: "Blazing Fast & Secure",
            description: "Military-grade encryption ensures your files stay private while lightning-fast servers deliver them in record time."
        },
        {
            icon: Send,
            title: "Send to Anyone, Anywhere",
            description: "Share files with anyone across the globe. No account needed - just upload and send the link."
        },
        {
            icon: Smartphone,
            title: "Works on All Your Devices",
            description: "Access FileNinja from any device - desktop, tablet, or mobile. Your files are always within reach."
        }
    ]

    return (
        <section className="section-padding bg-white">
            <div className="container-max">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose FileNinja?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We've built the most reliable and secure file transfer service on the web
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-ninja-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-ninja-500 to-ninja-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ValuePropositions
