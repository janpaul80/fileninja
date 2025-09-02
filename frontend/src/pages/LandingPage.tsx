import Header from '../components/Header'
import Hero from '../components/Hero'
import ValuePropositions from '../components/ValuePropositions'
import HowItWorks from '../components/HowItWorks'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import PaymentMethods from '../components/PaymentMethods'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <Hero />
                <ValuePropositions />
                <HowItWorks />
                <Pricing />
                <Testimonials />
                <PaymentMethods />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    )
}

export default LandingPage


