import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/SessionProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sampath Yemjala - Full Stack Developer',
  description: '5+ years of experience in React, Next.js, Node.js, and MongoDB. Specializing in high-performance web applications.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8b5cf6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`} suppressHydrationWarning>
        <ThemeProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}