import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
    id: string
    name: string
    email: string
    plan?: 'basic' | 'premium'
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<boolean>
    signup: (name: string, email: string, password: string) => Promise<boolean>
    logout: () => void
    loading: boolean
    setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('fileninja_user')
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            } catch (error) {
                console.error('Error parsing saved user:', error)
                localStorage.removeItem('fileninja_user')
            }
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true)
            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })

            const result = await response.json()

            if (result.success && result.user) {
                setUser(result.user)
                localStorage.setItem('fileninja_user', JSON.stringify(result.user))
                return true
            }
            
            return false
        } catch (error) {
            console.error('Login error:', error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const signup = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true)
            
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            })

            const result = await response.json()

            if (result.success && result.user) {
                setUser(result.user)
                localStorage.setItem('fileninja_user', JSON.stringify(result.user))
                return true
            }
            
            return false
        } catch (error) {
            console.error('Signup error:', error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('fileninja_user')
    }

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading,
        setUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
