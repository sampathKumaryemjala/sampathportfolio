'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error('Invalid credentials')
      }

      if (result?.ok) {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Registration is disabled in demo mode (no server database)
      // For demo purposes, show a message
      console.log('Registration attempt:', { name, email })
      throw new Error('Registration is disabled in demo mode. Use sampath@example.com / password to login.')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    session,
    status,
    isLoading,
    login,
    logout,
    register,
    isAuthenticated: !!session,
  }
}



