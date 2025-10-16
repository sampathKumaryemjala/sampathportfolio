import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sampath Yemjala - Full Stack Developer',
  description: '5+ years of experience in React, Next.js, Node.js, and MongoDB. Specializing in high-performance web applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}