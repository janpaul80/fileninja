import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CheckCircle, Loader2 } from 'lucide-react'

const OAuthSuccessPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { setUser } = useAuth()

    useEffect(() => {
        const userParam = searchParams.get('user')
        
        if (userParam) {
            try {
                const userData = JSON.parse(decodeURIComponent(userParam))
                
                // Store user in localStorage
                localStorage.setItem('fileninja_user', JSON.stringify(userData))
                
                // Update auth context
                setUser(userData)
                
                // Redirect to app after a short delay
                setTimeout(() => {
                    navigate('/app')
                }, 2000)
            } catch (error) {
                console.error('Error parsing OAuth user data:', error)
                navigate('/login?error=oauth_error')
            }
        } else {
            navigate('/login?error=oauth_error')
        }
    }, [searchParams, navigate, setUser])

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-20">
                <section className="section-padding">
                    <div className="container-max max-w-md mx-auto text-center">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">
                                Authentication Successful!
                            </h1>
                            
                            <p className="text-gray-600 mb-6">
                                You have been successfully logged in. Redirecting you to the app...
                            </p>
                            
                            <div className="flex items-center justify-center space-x-2 text-ninja-600">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="text-sm">Please wait...</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    )
}

export default OAuthSuccessPage
