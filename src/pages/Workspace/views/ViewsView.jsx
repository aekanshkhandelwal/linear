import React from 'react';
import {
    Plus,
    Layout,
    Layers
} from 'lucide-react';

const ViewsView = ({
    views,
    activeView,
    setActiveView,
    setCurrentViewData,
    user
}) => {
    return (
        <main className="workspace-main" style={{ backgroundColor: '#0b0c0e' }}>
            <div className="views-header">
                <div className="views-breadcrumb-area">
                    <span className="views-title">Views</span>
                    <div className="views-tabs">
                        <div className="views-tab">Issues</div>
                        <div className="views-tab" onClick={() => setActiveView('projects')}>Projects</div>
                    </div>
                </div>
                <div className="views-actions-right">
                    <button className="display-btn">
                        <Layout size={14} /> Display
                    </button>
                    <button className="new-view-btn" onClick={() => {
                        setCurrentViewData(null); 
                        setActiveView('create_view');
                    }}>
                        <Plus size={14} /> New view
                    </button>
                </div>
            </div>

            {views.length > 0 ? (
                <div className="views-list-container">
                    <div className="views-list-header">
                        <div className="vl-col-name">Name <span style={{ marginLeft: 4 }}>↓</span></div>
                        <div className="vl-col-owner">Owner</div>
                    </div>

                    {/* Personal Views Group */}
                    <div className="vl-group-header">
                        <div className="vl-group-left">
                            <div className="vl-group-avatar">
                                {user?.name ? (user.name.split(' ')[1] ? (user.name.charAt(0) + user.name.split(' ')[1].charAt(0)).toUpperCase() : user.name.charAt(0).toUpperCase()) : 'AK'}
                            </div>
                            <span style={{ fontWeight: 600 }}>Personal views</span>
                            <span className="vl-group-subtitle">Only visible to you</span>
                        </div>
                        <Plus size={14} className="vl-group-add" onClick={() => {
                            setCurrentViewData(null);
                            setActiveView('create_view');
                        }} />
                    </div>

                    {views.map((view) => (
                        <div
                            className="vl-row"
                            key={view._id}
                            onClick={() => {
                                setCurrentViewData(view);
                                setActiveView('saved_view');
                            }}
                        >
                            <div className="vl-row-left">
                                <Layers size={14} color="#8a8f98" />
                                <span style={{ color: '#e3e4e8', fontSize: 13, fontWeight: 500 }}>{view.name}</span>
                                {view.description && <span className="vl-row-desc">{view.description}</span>}
                            </div>
                            <div className="vl-row-right">
                                <div className="vl-owner-pill">
                                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#007aff', fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {user?.name ? (user.name.split(' ')[1] ? (user.name.charAt(0) + user.name.split(' ')[1].charAt(0)).toUpperCase() : user.name.charAt(0).toUpperCase()) : 'AK'}
                                    </div>
                                    {user?.name || 'Aekansh Khandelwal'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State matches existing logic */
                <div className="views-empty-state">
                    <div className="views-empty-icon">
                        {/* Stacked Cards/Layers Icon */}
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M4 14.899l8 4.601 8-4.601" />
                            <path d="M12 2l-8 4.601 8 4.601 8-4.601-8-4.601z" />
                            <path d="M4 10.298l8 4.602 8-4.602" />
                        </svg>
                    </div>
                    <div className="views-empty-title">Views</div>
                    <div className="views-empty-description">
                        Create custom views using filters to show only the issues you want to see. You can save, share, and favorite these views for easy access and faster team collaboration.
                    </div>
                    <div className="views-empty-subtext">
                        You can also save any existing view by clicking the <span className="keyboard-shortcut"><Layers size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /></span> icon or by pressing <span className="keyboard-shortcut">Alt</span> <span className="keyboard-shortcut">V</span>.
                    </div>
                    <div className="views-empty-actions">
                        <button className="create-view-btn" onClick={() => setActiveView('create_view')}>Create new view</button>
                        <button className="documentation-btn">Documentation</button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default ViewsView;
