import Header from '../components/Header'
import Footer from '../components/Footer'

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-20">
                {/* Hero Section */}
                <section className="section-padding bg-gradient-to-br from-ninja-50 to-ninja-100">
                    <div className="container-max text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Terms of Service
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Please read these terms carefully before using FileNinja services.
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </section>

                {/* Terms Content */}
                <section className="section-padding">
                    <div className="container-max max-w-4xl">
                        <div className="prose prose-lg max-w-none">
                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using FileNinja, you accept and agree to be bound by the terms and provision of this agreement. 
                                If you do not agree to abide by the above, please do not use this service.
                            </p>

                            <h2>2. Description of Service</h2>
                            <p>
                                FileNinja provides a file transfer service that allows users to upload, store, and share files with others. 
                                Our service includes both free and premium tiers with varying features and limitations.
                            </p>

                            <h2>3. User Responsibilities</h2>
                            <p>As a user of FileNinja, you agree to:</p>
                            <ul>
                                <li>Use the service only for lawful purposes</li>
                                <li>Not upload files that contain viruses, malware, or other harmful code</li>
                                <li>Not violate any intellectual property rights</li>
                                <li>Not use the service to distribute spam or unsolicited content</li>
                                <li>Respect the privacy and rights of other users</li>
                            </ul>

                            <h2>4. File Upload and Storage</h2>
                            <p>
                                Users may upload files up to the size limit specified for their plan. Files are stored temporarily 
                                and will be automatically deleted after the expiration period. We reserve the right to remove 
                                files that violate our terms of service.
                            </p>

                            <h2>5. Privacy and Data Protection</h2>
                            <p>
                                Your privacy is important to us. We collect and process personal data in accordance with our 
                                Privacy Policy and applicable data protection laws. By using our service, you consent to such processing.
                            </p>

                            <h2>6. Service Availability</h2>
                            <p>
                                We strive to provide a reliable service but cannot guarantee uninterrupted availability. 
                                We may perform maintenance or updates that temporarily affect service availability.
                            </p>

                            <h2>7. Limitation of Liability</h2>
                            <p>
                                FileNinja shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                                including but not limited to loss of profits, data, or use, incurred by you or any third party.
                            </p>

                            <h2>8. Termination</h2>
                            <p>
                                We may terminate or suspend your access to FileNinja immediately, without prior notice or liability, 
                                for any reason whatsoever, including without limitation if you breach the Terms.
                            </p>

                            <h2>9. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                                we will try to provide at least 30 days notice prior to any new terms taking effect.
                            </p>

                            <h2>10. Contact Information</h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us at{' '}
                                <a href="mailto:hello@fileninja.nl" className="text-ninja-600 hover:text-ninja-700">
                                    hello@fileninja.nl
                                </a>
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default TermsPage
