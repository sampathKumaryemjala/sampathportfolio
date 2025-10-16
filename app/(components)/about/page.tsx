import { Layout } from '@/app/reusableComponents/layout/Layout';
import { Card } from '@/app/reusableComponents/ui/Card';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    const stats = [
        { number: '5+', label: 'Years Experience' },
        { number: '50+', label: 'Projects Completed' },
        { number: '30+', label: 'Happy Clients' },
        { number: '99%', label: 'Client Satisfaction' },
    ];

    const skills = [
        { name: 'React & Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Node.js & Express', level: 88 },
        { name: 'AWS & Cloud', level: 85 },
        { name: 'MongoDB & PostgreSQL', level: 87 },
        { name: 'UI/UX Design', level: 80 },
    ];

    const timeline = [
        {
            year: '2025',
            title: 'Senior Full-Stack Developer',
            company: 'Tech Innovations Inc.',
            description: 'Leading development of enterprise AI solutions and mentoring junior developers.',
        },
        {
            year: '2023',
            title: 'Full-Stack Developer',
            company: 'Digital Solutions Co.',
            description: 'Built scalable web applications using React, Node.js, and AWS.',
        },
        {
            year: '2021',
            title: 'Frontend Developer',
            company: 'StartUp Labs',
            description: 'Developed responsive user interfaces and improved performance by 40%.',
        },
        {
            year: '2020',
            title: 'Started Journey',
            company: 'Self-taught',
            description: 'Began learning web development and building personal projects.',
        },
    ];

    return (
        <Layout>
            <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-6xl font-bold mb-6">About Me</h1>
                        <p className="text-2xl text-purple-100">
                            Full-Stack Developer passionate about building amazing web experiences
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl font-bold text-purple-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Hi, I am Sampath Kumar</h2>
                            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                                <p>
                                    I am a passionate Full-Stack Developer based in Hyderabad, India, with over 5 years of experience building web applications that make a difference.
                                </p>
                                <p>
                                    My journey in tech started with a curiosity about how websites work, and it quickly evolved into a deep passion for creating seamless, user-friendly experiences. I specialize in React, Next.js, TypeScript, and Node.js, but I am always learning new technologies.
                                </p>
                                <p>
                                    When I am not coding, you ll find me contributing to open-source projects, writing technical blogs, or mentoring aspiring developers. I believe in building products that not only look good but also solve real problems.
                                </p>
                                <p>
                                    Let us build something amazing together! 🚀
                                </p>
                            </div>
                        </div>

                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&q=80"
                                alt="Sampath Kumar"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Technical Skills</h2>

                        <div className="space-y-6">
                            {skills.map((skill, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-lg font-semibold text-gray-800">{skill.name}</span>
                                        <span className="text-purple-600 font-bold">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">My Journey</h2>

                        <div className="relative">
                            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-purple-200" />

                            <div className="space-y-12">
                                {timeline.map((item, index) => (
                                    <div key={index} className="relative">
                                        <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg" />

                                            <Card className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                                                <div className="p-6">
                                                    <div className="text-purple-600 font-bold text-lg mb-2">{item.year}</div>
                                                    <h3 className="text-xl font-bold mb-1 text-gray-900">{item.title}</h3>
                                                    <div className="text-gray-600 mb-2">{item.company}</div>
                                                    <p className="text-gray-700">{item.description}</p>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">Let s Work Together</h2>
                    <p className="text-xl mb-8 text-purple-100">
                        Have a project in mind? Let s discuss how I can help bring your ideas to life.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
                    >
                        Get In Touch
                    </Link>
                </div>
            </section>
        </Layout>
    );
}

export const metadata = {
    title: 'About - Sampath Portfolio',
    description: 'Learn more about Sampath Kumar - Full-Stack Developer',
};