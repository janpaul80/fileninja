import { CreditCard, Bitcoin } from 'lucide-react'

const PaymentMethods = () => {
    const paymentMethods = [
        {
            name: 'PayPal',
            icon: CreditCard,
            description: 'Secure online payments',
            color: 'text-blue-600'
        },
        {
            name: 'Cryptocurrency',
            icon: Bitcoin,
            description: 'BTC, ETH, and more',
            color: 'text-orange-500'
        }
    ]

    return (
        <section className="py-12 bg-gray-50">
            <div className="container-max">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                        Accepted Payment Methods
                    </h3>
                    
                    <div className="flex justify-center items-center space-x-12">
                        {paymentMethods.map((method) => (
                            <div
                                key={method.name}
                                className="flex flex-col items-center space-y-3 group"
                            >
                                <div className={`w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:shadow-lg transition-all duration-200 ${method.color}`}>
                                    <method.icon className="w-8 h-8" />
                                </div>
                                <div className="text-center">
                                    <h4 className="font-semibold text-gray-900">
                                        {method.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {method.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-6">
                        More payment options coming soon
                    </p>
                </div>
            </div>
        </section>
    )
}

export default PaymentMethods
