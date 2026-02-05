import React from 'react';
import './Features.css';

const Features = () => {
    const sections = [
        {
            title: "Planning",
            desc: "Set the product direction with projects and initiatives",
            link: "#",
            color: "#5e6ad2"
        },
        {
            title: "Building",
            desc: "Make progress with issue tracking and cycle planning",
            link: "#",
            color: "#e0d96c"
        },
        {
            title: "Artificial intelligence",
            desc: "Streamline product development with AI-powered workflows",
            link: "#",
            color: "#c96cd2"
        },
        {
            title: "Insights",
            desc: "Instant analytics for any stream of work",
            link: "#",
            color: "#6cbfd2"
        },
        {
            title: "Mobile",
            desc: "Move product work forward from anywhere",
            link: "#",
            color: "#7fd26c"
        },
        {
            title: "Customer Requests",
            desc: "Build what customers actually want",
            link: "#",
            color: "#d26c6c"
        },
        {
            title: "Linear Asks",
            desc: "Turn workplace requests into actionable issues",
            link: "#",
            color: "#d29a6c"
        },
        {
            title: "Security",
            desc: "Best-in-class security practices keep your work safe",
            link: "#",
            color: "#888888"
        }
    ];

    return (
        <div className="features-page">
            <div className="container features-container">
                {/* Header */}
                <div className="features-header">
                    <h1 className="features-title">
                        The system for <br /> modern product development
                    </h1>
                    <p className="features-subtitle">
                        Streamline work across the entire development cycle, from roadmap to release.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="features-grid">
                    {sections.map((section, idx) => {
                        const isFullWidth = idx < 2; 
                        return (
                            <div key={idx} className={`feature-card ${isFullWidth ? 'full-width' : ''}`}>
                                <div className="feature-card-content">
                                    <div className="feature-title-wrapper">
                                        <span className="feature-dot" style={{
                                            background: section.color,
                                            boxShadow: `0 0 12px ${section.color}`
                                        }}></span>
                                        {section.title}
                                    </div>
                                    <p className="feature-desc">
                                        {section.desc}
                                    </p>
                                </div>
                                {isFullWidth && (
                                    <div className="feature-divider">
                                        <div className="divider-line"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Features;
