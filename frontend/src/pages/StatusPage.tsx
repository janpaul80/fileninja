import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CheckCircle, AlertCircle, XCircle, Clock, Wifi, Server, Database, Mail } from 'lucide-react'

const StatusPage = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('24h')

    const services = [
        {
            name: 'File Uploads',
            status: 'operational',
            icon: Wifi,
            description: 'File upload and transfer service'
        },
        {
            name: 'File Downloads',
            status: 'operational',
            icon: Server,
            description: 'File download and retrieval service'
        },
        {
            name: 'Email Notifications',
            status: 'degraded',
            icon: Mail,
            description: 'Email delivery service'
        },
        {
            name: 'Database',
            status: 'operational',
            icon: Database,
            description: 'Data storage and management'
        }
    ]

    const incidents = [
        {
            id: 1,
            title: 'Email Delivery Issues',
            status: 'investigating',
            description: 'Some users are experiencing delays in email notifications. We are investigating the issue.',
            time: '2 hours ago',
            updates: [
                {
                    time: '1 hour ago',
                    message: 'We have identified the issue and are working on a fix.'
                },
                {
                    time: '30 minutes ago',
                    message: 'Fix has been deployed. Monitoring for resolution.'
                }
            ]
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'operational':
                return 'text-green-600 bg-green-100'
            case 'degraded':
                return 'text-yellow-600 bg-yellow-100'
            case 'investigating':
                return 'text-orange-600 bg-orange-100'
            case 'outage':
                return 'text-red-600 bg-red-100'
            default:
                return 'text-gray-600 bg-gray-100'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'operational':
                return CheckCircle
            case 'degraded':
                return AlertCircle
            case 'investigating':
                return Clock
            case 'outage':
                return XCircle
            default:
                return Clock
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'operational':
                return 'Operational'
            case 'degraded':
                return 'Degraded Performance'
            case 'investigating':
                return 'Investigating'
            case 'outage':
                return 'Major Outage'
            default:
                return 'Unknown'
        }
    }

    const uptimeData = {
        '24h': '99.9%',
        '7d': '99.8%',
        '30d': '99.7%',
        '90d': '99.6%'
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-20">
                {/* Hero Section */}
                <section className="section-padding bg-gradient-to-br from-ninja-50 to-ninja-100">
                    <div className="container-max text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Service Status
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Real-time status of FileNinja services and any ongoing issues.
                        </p>
                    </div>
                </section>

                {/* Overall Status */}
                <section className="section-padding">
                    <div className="container-max">
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Overall System Status
                                </h2>
                                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-100 text-green-800">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-semibold">All Systems Operational</span>
                                </div>
                                <p className="text-gray-600 mt-4">
                                    FileNinja is running normally. All core services are functioning as expected.
                                </p>
                            </div>
                        </div>

                        {/* Service Status Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {services.map((service, index) => {
                                const StatusIcon = getStatusIcon(service.status)
                                return (
                                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-ninja-100 rounded-lg flex items-center justify-center">
                                                    <service.icon className="w-5 h-5 text-ninja-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {service.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {service.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                                                <div className="flex items-center space-x-1">
                                                    <StatusIcon className="w-4 h-4" />
                                                    <span>{getStatusText(service.status)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Uptime Metrics */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Uptime Metrics</h2>
                            
                            {/* Timeframe Selector */}
                            <div className="flex space-x-2 mb-6">
                                {Object.keys(uptimeData).map((timeframe) => (
                                    <button
                                        key={timeframe}
                                        onClick={() => setSelectedTimeframe(timeframe)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                            selectedTimeframe === timeframe
                                                ? 'bg-ninja-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {timeframe === '24h' ? '24 Hours' : 
                                         timeframe === '7d' ? '7 Days' :
                                         timeframe === '30d' ? '30 Days' : '90 Days'}
                                    </button>
                                ))}
                            </div>

                            {/* Uptime Display */}
                            <div className="text-center">
                                <div className="text-6xl font-bold text-ninja-600 mb-2">
                                    {uptimeData[selectedTimeframe as keyof typeof uptimeData]}
                                </div>
                                <p className="text-gray-600">
                                    Uptime for the last {selectedTimeframe === '24h' ? '24 hours' : 
                                                         selectedTimeframe === '7d' ? '7 days' :
                                                         selectedTimeframe === '30d' ? '30 days' : '90 days'}
                                </p>
                            </div>
                        </div>

                        {/* Recent Incidents */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Incidents</h2>
                            
                            {incidents.length === 0 ? (
                                <div className="text-center py-8">
                                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <p className="text-gray-600">No recent incidents. All systems are running smoothly.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {incidents.map((incident) => (
                                        <div key={incident.id} className="border border-gray-200 rounded-xl p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {incident.title}
                                                    </h3>
                                                    <p className="text-gray-600 mb-3">
                                                        {incident.description}
                                                    </p>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(incident.status)}`}>
                                                    {getStatusText(incident.status)}
                                                </div>
                                            </div>
                                            
                                            <div className="text-sm text-gray-500 mb-4">
                                                Started: {incident.time}
                                            </div>

                                            {/* Updates */}
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-gray-900">Updates:</h4>
                                                {incident.updates.map((update, index) => (
                                                    <div key={index} className="flex items-start space-x-3">
                                                        <div className="w-2 h-2 bg-ninja-500 rounded-full mt-2 flex-shrink-0"></div>
                                                        <div>
                                                            <p className="text-gray-700">{update.message}</p>
                                                            <p className="text-sm text-gray-500">{update.time}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Subscribe to Updates */}
                <section className="section-padding bg-gray-50">
                    <div className="container-max text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Stay Updated
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Get notified about service updates and incidents via email.
                        </p>
                        
                        <div className="max-w-md mx-auto">
                            <div className="flex space-x-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ninja-500 focus:border-transparent"
                                />
                                <button className="btn-primary px-6">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default StatusPage
