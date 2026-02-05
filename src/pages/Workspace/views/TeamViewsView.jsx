import React from 'react';
import {
    Star,
    SlidersHorizontal,
    Plus,
    Layers
} from 'lucide-react';

const TeamViewsView = ({ setActiveView }) => {
    return (
        <main className="workspace-main" style={{ backgroundColor: '#0b0c0e' }}>
            <div className="team-views-header">
                <div className="tv-breadcrumb-area">
                    <span className="tv-title">Views <Star size={12} className="tv-star-icon" fill="none" /></span>
                    <div className="tv-tabs">
                        <div className="tv-tab active">Issues</div>
                        <div className="tv-tab" onClick={() => setActiveView('team_projects')}>Projects</div>
                    </div>
                </div>
                <div className="tv-actions-right">
                    <button className="tv-display-btn">
                        <SlidersHorizontal size={14} /> Display
                    </button>
                    <button className="tv-new-view-btn" onClick={() => setActiveView('create_view')}>
                        <Plus size={14} /> New view
                    </button>
                </div>
            </div>

            <div className="tv-empty-state">
                <div className="tv-empty-icon">
                    {/* Stacked Cards Icon Approximation */}
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M2 13l10 5.5L22 13" />
                        <path d="M2 17l10 5.5L22 17" />
                        <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" />
                    </svg>
                </div>
                <div className="tv-empty-title">Views</div>
                <div className="tv-empty-description">
                    Create custom views using filters to show only the issues you want to see. You can save, share, and favorite these views for easy access and faster team collaboration.
                </div>
                <div className="tv-empty-subtext">
                    You can also save any existing view by clicking the <span className="tv-keyboard-shortcut"><Layers size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /></span> icon or by pressing <span className="tv-keyboard-shortcut">Alt</span> <span className="tv-keyboard-shortcut">V</span>.
                </div>
                <div className="tv-empty-actions">
                    <button className="tv-create-btn" onClick={() => setActiveView('create_view')}>Create new view</button>
                    <button className="tv-doc-btn">Documentation</button>
                </div>
            </div>
        </main>
    );
};

export default TeamViewsView;
