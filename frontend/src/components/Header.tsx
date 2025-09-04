import { Link } from 'react-router-dom'
import { Zap, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth()
    
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
                        {isAuthenticated ? (
                            <>
                                <Link to="/app" className="text-gray-600 hover:text-ninja-600 transition-colors duration-200 font-medium">
                                    Go to App
                                </Link>
                                <div className="flex items-center space-x-3">
                                    <span className="text-gray-600 text-sm">
                                        Welcome, {user?.name?.split(' ')[0] || user?.name}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="flex items-center space-x-2 text-gray-600 hover:text-ninja-600 transition-colors duration-200 font-medium"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/app" className="text-gray-600 hover:text-ninja-600 transition-colors duration-200 font-medium">
                                    Go to App
                                </Link>
                                <Link to="/login" className="text-gray-600 hover:text-ninja-600 transition-colors duration-200 font-medium">
                                    Log In
                                </Link>
                                <Link to="/signup" className="btn-primary text-sm py-2 px-6">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center space-x-3 relative z-20">
                        {isAuthenticated ? (
                            <>
                                <Link 
                                    to="/app" 
                                    className="text-gray-600 hover:text-ninja-600 transition-colors duration-200 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer touch-manipulation"
                                >
                                    App
                                </Link>
                                <button
                                    onClick={logout}
                                    className="bg-ninja-600 hover:bg-ninja-700 text-white font-semibold text-sm py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer touch-manipulation"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-gray-600 hover:text-ninja-600 transition-colors duration-200 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer touch-manipulation"
                                >
                                    Log In
                                </Link>
                                <Link 
                                    to="/signup" 
                                    className="bg-ninja-600 hover:bg-ninja-700 text-white font-semibold text-sm py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer touch-manipulation"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
