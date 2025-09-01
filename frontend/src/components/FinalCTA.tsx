import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'

const FinalCTA = () => {
    return (
        <section className="section-padding bg-gradient-to-br from-ninja-600 to-blue-700 text-white">
            <div className="container-max text-center">
                <div className="max-w-3xl mx-auto">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                        <Zap className="w-10 h-10 text-white" />
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        Ready to Send Files Like a Ninja?
                    </h2>

                    {/* Description */}
                    <p className="text-xl sm:text-2xl text-ninja-100 mb-12 leading-relaxed">
                        Join thousands of users who trust FileNinja for their file transfer needs.
                        Fast, secure, and completely free.
                    </p>

                    {/* CTA Button */}
                    <Link to="/app" className="btn-primary bg-white text-ninja-600 hover:bg-gray-100 text-lg inline-flex items-center space-x-2 group">
                        <span>Send Files Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-ninja-200">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>No registration required</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>Up to 3GB per transfer</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>7-day expiry</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FinalCTA
