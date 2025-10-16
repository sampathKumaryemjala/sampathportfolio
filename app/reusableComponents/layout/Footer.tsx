import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Sampath Portfolio</h3>
                        <p className="text-gray-400">
                            Building amazing web experiences with modern technologies.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                                Blog
                            </Link>
                            <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                                Portfolio
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Social</h4>
                        <div className="flex flex-col gap-2">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                GitHub
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                LinkedIn
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                Twitter
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <p className="text-gray-400">sampathyemjala@gmail</p>
                        <p className="text-gray-400">7729827183</p>
                        <p className="text-gray-400">Hyderabad, India</p>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>© 2025 Sampath Kumar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};