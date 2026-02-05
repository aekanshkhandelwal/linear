import React from 'react';
import './PlanningGrid.css';

import ManageProjects from '../assets/images/Manage Projects.png';
import ProjectUpdates from '../assets/images/Project Updates.png';

const PlanningGrid = () => {
    return (
        <section className="planning-grid">
            <div className="grid-container">
                {/* Left Card: Manage Projects */}
                <div className="grid-card">
                    <h3>Manage projects end-to-end</h3>
                    <p>Consolidate specs, milestones, tasks, and other documentation in one centralized location.</p>

                    <div className="mock-ui">
                        <img src={ManageProjects} alt="Manage Projects UI" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                </div>

                {/* Right Card: Project Updates */}
                <div className="grid-card">
                    <h3>Project updates</h3>
                    <p>Communicate progress and project health with built-in project updates.</p>

                    <div className="mock-ui">
                        <img src={ProjectUpdates} alt="Project Updates UI" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlanningGrid;
