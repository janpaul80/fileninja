import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Marketing Director',
            company: 'TechFlow Solutions',
            content: 'FileNinja has revolutionized how our team shares large design files. The interface is intuitive, and the 3GB limit is perfect for our creative assets. Highly recommended!',
            rating: 5,
            avatar: 'SC'
        },
        {
            name: 'Marcus Rodriguez',
            role: 'Freelance Developer',
            company: 'CodeCraft Studio',
            content: 'As a developer working with clients worldwide, I need reliable file sharing. FileNinja delivers every time - fast uploads, secure transfers, and no registration required.',
            rating: 5,
            avatar: 'MR'
        },
        {
            name: 'Emily Watson',
            role: 'Project Manager',
            company: 'Global Innovations Inc.',
            content: 'We switched from WeTransfer to FileNinja and couldn\'t be happier. Better file size limits, cleaner interface, and our clients love the professional look.',
            rating: 5,
            avatar: 'EW'
        }
    ]

    return (
        <section className="section-padding bg-white">
            <div className="container-max">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join thousands of satisfied users who trust FileNinja for their file transfer needs.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            {/* Quote Icon */}
                            <div className="mb-6">
                                <Quote className="w-8 h-8 text-ninja-500" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-ninja-100 rounded-full flex items-center justify-center">
                                    <span className="text-ninja-700 font-semibold text-lg">
                                        {testimonial.avatar}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {testimonial.role}
                                    </p>
                                    <p className="text-sm text-ninja-600 font-medium">
                                        {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">
                        Ready to experience the difference?
                    </p>
                    <a
                        href="/app"
                        className="btn-primary inline-block"
                    >
                        Start Your First Transfer
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
