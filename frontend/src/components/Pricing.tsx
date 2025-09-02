import { Check, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

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
            paypalContainerId: 'paypal-button-container-P-1PD429017Y5205004NC3PWWA',
            planId: 'P-1PD429017Y5205004NC3PWWA'
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
            paypalContainerId: 'paypal-button-container-P-0YJ27033RY437220CNC3PYRQ',
            planId: 'P-0YJ27033RY437220CNC3PYRQ'
        }
    ]

    useEffect(() => {
        // Load PayPal SDK
        const script = document.createElement('script')
        script.src = 'https://www.paypal.com/sdk/js?client-id=BAALgnnpR4qxmDntmCqmjW--QfS9UXG6clun7MkjZQ7NLqhhUj_kOB_V8BHiuhgoTZXX4nZva-JTgRQk-8&vault=true&intent=subscription'
        script.setAttribute('data-sdk-integration-source', 'button-factory')
        
        script.onload = () => {
            // Initialize PayPal buttons for each plan
            plans.forEach(plan => {
                if (window.paypal) {
                    window.paypal.Buttons({
                        style: {
                            shape: 'rect',
                            color: 'gold',
                            layout: 'vertical',
                            label: 'subscribe'
                        },
                        createSubscription: function(_data: any, actions: any) {
                            return actions.subscription.create({
                                plan_id: plan.planId
                            });
                        },
                        onApprove: function(data: any, _actions: any) {
                            alert(`Subscription successful! Your subscription ID is: ${data.subscriptionID}`);
                            // You can add more sophisticated success handling here
                        }
                    }).render(`#${plan.paypalContainerId}`);
                }
            });
        }

        document.head.appendChild(script);

        return () => {
            // Cleanup
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

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

                                {/* PayPal Button */}
                                <div id={plan.paypalContainerId} className="w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cryptocurrency Payment Section */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Cryptocurrency Payment Options
                    </h3>
                    <p className="text-gray-600 mb-8 text-center">
                        Prefer to pay with cryptocurrency? You can manually send payment to one of our addresses below.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">USDT (TRC20 Network)</h4>
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <code className="text-sm text-gray-800 break-all">
                                    TPP2xq4z6W2BnKLu3kr2zwhhpjiKwb6B9S
                                </code>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                Send exactly $9.99 USDT for Basic plan or $24.99 USDT for Premium plan
                            </p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">BTC (OKT Chain)</h4>
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <code className="text-sm text-gray-800 break-all">
                                    0x9e334a2db8a49b61a8662ada229f04c49b7360aa
                                </code>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                Send equivalent value in BTC for your chosen plan
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                            ⚠️ <strong>Important:</strong> Please use the correct network when sending payments. 
                            For USDT, use TRC20 network. For BTC, use OKT Chain. 
                            After sending payment, please contact us at hello@fileninja.nl with your transaction hash 
                            and the plan you'd like to activate.
                        </p>
                    </div>
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
