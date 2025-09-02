import Header from '../components/Header'
import Footer from '../components/Footer'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Login form submitted!', formData)
        alert('Login form submitted successfully! Check console for details.')
        // TODO: Implement actual login logic
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-20">
                {/* Hero Section */}
                <section className="section-padding bg-gradient-to-br from-ninja-50 to-ninja-100">
                    <div className="container-max text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Welcome Back
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Sign in to your FileNinja account to access your files and premium features.
                        </p>
                    </div>
                </section>

                {/* Login Form */}
                <section className="section-padding">
                    <div className="container-max max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-ninja-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Lock className="w-8 h-8 text-ninja-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Sign In
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Enter your credentials to continue
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ninja-500 focus:border-transparent transition-all duration-200"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ninja-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-ninja-600 border-gray-300 rounded focus:ring-ninja-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </span>
                                    </label>
                                    <a href="#" className="text-sm text-ninja-600 hover:text-ninja-700 font-medium">
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-primary py-3 touch-manipulation"
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                    Sign In
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <a href="/signup" className="text-ninja-600 hover:text-ninja-700 font-medium">
                                        Sign up here
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default LoginPage
