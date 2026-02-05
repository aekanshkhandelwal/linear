import React from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import './FeatureGrid.css';

const FeatureGrid = () => {
    return (
        <section className="features-section" id="features">
            <div className="container">
                <div className="feature-header">
                    <h2 className="feature-title">Made for modern<br />product teams</h2>
                    <p className="feature-description">
                        Linear is shaped by the practices and principles that distinguish world-class product teams from the rest: relentless focus, fast execution, and a commitment to the quality of craft. <a href="#" className="switch-link">Make the switch <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></a>
                    </p>
                </div>
                <div className="three-col-grid">
                    {/* Card 1: Purpose-built */}
                    <div className="feature-card">
                        <div className="card-visual visual-layers">
                            <div className="layer l1"></div>
                            <div className="layer l2"></div>
                            <div className="layer l3">
                                <div className="circle-graphic"></div>
                            </div>
                        </div>
                        <div className="card-text">
                            <h3>Purpose-built for<br />product development</h3>
                            <button className="add-btn"><Plus size={16} /></button>
                        </div>
                    </div>

                    {/* Card 2: Designed to move fast */}
                    <div className="feature-card">
                        <div className="card-visual visual-speed">
                            <div className="speed-lines">
                                <span className="s-line"></span>
                                <span className="s-line"></span>
                                <span className="s-line"></span>
                                <span className="s-line"></span>
                            </div>
                            <div className="speed-badge">50ms</div>
                        </div>
                        <div className="card-text">
                            <h3>Designed to<br />move fast</h3>
                            <button className="add-btn"><Plus size={16} /></button>
                        </div>
                    </div>

                    {/* Card 3: Crafted to perfection */}
                    <div className="feature-card">
                        <div className="card-visual visual-craft">
                            <div className="craft-grid">
                                <div className="craft-node center">
                                    <span className="node-label">Create</span>
                                </div>
                                <div className="dashed-line"></div>
                            </div>
                        </div>
                        <div className="card-text">
                            <h3>Crafted to<br />perfection</h3>
                            <button className="add-btn"><Plus size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
