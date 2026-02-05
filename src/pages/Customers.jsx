
import React, { useState } from 'react';
import {
    Globe, LayoutTemplate, DollarSign, Zap, CheckCircle, Aperture,
    Bot, CircleDollarSign, Terminal, CreditCard, Triangle, Database, Landmark,
    Search, Table, FileText, Mountain, Droplet, Heart, BarChart, Rocket, User,
    ChevronRight, ArrowUpRight, Wrench, Cloud, Mic, Hexagon, Mail, Shield, Camera,
    Plane, Music, Image, Speaker, Link, Map, MessageCircle, Anchor, Moon, Gamepad2,
    FlaskConical, Sun, Clipboard, Video, Code, Box
} from 'lucide-react';
import './Customers.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const featuredStories = [
    {
        company: 'OpenAI',
        logo: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 2a10 10 0 1 0 10 10H12V2z" /></svg>, // Placeholder
        title: 'Moving fast and tackling complexity: building systems that scale at OpenAI',
        link: 'Read story'
    },
    {
        company: 'Ramp',
        logo: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>, // Placeholder
        title: 'Why Ramp chose the fastest-moving product tool',
        link: 'Read story'
    },
    {
        company: 'Brex',
        logo: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>, // Flag
        title: '“One roadmap”: How Brex consolidated their fragmented planning',
        link: 'Read story'
    },
    {
        company: 'Scale',
        logo: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>, // Arrow
        title: 'Linear accelerates Scale’s high velocity',
        link: 'Read story'
    }
];

const customerStories = [
    {
        icon: <Globe size={24} />,
        title: "Linear Projects give Mercury a source-of-truth across all their work",
        link: 'Read story'
    },
    {
        icon: <LayoutTemplate size={24} />,
        title: "Linear keeps Retool's teams customer-focused",
        link: 'Read story'
    },
    {
        icon: <DollarSign size={24} />,
        title: "Linear helps Cash App manage aggressive roadmaps",
        link: 'Read story'
    },
    {
        icon: <Zap size={24} />,
        title: "Pleo transitioned their internal support workflows to Linear Asks",
        link: 'Read story'
    },
    {
        icon: <CheckCircle size={24} />,
        title: "How Linear helps engineering managers at Clio operate more efficiently",
        link: 'Read story'
    },
    {
        icon: <Aperture size={24} />,
        title: "From project updates to accountability, Sierra moves as one company in Linear",
        link: 'Read story'
    }
];

const companyList = [
    // Featured (Initial list mostly)
    { name: 'OpenAI', icon: <Bot size={20} />, tags: 'AI, Enterprise', link: 'Read story', action: 'read', categories: ['Featured', 'AI', 'Enterprise'] },
    { name: 'Coinbase', icon: <CircleDollarSign size={20} />, tags: 'Fintech, Enterprise', link: 'Visit site', action: 'visit', categories: ['Featured', 'Fintech', 'Enterprise'] },
    { name: 'Cursor', icon: <Terminal size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['Featured', 'AI'] },
    { name: 'Ramp', icon: <CreditCard size={20} />, tags: 'Fintech, Enterprise', link: 'Read story', action: 'read', categories: ['Featured', 'Fintech', 'Enterprise'] },
    { name: 'Vercel', icon: <Triangle size={20} fill="currentColor" />, tags: 'SaaS, AI', link: 'Visit site', action: 'visit', categories: ['Featured', 'SaaS', 'AI'] },
    { name: 'Automattic', icon: <Aperture size={20} />, tags: 'Consumer, SaaS, Enterprise', link: 'Read story', action: 'read', categories: ['Featured', 'Consumer', 'SaaS', 'Enterprise'] },
    { name: 'Brex', icon: <CreditCard size={20} />, tags: 'Fintech', link: 'Read story', action: 'read', categories: ['Featured', 'Fintech'] },
    { name: 'Scale', icon: <Database size={20} />, tags: 'AI, Enterprise', link: 'Read story', action: 'read', categories: ['Featured', 'AI', 'Enterprise'] },
    { name: 'Mercury', icon: <Landmark size={20} />, tags: 'Fintech, Enterprise', link: 'Read story', action: 'read', categories: ['Featured', 'Fintech', 'Enterprise'] },
    { name: 'Cash App', icon: <DollarSign size={20} />, tags: 'Fintech, Consumer, Enterprise', link: 'Read story', action: 'read', categories: ['Featured', 'Fintech', 'Consumer', 'Enterprise'] },
    { name: 'Perplexity', icon: <Search size={20} />, tags: 'AI, Consumer', link: 'Visit site', action: 'visit', categories: ['Featured', 'AI', 'Consumer'] },
    { name: 'Clay', icon: <Table size={20} />, tags: 'SaaS', link: 'Read story', action: 'read', categories: ['Featured', 'SaaS'] },
    { name: 'Substack', icon: <FileText size={20} />, tags: 'Consumer', link: 'Visit site', action: 'visit', categories: ['Featured', 'Consumer'] },
    { name: 'Sierra', icon: <Mountain size={20} />, tags: 'AI', link: 'Read story', action: 'read', categories: ['Featured', 'AI'] },
    { name: 'Watershed', icon: <Droplet size={20} />, tags: 'SaaS', link: 'Read story', action: 'read', categories: ['Featured', 'SaaS'] },
    { name: 'Lovable', icon: <Heart size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['Featured', 'AI'] },
    { name: 'Remote', icon: <Globe size={20} />, tags: 'SaaS, Enterprise', link: 'Read story', action: 'read', categories: ['Featured', 'SaaS', 'Enterprise'] },
    { name: 'Polymarket', icon: <BarChart size={20} />, tags: 'Consumer', link: 'Visit site', action: 'visit', categories: ['Featured', 'Consumer'] },
    { name: 'Boom', icon: <Rocket size={20} />, tags: 'Hardware', link: 'Visit site', action: 'visit', categories: ['Featured', 'Hardware'] },

    // Additional SaaS
    { name: 'Retool', icon: <Wrench size={20} />, tags: 'SaaS', link: 'Read story', action: 'read', categories: ['SaaS'] },
    { name: 'Clio', icon: <CheckCircle size={20} />, tags: 'SaaS, AI, Enterprise', link: 'Read story', action: 'read', categories: ['SaaS', 'AI', 'Enterprise', 'Health'] }, // Assuming health context for Clio often, but user said Enterprise in prompt
    { name: 'Descript', icon: <Video size={20} />, tags: 'SaaS, AI', link: 'Read story', action: 'read', categories: ['SaaS', 'AI'] },
    { name: 'Netlify', icon: <Cloud size={20} />, tags: 'SaaS', link: 'Visit site', action: 'visit', categories: ['SaaS'] },
    { name: 'Raycast', icon: <Terminal size={20} />, tags: 'SaaS', link: 'Read story', action: 'read', categories: ['SaaS'] },
    { name: 'Semgrep', icon: <Code size={20} />, tags: 'SaaS', link: 'Read story', action: 'read', categories: ['SaaS'] },
    { name: 'Hex', icon: <Hexagon size={20} />, tags: 'SaaS', link: 'Visit site', action: 'visit', categories: ['SaaS'] },
    { name: 'Meter', icon: <Box size={20} />, tags: 'SaaS, Hardware', link: 'Visit site', action: 'visit', categories: ['SaaS', 'Hardware'] },
    { name: 'Superhuman', icon: <Mail size={20} />, tags: 'SaaS', link: 'Visit site', action: 'visit', categories: ['SaaS'] },
    { name: 'Twingate', icon: <Shield size={20} />, tags: 'SaaS', link: 'Read story', action: 'read', categories: ['SaaS'] },
    { name: 'Verkada', icon: <Camera size={20} />, tags: 'SaaS, Hardware', link: 'Visit site', action: 'visit', categories: ['SaaS', 'Hardware'] },
    { name: 'Supabase', icon: <Database size={20} />, tags: 'SaaS', link: 'Visit site', action: 'visit', categories: ['SaaS'] },
    { name: 'Parafin', icon: <CreditCard size={20} />, tags: 'Fintech, SaaS', link: 'Visit site', action: 'visit', categories: ['SaaS', 'Fintech'] },

    // Additional AI
    { name: 'Runway', icon: <Plane size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Cohere', icon: <Link size={20} />, tags: 'AI', link: 'Read story', action: 'read', categories: ['AI'] },
    { name: 'Harvey', icon: <FileText size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] }, // Legal AI
    { name: 'Replit', icon: <Terminal size={20} />, tags: 'Consumer, AI', link: 'Visit site', action: 'visit', categories: ['AI', 'Consumer'] },
    { name: 'Suno', icon: <Music size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Together AI', icon: <User size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Photoroom', icon: <Image size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'ElevenLabs', icon: <Speaker size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Decagon', icon: <Hexagon size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'LangChain', icon: <Link size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Bolt', icon: <Zap size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Factory', icon: <Wrench size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Cartesia', icon: <Map size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Speak', icon: <Mic size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Gamma', icon: <LayoutTemplate size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Pika', icon: <Video size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },
    { name: 'Cresta', icon: <MessageCircle size={20} />, tags: 'AI', link: 'Visit site', action: 'visit', categories: ['AI'] },

    // Additional Fintech
    { name: 'Pleo', icon: <CreditCard size={20} />, tags: 'Fintech', link: 'Read story', action: 'read', categories: ['Fintech'] },
    { name: 'Monzo', icon: <CreditCard size={20} />, tags: 'Fintech, Consumer', link: 'Visit site', action: 'visit', categories: ['Fintech', 'Consumer'] },
    { name: 'OpenSea', icon: <Anchor size={20} />, tags: 'Fintech', link: 'Visit site', action: 'visit', categories: ['Fintech'] },
    { name: 'Alan', icon: <Heart size={20} />, tags: 'Health, Fintech', link: 'Read story', action: 'read', categories: ['Fintech', 'Health'] },
    { name: 'Moonpay', icon: <Moon size={20} />, tags: 'Fintech', link: 'Visit site', action: 'visit', categories: ['Fintech'] },
    { name: 'Pulley', icon: <Table size={20} />, tags: 'Fintech', link: 'Read story', action: 'read', categories: ['Fintech'] },
    { name: 'Modern Treasury', icon: <Landmark size={20} />, tags: 'Fintech', link: 'Visit site', action: 'visit', categories: ['Fintech'] },
    { name: 'Worldcoin', icon: <Globe size={20} />, tags: 'Fintech', link: 'Visit site', action: 'visit', categories: ['Fintech'] },

    // Additional Consumer
    { name: 'The Browser Company', icon: <Globe size={20} />, tags: 'Consumer', link: 'Read story', action: 'read', categories: ['Consumer'] },
    { name: 'Supercell', icon: <Gamepad2 size={20} />, tags: 'Consumer', link: 'Visit site', action: 'visit', categories: ['Consumer'] },
    { name: 'Curology', icon: <FlaskConical size={20} />, tags: 'Health, Consumer', link: 'Visit site', action: 'visit', categories: ['Consumer', 'Health'] },
    { name: 'Outside', icon: <Sun size={20} />, tags: 'Consumer', link: 'Visit site', action: 'visit', categories: ['Consumer'] },
    { name: 'Fellow', icon: <User size={20} />, tags: 'Consumer, Hardware', link: 'Visit site', action: 'visit', categories: ['Consumer', 'Hardware'] },

    // Additional Health
    { name: 'Curative', icon: <Heart size={20} />, tags: 'Health', link: 'Visit site', action: 'visit', categories: ['Health'] },
    { name: 'Clipboard Health', icon: <Clipboard size={20} />, tags: 'Health', link: 'Visit site', action: 'visit', categories: ['Health'] },
    { name: 'Commure', icon: <Heart size={20} />, tags: 'Health, Enterprise', link: 'Visit site', action: 'visit', categories: ['Health', 'Enterprise'] },

];

const filters = ['Featured', 'SaaS', 'AI', 'Fintech', 'Consumer', 'Hardware', 'Health', 'Enterprise'];

const Customers = () => {
    const [activeFilter, setActiveFilter] = useState('Featured');

    const filteredCompanies = companyList.filter(company =>
        company.categories.includes(activeFilter)
    );

    return (
        <>
            <Navbar /> {/* Ensure Navbar is present if not handled by layout */}
            <div className="customers-page">
                <section className="customers-hero">
                    <h1>Meet the teams <br />who build the future</h1>
                    <p>Trusted by more than 20,000 organizations,<br /> from ambitious startups to major enterprises.s</p>
                </section>

                <section className="featured-stories">
                    {featuredStories.map((story, index) => (
                        <div className="featured-card" key={index}>
                            <div className="featured-card-content">
                                <div className="featured-icon">{story.logo}</div>
                                <h3>{story.title}</h3>
                                <a href="#" className="featured-link">{story.link} &rarr;</a>
                            </div>
                            <div className="featured-bg-pattern"></div>
                        </div>
                    ))}
                </section>

                <section className="customer-stats">
                    <div className="stats-container">
                        <div className="stat-group">
                            <div className="stat-item">
                                <div className="stat-number">2x</div>
                                <div className="stat-label">Increase in filed issues</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">1.6x</div>
                                <div className="stat-label">Faster issue resolution</div>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-description">
                            Teams that switch to Linear create <br />more issues and close them faster
                            <span className="info-icon">i</span>
                        </div>
                    </div>
                </section>

                <section className="stories-grid">
                    {customerStories.map((story, index) => (
                        <div className="story-card" key={index}>
                            <div className="story-icon-wrapper">
                                {story.icon}
                            </div>
                            <h3 className="story-title">{story.title}</h3>
                            <span className="story-read-link">{story.link}</span>
                        </div>
                    ))}
                </section>

                <section className="company-list-section">
                    <div className="company-list-header">
                        <h2>Powering 20,000+ ambitious <br />product teams of all shapes and sizes</h2>
                        <div className="company-filters">
                            {filters.map((filter, idx) => (
                                <button
                                    key={idx}
                                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="company-list">
                        {filteredCompanies.map((company, index) => (
                            <a href="#" className="company-row" key={index}>
                                <div className="company-info">
                                    <div className="company-logo">{company.icon}</div>
                                    <span className="company-name">{company.name}</span>
                                </div>
                                <div className="company-tags">{company.tags}</div>
                                <div className="company-action">
                                    {company.link}
                                    {company.action === 'visit' ? <ArrowUpRight size={14} /> : <ChevronRight size={14} />}
                                </div>
                            </a>
                        ))}
                        {/* Final row for 'Your company' */}
                        <a href="#" className="company-row your-company">
                            <div className="company-info">
                                <div className="company-logo"><User size={20} /></div>
                                <span className="company-name">Your company</span>
                            </div>
                            <div className="company-tags"></div>
                            <div className="company-action">
                                Make the switch <ChevronRight size={14} />
                            </div>
                        </a>
                    </div>
                </section>


            </div>
            <Footer />
        </>
    );
};

export default Customers;
