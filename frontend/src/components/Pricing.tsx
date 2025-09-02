import { Check, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const Pricing = () => {
    const plans = [
        {
            name: 'Basic',
            price: '$9.99',
            period: 'per month',
            description: 'Perfect for individual users and small teams',
            features: [
                'Up to 10GB file transfers',
                'Basic email support',
                '7-day file retention',
                'Standard security features',
                'Up to 5 recipients per transfer'
            ],
            popular: false,
            cta: 'Get Started',
            href: '/signup?plan=basic'
        },
        {
            name: 'Premium',
            price: '$24.99',
            period: 'per month',
            description: 'Advanced features for power users and businesses',
            features: [
                'Unlimited file transfers',
                'Priority email support',
                '30-day file retention',
                'Advanced security & encryption',
                'Unlimited recipients',
                'Custom branding options',
                'API access',
                'Analytics dashboard'
            ],
            popular: true,
            cta: 'Get Started',
            href: '/signup?plan=premium'
        }
    ]

    return (
        <section className="section-padding bg-gray-50">
            <div className="container-max">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Choose Your Plan
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Start with our free tier or upgrade to unlock powerful features for your file transfer needs.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                                plan.popular 
                                    ? 'border-ninja-500 scale-105' 
                                    : 'border-gray-200 hover:border-ninja-300'
                            }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-ninja-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                                        <Star className="w-4 h-4" />
                                        <span>Most Popular</span>
                                    </div>
                                </div>
                            )}

                            <div className="p-8">
                                {/* Plan Header */}
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {plan.name}
                                    </h3>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold text-ninja-600">
                                            {plan.price}
                                        </span>
                                        <span className="text-gray-600 ml-2">
                                            {plan.period}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Features List */}
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start space-x-3">
                                            <Check className="w-5 h-5 text-ninja-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Link
                                    to={plan.href}
                                    className={`w-full text-center py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
                                        plan.popular
                                            ? 'btn-primary'
                                            : 'btn-secondary'
                                    }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">
                        All plans include our core file transfer functionality
                    </p>
                    <p className="text-sm text-gray-500">
                        Need a custom plan? <Link to="/contact" className="text-ninja-600 hover:text-ninja-700 font-medium">Contact us</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Pricing
