import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '/src/components/Button.jsx';
import Footer from '/src/components/Footer.jsx';
import Alert from '/src/components/Alert.jsx';

const WelcomePage = () => {
   
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState({ message: '', type: '' });

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setNewsletterStatus({ message: '', type: '' });

        if (!newsletterEmail) {
            setNewsletterStatus({ message: 'Please enter a valid email address.', type: 'error' });
            return;
        }

        try {
            const { data } = await axios.post('https://mediq-api.onrender.com/api/subscribe', { email: newsletterEmail });
            setNewsletterStatus({ message: data.message, type: 'success' });
            setNewsletterEmail('');
        } catch (err) {
            setNewsletterStatus({ message: err.response?.data?.message || 'An error occurred.', type: 'error' });
        }
    };

   
    const testimonials = [
        {
            quote: "MediQ is a game-changer! I uploaded my prescription and got my results back the next day without ever leaving my house. So convenient.",
            author: "Sarah J.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib-rb-4.0.3"
        },
        {
            quote: "The process was incredibly simple and the user interface is beautiful. Tracking my order status was easy. Highly recommended!",
            author: "Mark C.",
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib-rb-4.0.3"
        },
        {
            quote: "Finally, a healthcare app that's actually easy to use. The 'How It Works' section was super clear and the whole experience was seamless.",
            author: "Emily R.",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib-rb-4.0.3"
        }
    ];

    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prevIndex) => 
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
                {/* Hero Section */}
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
                    <div className="lg:col-span-6 text-center lg:text-left">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            Your Health, <span className="text-teal-500">Simplified.</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Welcome to MediQ. Skip the lines and long waits. Upload your doctor's prescription and get your diagnostic tests done with unparalleled ease.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center lg:justify-start md:mt-8">
                            <Link to="/upload">
                                <Button size="large">
                                    Upload a Prescription
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-12 lg:mt-0 lg:col-span-6">
                        <div className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden p-4">
                            <img 
                                className="rounded-xl shadow-lg w-full animate-float-zoom transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40" 
                                src="src/images/depositphotos_100494552-stock-photo-blood-in-test-tube.jpg" alt="Tests"
                            />
                        </div>
                    </div>
                </div>

                {/* Feature Cards Section */}
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard icon={<UploadIcon />} title="Upload & Go" description="Simply upload a picture or PDF of your prescription." delay="200ms" />
                        <FeatureCard icon={<TrackIcon />} title="Track Orders" description="Monitor the status of your test orders from start to finish." delay="300ms" />
                        <FeatureCard icon={<ClockIcon />} title="Fast & Reliable" description="Get accurate results delivered to you in record time." delay="400ms" />
                        <FeatureCard icon={<ShieldIcon />} title="Secure & Private" description="Your personal health information is always kept confidential." delay="500ms" />
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="mt-20 py-12">
                     <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
                        <p className="mt-4 text-lg text-gray-600">A simple, three-step process to get your tests done.</p>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        <HowItWorksStep number="1" title="Upload Prescription" description="Securely upload a photo or PDF of your prescription." />
                        <HowItWorksStep number="2" title="We Process Your Order" description="Our team verifies your tests and prepares your order." />
                        <HowItWorksStep number="3" title="Get Your Reports" description="Receive your results quickly and securely in the 'My Reports' section." />
                    </div>
                </div>
                
                {/* Testimonials Section */}
                <div className="mt-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">What Our Users Say</h2>
                    </div>
                    <div className="mt-12 relative h-48 sm:h-40"> 
                        {testimonials.map((testimonial, index) => (
                             <div 
                                key={index} 
                                className={`absolute w-full transition-opacity duration-1000 ease-in-out ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`}
                            >
                                {index === currentTestimonial && (
                                    <TestimonialCard
                                        quote={testimonial.quote}
                                        author={testimonial.author}
                                        avatar={testimonial.avatar}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Newsletter Section */}
                <div className="mt-20">
                    <div className="max-w-3xl mx-auto text-center p-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl">
                        <h2 className="text-3xl font-extrabold text-gray-900">Stay Updated</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Subscribe to our newsletter to get the latest updates on our services and health tips.
                        </p>
                        
                        {newsletterStatus.message && (
                            <div className="mt-6 text-left">
                                <Alert message={newsletterStatus.message} type={newsletterStatus.type} />
                            </div>
                        )}

                        <form className="mt-8 sm:flex sm:justify-center" onSubmit={handleNewsletterSubmit}>
                            <div className="min-w-0 flex-1">
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input
                                    id="email-address"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                />
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <Button type="submit" size="large">
                                    Subscribe
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

// Sub-components for better organization
const FeatureCard = ({ icon, title, description, delay }) => (
    <div className="pt-6 animate-fadeInUp" style={{ animationDelay: delay }}>
        <div className="flow-root bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl px-6 pb-8 h-full transform hover:-translate-y-2 transition-transform duration-300">
            <div className="-mt-6">
                <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl shadow-lg">
                        {icon}
                    </span>
                </div>
                <h3 className="mt-8 text-lg font-bold text-gray-900 tracking-tight">{title}</h3>
                <p className="mt-5 text-base text-gray-600">{description}</p>
            </div>
        </div>
    </div>
);

const HowItWorksStep = ({ number, title, description }) => (
    <div className="text-center p-8 bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-110">
        <div className="flex items-center justify-center h-16 w-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mx-auto text-white font-bold text-2xl">{number}</div>
        <h3 className="mt-6 text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
    </div>
);

const TestimonialCard = ({ quote, author, avatar }) => (
    <div className="p-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg mx-auto max-w-2xl animate-slideInFromRight">
        <p className="text-gray-600 italic text-center">"{quote}"</p>
        <div className="flex items-center justify-center mt-4">
            <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt={author} />
            <p className="ml-4 font-bold text-gray-800">{author}</p>
        </div>
    </div>
);

// SVG Icons
const UploadIcon = () => <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>;
const TrackIcon = () => <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>;
const ClockIcon = () => <svg className="h-8 w-8 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M13 3a1 1 0 0 1 1 1v4.535l3.938 1.969a1 1 0 0 1 .562 .93v4.566a1 1 0 0 1 -1.562 .836l-3.938 -1.97v4.134a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-4.134l-3.938 1.97a1 1 0 0 1 -1.562 -.836v-4.566a1 1 0 0 1 .562 -.93l3.938 -1.969v-4.535a1 1 0 0 1 1 -1h2z" /></svg>;
const ShieldIcon = () => <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.611-1.573a8.986 8.986 0 006.775 0l5.611 1.573A12.02 12.02 0 0021 15.417a11.955 11.955 0 01-5.382-3.433z" /></svg>;

export default WelcomePage;

