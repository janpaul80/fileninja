import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Marketing Director',
            company: 'TechFlow Solutions',
            content: 'FileNinja has revolutionized how our team shares large design files. The interface is intuitive, and the 3GB limit is perfect for our creative assets. Highly recommended!',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format'
        },
        {
            name: 'Marcus Rodriguez',
            role: 'Freelance Developer',
            company: 'CodeCraft Studio',
            content: 'As a developer working with clients worldwide, I need reliable file sharing. FileNinja delivers every time - fast uploads, secure transfers, and no registration required.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format'
        },
        {
            name: 'Emily Watson',
            role: 'Project Manager',
            company: 'Global Innovations Inc.',
            content: 'We switched from WeTransfer to FileNinja and couldn\'t be happier. Better file size limits, cleaner interface, and our clients love the professional look.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format'
        },
        {
            name: 'David Kim',
            role: 'Creative Director',
            company: 'Design Studio Pro',
            content: 'The drag-and-drop functionality is incredibly smooth, and the file organization is intuitive. Our design team uses FileNinja daily for client deliverables.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format'
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            {/* Quote Icon */}
                            <div className="mb-4 lg:mb-6">
                                <Quote className="w-6 h-6 lg:w-8 lg:h-8 text-ninja-500" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center mb-3 lg:mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-700 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center space-x-3 lg:space-x-4">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={testimonial.avatar}
                                        alt={`${testimonial.name} avatar`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-xs lg:text-sm text-gray-600 truncate">
                                        {testimonial.role}
                                    </p>
                                    <p className="text-xs lg:text-sm text-ninja-600 font-medium truncate">
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
