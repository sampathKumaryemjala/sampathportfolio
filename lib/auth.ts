// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Hardcoded users for demo purposes (no server database)
const DEMO_USERS = [
  {
    id: '1',
    name: 'Sampath Kumar',
    email: 'sampathyemjala@gmail.com',
    // password: "password" - hashed
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80'
  }
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔐 Auth attempt:', credentials?.email)

        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials')
          return null
        }

        try {
          // Find user in hardcoded list
          const user = DEMO_USERS.find(u => u.email === credentials.email)

          if (!user) {
            console.log('❌ User not found:', credentials.email)
            return null
          }

          console.log('✅ User found:', user.email)
          console.log('🔑 Stored hash:', user.password.substring(0, 20) + '...')

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          console.log('🔓 Password valid:', isPasswordValid)

          if (!isPasswordValid) {
            console.log('❌ Invalid password')
            console.log('❌ Invalid password')
            return null
          }

          console.log('✅ Auth successful')
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          }
        } catch (error) {
          console.error('❌ Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
}