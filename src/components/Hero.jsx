import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import './Hero.css';
import HeroUI from '../assets/images/hero-ui.png';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-container">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="hero-title"
                >
                    Linear is a purpose-built tool for<br />
                    planning and building products
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                    className="hero-subtitle"
                >
                    Meet the system for modern software development.<br />
                    Streamline issues, projects, and product roadmaps.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                    className="hero-actions"
                >
                    <button className="primary-btn">Start building</button>
                    <a href="#" className="secondary-link">
                        New: Linear agent for Slack <ChevronRight size={14} />
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }}
                className="hero-visual"
            >
                <div className="hero-glow"></div>
                <img src={HeroUI} alt="Linear UI Interface" className="hero-image glass" />
            </motion.div>
        </section>
    );
};



export default Hero;
