import Header from '../components/Header'
import Footer from '../components/Footer'
import { Zap, Shield, Globe, Users, Target, Award } from 'lucide-react'

const AboutPage = () => {
    const values = [
        {
            icon: Shield,
            title: 'Security First',
            description: 'We prioritize the security and privacy of your files above everything else.'
        },
        {
            icon: Globe,
            title: 'Global Reach',
            description: 'Serving users worldwide with fast, reliable file transfer services.'
        },
        {
            icon: Users,
            title: 'User-Centric',
            description: 'Every feature is designed with our users\' needs and feedback in mind.'
        },
        {
            icon: Target,
            title: 'Innovation',
            description: 'Continuously improving our technology to provide the best user experience.'
        }
    ]

    const stats = [
        { number: '1M+', label: 'Files Transferred' },
        { number: '50K+', label: 'Happy Users' },
        { number: '99.9%', label: 'Uptime' },
        { number: '24/7', label: 'Support' }
    ]

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-20">
                {/* Hero Section */}
                <section className="section-padding bg-gradient-to-br from-ninja-50 to-ninja-100">
                    <div className="container-max text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            About FileNinja
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We're on a mission to make file sharing simple, secure, and seamless. 
                            Born from the frustration of existing solutions, FileNinja was built to be better.
                        </p>
                    </div>
                </section>

                {/* Our Story */}
                <section className="section-padding">
                    <div className="container-max max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Our Story
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                FileNinja was founded in 2024 by a team of developers and designers who were tired of 
                                the limitations and complexity of existing file transfer services. We believed that sharing 
                                files should be as simple as sending an email, but with the security and reliability that 
                                modern technology can provide.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    The Problem We Solved
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Traditional file sharing services were either too expensive, had restrictive file size limits, 
                                    or required users to create accounts. We wanted to create something that was free, 
                                    powerful, and accessible to everyone.
                                </p>
                                <p className="text-gray-600">
                                    Our solution combines the simplicity of drag-and-drop uploads with enterprise-grade security, 
                                    making it perfect for both personal use and business applications.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-64 h-64 bg-gradient-to-br from-ninja-500 to-ninja-700 rounded-2xl flex items-center justify-center">
                                    <Zap className="w-32 h-32 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Mission */}
                <section className="section-padding bg-gray-50">
                    <div className="container-max text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Our Mission
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                            To democratize file sharing by providing a fast, secure, and user-friendly platform 
                            that works for everyone, everywhere.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-ninja-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="w-8 h-8 text-ninja-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="section-padding">
                    <div className="container-max">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl font-bold text-ninja-600 mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="section-padding bg-gray-50">
                    <div className="container-max text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                            A passionate group of developers, designers, and product experts working together 
                            to build the future of file sharing.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-24 h-24 bg-ninja-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-12 h-12 text-ninja-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Development Team
                                </h3>
                                <p className="text-gray-600">
                                    Expert engineers building robust, scalable solutions with cutting-edge technology.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-24 h-24 bg-ninja-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-12 h-12 text-ninja-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Design Team
                                </h3>
                                <p className="text-gray-600">
                                    Creative designers crafting beautiful, intuitive user experiences that users love.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-24 h-24 bg-ninja-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Target className="w-12 h-12 text-ninja-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Product Team
                                </h3>
                                <p className="text-gray-600">
                                    Strategic thinkers ensuring every feature serves our users' needs and business goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section-padding">
                    <div className="container-max text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Ready to Experience FileNinja?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who have already discovered the ninja way of file sharing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/app" className="btn-primary">
                                Start Your First Transfer
                            </a>
                            <a href="/contact" className="btn-secondary">
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default AboutPage
