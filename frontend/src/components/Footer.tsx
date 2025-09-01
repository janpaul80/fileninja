import { Link } from 'react-router-dom'
import { Zap, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = [
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Contact', href: '/contact' },
        { name: 'About', href: '/about' }
    ]

    const socialLinks = [
        { name: 'Twitter', icon: Twitter, href: '#' },
        { name: 'Facebook', icon: Facebook, href: '#' },
        { name: 'Instagram', icon: Instagram, href: '#' },
        { name: 'LinkedIn', icon: Linkedin, href: '#' }
    ]

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container-max py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 mb-4 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-ninja-500 to-ninja-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white group-hover:text-ninja-300 transition-colors duration-200">
                                FileNinja
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Send big files the ninja way. Fast, secure, and completely free file transfers up to 3GB.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ninja-600 transition-colors duration-200 group"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-400 hover:text-ninja-300 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/help"
                                    className="text-gray-400 hover:text-ninja-300 transition-colors duration-200"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="text-gray-400 hover:text-ninja-300 transition-colors duration-200"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/status"
                                    className="text-gray-400 hover:text-ninja-300 transition-colors duration-200"
                                >
                                    Service Status
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} FileNinja. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm mt-2 md:mt-0">
                        Made with ❤️ for seamless file sharing
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
