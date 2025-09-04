import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="container-max flex items-center justify-between h-16">
                <Link to="/" className="flex items-center group">
                    <img src="/logo.png" alt="FileNinja" className="h-10 w-auto group-hover:scale-105 transition-transform duration-200" />
                </Link>

                <nav>
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700">Welcome, {user?.name?.split(' ')[0]}</span>
                            <button onClick={logout} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Log In</Link>
                            <Link to="/signup" className="px-4 py-2 text-white bg-ninja-600 hover:bg-ninja-700 rounded-md shadow-sm">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
