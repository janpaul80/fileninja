import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-ninja-50 via-blue-50 to-indigo-100">
                <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230ea5e9%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="animate-fade-in">
                    {/* Logo */}
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-ninja-500 to-ninja-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Send Big Files.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ninja-600 to-blue-600">
                            The Ninja Way.
                        </span>
                    </h1>

                    {/* Sub-headline */}
                    <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Transfer files up to 3GB for free. No sign-ups, no nonsense.
                    </p>

                    {/* CTA Button */}
                    <Link to="/app" className="btn-primary text-lg inline-flex items-center space-x-2 group">
                        <span>Start Your Transfer</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>No registration required</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>End-to-end encryption</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>7-day expiry</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-ninja-200 rounded-full opacity-20 animate-bounce-gentle"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-5 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
        </section >
    )
}

export default Hero
