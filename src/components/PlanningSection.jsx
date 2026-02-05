import React from 'react';
import { ChevronRight } from 'lucide-react';
import './PlanningSection.css';
import PlaningImage from '../assets/images/planing.png';

const PlanningSection = () => {
    return (
        <section className="planning-section">
            <div className="container">
                <div className="planning-header">
                    <div className="planning-badge">
                        <span className="icon-dot"></span>
                        Project and long-term planning
                        <ChevronRight size={12} />
                    </div>
                    <h2>Set the product direction</h2>
                    <p>
                        <span className="highlight-text">Align your team around a unified product timeline.</span> Plan, manage, and track all product initiatives with Linear's visual planning tools.
                    </p>
                </div>

                <div className="planning-visual">
                    <img src={PlaningImage} alt="Planning Interface" className="planning-image glass" />
                </div>
            </div>
        </section>
    );
};

export default PlanningSection;
