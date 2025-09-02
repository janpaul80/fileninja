import Header from '../components/Header'
import Footer from '../components/Footer'

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-20">
                {/* Hero Section */}
                <section className="section-padding bg-gradient-to-br from-ninja-50 to-ninja-100">
                    <div className="container-max text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            How we collect, use, and protect your personal information.
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </section>

                {/* Privacy Content */}
                <section className="section-padding">
                    <div className="container-max max-w-4xl">
                        <div className="prose prose-lg max-w-none">
                            <h2>1. Information We Collect</h2>
                            <p>
                                We collect information you provide directly to us, such as when you create an account, 
                                upload files, or contact us for support. This may include:
                            </p>
                            <ul>
                                <li>Name and email address</li>
                                <li>Files you upload to our service</li>
                                <li>Communication preferences</li>
                                <li>Support requests and feedback</li>
                            </ul>

                            <h2>2. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul>
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process your file transfers and send notifications</li>
                                <li>Respond to your comments and questions</li>
                                <li>Send you technical notices and support messages</li>
                                <li>Protect against fraud and abuse</li>
                            </ul>

                            <h2>3. Information Sharing</h2>
                            <p>
                                We do not sell, trade, or otherwise transfer your personal information to third parties 
                                without your consent, except as described in this policy. We may share information:
                            </p>
                            <ul>
                                <li>With service providers who assist in our operations</li>
                                <li>When required by law or to protect our rights</li>
                                <li>In connection with a business transfer or merger</li>
                            </ul>

                            <h2>4. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal 
                                information against unauthorized access, alteration, disclosure, or destruction. 
                                However, no method of transmission over the internet is 100% secure.
                            </p>

                            <h2>5. Data Retention</h2>
                            <p>
                                We retain your personal information for as long as necessary to provide our services 
                                and fulfill the purposes outlined in this policy. Files are automatically deleted 
                                after the expiration period, and account data is retained according to our data retention schedule.
                            </p>

                            <h2>6. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access and update your personal information</li>
                                <li>Request deletion of your data</li>
                                <li>Opt out of marketing communications</li>
                                <li>Request data portability</li>
                                <li>Lodge a complaint with supervisory authorities</li>
                            </ul>

                            <h2>7. Cookies and Tracking</h2>
                            <p>
                                We use cookies and similar technologies to enhance your experience, analyze usage, 
                                and provide personalized content. You can control cookie settings through your browser preferences.
                            </p>

                            <h2>8. Third-Party Services</h2>
                            <p>
                                Our service may contain links to third-party websites or integrate with third-party services. 
                                We are not responsible for the privacy practices of these external services.
                            </p>

                            <h2>9. International Transfers</h2>
                            <p>
                                Your information may be transferred to and processed in countries other than your own. 
                                We ensure appropriate safeguards are in place to protect your data in accordance with this policy.
                            </p>

                            <h2>10. Children's Privacy</h2>
                            <p>
                                Our service is not intended for children under 13. We do not knowingly collect 
                                personal information from children under 13. If you believe we have collected such information, 
                                please contact us immediately.
                            </p>

                            <h2>11. Changes to This Policy</h2>
                            <p>
                                We may update this privacy policy from time to time. We will notify you of any changes 
                                by posting the new policy on this page and updating the "Last updated" date.
                            </p>

                            <h2>12. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at{' '}
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

export default PrivacyPage
