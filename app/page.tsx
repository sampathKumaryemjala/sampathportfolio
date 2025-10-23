'use client'
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession } from 'next-auth/react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold text-white">SampathYemjala</div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">
              Contact
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">
              Blog
            </Link>
            <Link href="/labs" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">
              Labs
            </Link>
            <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">
              Portfolio
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <Link
                href="/dashboard"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base"
              >
                Sign In
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white hover:text-purple-300 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-purple-800">
            <div className="flex flex-col space-y-2 pt-4">
              <Link 
                href="/features" 
                className="text-gray-300 hover:text-white transition-colors py-2 px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/pricing" 
                className="text-gray-300 hover:text-white transition-colors py-2 px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-white transition-colors py-2 px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-300 hover:text-white transition-colors py-2 px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-300 hover:text-white transition-colors py-2 px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/portfolio" 
                className="text-gray-300 hover:text-white transition-colors py-2 px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Sampath Yemjala{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
            Create stunning experiences with our powerful platform.
            Fast, reliable, and designed for modern developers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link
              href="/portfolio"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all transform hover:scale-105 text-center"
            >
              Get Started Free
            </Link>
            <Link
              href="/portfolio"
              className="bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold backdrop-blur-sm border border-white/20 transition-all text-center"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-24 lg:mt-32">
          <Link href="/features/speed" className="group">
            <div className="bg-white/5 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Optimized performance for the best user experience possible.
              </p>
            </div>
          </Link>

          <Link href="/features/security" className="group">
            <div className="bg-white/5 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔒</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">Secure by Default</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Enterprise-grade security built into every layer of our platform.
              </p>
            </div>
          </Link>

          <Link href="/features/scale" className="group">
            <div className="bg-white/5 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚀</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">Scales Effortlessly</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                From startup to enterprise, we grow with your business needs.
              </p>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-center sm:text-left text-sm sm:text-base">
            © 2025 SampathYemjala. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
              Terms
            </Link>
            <Link href="/docs" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
              Docs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}