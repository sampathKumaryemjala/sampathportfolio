'use client';
import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, Code, Server, Cloud, Download, ExternalLink } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    icon: React.ReactNode;
    highlights: string[];
}

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState<string>('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const projects: Project[] = [
        {
            id: 1,
            title: "Credflexi Platform",
            description: "Enterprise-grade financial platform built with MERN stack and Next.js. Implemented RBAC for secure access management and optimized performance with Zustand state management.",
            technologies: ["Next.js", "TypeScript", "MongoDB", "Node.js", "Tailwind CSS", "Zustand"],
            icon: <Server className="w-6 h-6" />,
            highlights: [
                "Role-Based Access Control (RBAC) implementation",
                "RESTful API design and optimization",
                "Enhanced UI responsiveness with efficient state management"
            ]
        },
        {
            id: 2,
            title: "StreamX - Video Streaming POC",
            description: "High-performance video streaming platform prototype using Next.js with SSR and dynamic imports. Showcased optimized front-end architecture with type-safe components.",
            technologies: ["Next.js", "TypeScript", "React", "Redux Toolkit"],
            icon: <Code className="w-6 h-6" />,
            highlights: [
                "Server-Side Rendering (SSR) for improved performance",
                "Dynamic imports for code splitting",
                "Type-safe component architecture"
            ]
        },
        {
            id: 3,
            title: "College Management System",
            description: "Comprehensive management system for educational institutions with intuitive UI for administrators and students. Seamless frontend-backend integration with real-time data flow.",
            technologies: ["React", "Bootstrap", "RESTful APIs", "CSS"],
            icon: <Cloud className="w-6 h-6" />,
            highlights: [
                "Responsive UI with Bootstrap",
                "API integration for data management",
                "Enhanced usability for multiple user roles"
            ]
        }
    ];

    const scrollToSection = (section: string): void => {
        setActiveSection(section);
        setMobileMenuOpen(false);
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    };

    const menuItems: string[] = ['home', 'projects', 'cv', 'contact'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Sampath Yemjala
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                            {menuItems.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className={`capitalize hover:text-cyan-400 transition-all duration-300 font-medium relative group ${activeSection === item ? 'text-cyan-400' : 'text-slate-300'
                                        }`}
                                >
                                    {item}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full ${activeSection === item ? 'w-full' : ''
                                        }`}></span>
                                </button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors p-2 hover:bg-slate-800 rounded-lg"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 animate-fadeIn">
                        {menuItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className="block w-full text-left px-6 py-4 capitalize hover:bg-slate-800 hover:text-cyan-400 transition-all duration-200 border-b border-slate-800 last:border-b-0"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-8">
                        <div className="animate-fadeInUp">
                            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
                                Full Stack Developer
                            </h1>
                        </div>
                        <div className="animate-fadeInUp animation-delay-200">
                            <p className="text-xl sm:text-2xl text-slate-300 mb-6 font-light">
                                Building Scalable Web Applications with Modern Technologies
                            </p>
                        </div>
                        <div className="animate-fadeInUp animation-delay-400">
                            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                                5+ years of experience in React, Next.js, Node.js, and MongoDB.
                                Specializing in high-performance web applications, microservices architecture, and cloud integrations.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeInUp animation-delay-600">
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 flex items-center justify-center gap-2"
                            >
                                View Projects
                                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => scrollToSection('cv')}
                                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-slate-600 hover:border-cyan-500 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                View CV
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Core Technologies
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['React', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Tailwind CSS', 'Redux'].map((skill, index) => (
                            <div
                                key={skill}
                                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-700 transition-all duration-300 border border-slate-700 hover:border-cyan-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <span className="text-slate-200 font-semibold text-lg group-hover:text-cyan-400 transition-colors">
                                    {skill}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <p className="text-center text-slate-400 mb-16 text-lg">
                        Real-world applications showcasing modern web development
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 border border-slate-700 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/20"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                                            {project.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold ml-4 group-hover:text-cyan-400 transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-400 mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wider">
                                            Key Highlights
                                        </h4>
                                        <ul className="text-sm text-slate-400 space-y-2">
                                            {project.highlights.map((highlight, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-cyan-400 mr-2">▸</span>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-slate-300 border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-200 cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CV Section */}
            <section id="cv" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Curriculum Vitae
                    </h2>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl">
                        {/* Professional Summary */}
                        <div className="mb-12">
                            <h3 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                                Professional Summary
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                Results-driven Full Stack Developer with 5+ years of experience in designing and building scalable,
                                high-performance web applications. Skilled in React, Next.js, Node.js, and MongoDB, with expertise in
                                frontend performance optimization, backend API design, and secure data handling. Adept at working in
                                Agile environments, implementing CI/CD pipelines, and collaborating with cross-functional teams to
                                deliver business-focused solutions.
                            </p>
                        </div>

                        {/* Experience */}
                        <div className="mb-12">
                            <h3 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                                Professional Experience
                            </h3>

                            <div className="space-y-8">
                                {/* Compileinfy */}
                                <div className="relative pl-8 border-l-4 border-gradient-to-b from-cyan-500 to-blue-500 hover:border-cyan-400 transition-colors">
                                    <div className="absolute -left-2.5 top-0 w-4 h-4 bg-cyan-500 rounded-full ring-4 ring-slate-800"></div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                                        <div>
                                            <h4 className="text-2xl font-bold text-white">Full Stack Developer</h4>
                                            <p className="text-cyan-400 font-medium text-lg">Compileinfy Technology Solutions Pvt. Ltd</p>
                                        </div>
                                        <span className="text-slate-400 font-medium mt-2 sm:mt-0 bg-slate-900/50 px-4 py-1 rounded-full text-sm">
                                            Aug 2024 – Present
                                        </span>
                                    </div>
                                    <ul className="text-slate-300 space-y-3 mt-4">
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Spearheaded frontend development using MERN stack with Next.js, TypeScript, and Tailwind CSS</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Designed and implemented Role-Based Access Control (RBAC)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Built and optimized RESTful APIs using Node.js and Express</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Integrated MongoDB with efficient schema design for faster queries</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Emtarang */}
                                <div className="relative pl-8 border-l-4 border-gradient-to-b from-cyan-500 to-blue-500 hover:border-cyan-400 transition-colors">
                                    <div className="absolute -left-2.5 top-0 w-4 h-4 bg-cyan-500 rounded-full ring-4 ring-slate-800"></div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                                        <div>
                                            <h4 className="text-2xl font-bold text-white">Software Developer</h4>
                                            <p className="text-cyan-400 font-medium text-lg">Emtarang Tech Labs Pvt. Ltd (Logituit)</p>
                                        </div>
                                        <span className="text-slate-400 font-medium mt-2 sm:mt-0 bg-slate-900/50 px-4 py-1 rounded-full text-sm">
                                            Dec 2020 – June 2023
                                        </span>
                                    </div>
                                    <ul className="text-slate-300 space-y-3 mt-4">
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Developed and maintained Jio Cinema platform using MERN stack</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Delivered high-performance POC project using Next.js and TypeScript</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Built reusable, type-safe components with React and Redux Toolkit</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Mentored junior developers on MERN stack and Next.js best practices</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Cloudgen */}
                                <div className="relative pl-8 border-l-4 border-gradient-to-b from-cyan-500 to-blue-500 hover:border-cyan-400 transition-colors">
                                    <div className="absolute -left-2.5 top-0 w-4 h-4 bg-cyan-500 rounded-full ring-4 ring-slate-800"></div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                                        <div>
                                            <h4 className="text-2xl font-bold text-white">Frontend Developer</h4>
                                            <p className="text-cyan-400 font-medium text-lg">Cloudgen Systems</p>
                                        </div>
                                        <span className="text-slate-400 font-medium mt-2 sm:mt-0 bg-slate-900/50 px-4 py-1 rounded-full text-sm">
                                            Jun 2020 – Dec 2020
                                        </span>
                                    </div>
                                    <ul className="text-slate-300 space-y-3 mt-4">
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Built fully responsive web apps with React, HTML, CSS</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Designed dynamic UI components with optimized state handling</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* NSR */}
                                <div className="relative pl-8 border-l-4 border-gradient-to-b from-cyan-500 to-blue-500 hover:border-cyan-400 transition-colors">
                                    <div className="absolute -left-2.5 top-0 w-4 h-4 bg-cyan-500 rounded-full ring-4 ring-slate-800"></div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                                        <div>
                                            <h4 className="text-2xl font-bold text-white">Frontend Developer</h4>
                                            <p className="text-cyan-400 font-medium text-lg">NSR Info Systems</p>
                                        </div>
                                        <span className="text-slate-400 font-medium mt-2 sm:mt-0 bg-slate-900/50 px-4 py-1 rounded-full text-sm">
                                            Jan 2020 – May 2020
                                        </span>
                                    </div>
                                    <ul className="text-slate-300 space-y-3 mt-4">
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Developed College Management System UI using Bootstrap and CSS</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-3 mt-1">▸</span>
                                            <span>Integrated frontend with backend APIs for consistent data flow</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="mb-12">
                            <h3 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                                Education
                            </h3>
                            <div className="space-y-6 text-slate-300">
                                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
                                    <p className="font-bold text-xl text-white mb-2">B.Tech (ECE) - Malla Reddy Engineering College</p>
                                    <p className="text-slate-400 flex items-center gap-2">
                                        <span>2013 – 2017</span>
                                        <span className="text-cyan-400">•</span>
                                        <span className="text-cyan-400 font-semibold">70%</span>
                                    </p>
                                </div>
                                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
                                    <p className="font-bold text-xl text-white mb-2">Intermediate (MPC) - Narayana Junior College</p>
                                    <p className="text-slate-400 flex items-center gap-2">
                                        <span>2011 – 2013</span>
                                        <span className="text-cyan-400">•</span>
                                        <span className="text-cyan-400 font-semibold">94%</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Key Strengths */}
                        <div>
                            <h3 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                                Key Strengths
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    'End-to-end full stack solutions',
                                    'System design & architecture',
                                    'Cloud-native development (AWS)',
                                    'Agile/Scrum methodologies',
                                    'Performance optimization',
                                    'Team mentoring & code reviews'
                                ].map((strength, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 text-slate-300 bg-slate-900/50 rounded-xl p-4 border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-200 group"
                                    >
                                        <span className="text-cyan-400 group-hover:scale-125 transition-transform">▸</span>
                                        <span>{strength}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Get In Touch
                    </h2>
                    <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                        I am always interested in hearing about new opportunities and collaborations.
                        Lets build something amazing together!
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="mailto:sampathyemjala@example.com"
                            className="group flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 px-8 py-4 rounded-xl transition-all duration-300 border border-slate-700 hover:border-transparent hover:scale-105 shadow-lg hover:shadow-cyan-500/30"
                            aria-label="Email"
                        >
                            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">Email</span>
                        </a>
                        <a
                            href="https://github.com/sampathKumaryemjala"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 px-8 py-4 rounded-xl transition-all duration-300 border border-slate-700 hover:border-transparent hover:scale-105 shadow-lg hover:shadow-cyan-500/30"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">GitHub</span>
                        </a>
                        <a
                            href="https://linkedin.com/in/sampath-yemjala"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 px-8 py-4 rounded-xl transition-all duration-300 border border-slate-700 hover:border-transparent hover:scale-105 shadow-lg hover:shadow-cyan-500/30"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative bg-slate-950 border-t border-slate-800 py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-slate-400 text-lg mb-2">© 2024 Sampath Yemjala. All rights reserved.</p>
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                        Built with
                        <span className="text-cyan-400 font-semibold">Next.js</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-cyan-400 font-semibold">TypeScript</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-cyan-400 font-semibold">Tailwind CSS</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}