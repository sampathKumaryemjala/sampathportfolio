import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Sampath Portfolio</h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                            Building amazing web experiences with modern technologies.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                                Blog
                            </Link>
                            <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                                Portfolio
                            </Link>
                            <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                                About
                            </Link>
                            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Social</h4>
                        <div className="flex flex-col gap-2">
                            <a href="https://github.com/sampathKumaryemjala" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                                GitHub
                            </a>
                            <a href="https://linkedin.com/in/sampath-yemjala" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                                LinkedIn
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                                Twitter
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
                        <div className="space-y-1">
                            <p className="text-gray-400 text-sm sm:text-base">sampathyemjala@gmail.com</p>
                            <p className="text-gray-400 text-sm sm:text-base">+91 7729827183</p>
                            <p className="text-gray-400 text-sm sm:text-base">Hyderabad, India</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
                    <p className="text-sm sm:text-base">© 2025 Sampath Kumar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};