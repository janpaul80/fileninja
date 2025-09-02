import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="container-max">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-ninja-500 to-ninja-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 group-hover:text-ninja-600 transition-colors duration-200">
                            FileNinja
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/app" className="text-gray-600 hover:text-ninja-600 transition-colors duration-200 font-medium">
                            Go to App
                        </Link>
                        <Link to="/login" className="text-gray-600 hover:text-ninja-600 transition-colors duration-200 font-medium">
                            Log In
                        </Link>
                        <Link to="/signup" className="btn-primary text-sm py-2 px-6">
                            Sign Up
                        </Link>
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center space-x-3">
                        <Link to="/login" className="text-gray-600 hover:text-ninja-600 transition-colors duration-200 font-medium text-sm">
                            Log In
                        </Link>
                        <Link to="/signup" className="btn-primary text-sm py-2 px-4">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
