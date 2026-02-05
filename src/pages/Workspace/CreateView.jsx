import React, { useState } from 'react';
import './CreateView.css';
import {
    Lock,
    ListFilter,
    SlidersHorizontal,
    Box,
    MoreHorizontal,
    CircleDashed,
    User as UserIcon,
    Circle,
    Calendar,
    Link as LinkIcon,
    Layers
} from 'lucide-react';
import { API_BASE_URL } from '../../config';

const CreateView = ({ onCancel, onSave, user, projects = [], initialData = null }) => {
    const [title, setTitle] = useState(initialData?.name || 'All projects');
    const [description, setDescription] = useState(initialData?.description || '');
    const [activeTab, setActiveTab] = useState('projects');

    const displayProjects = projects.length > 0 ? projects : [];

    return (
        <div className="create-view-container">
            {/* Top Bar Header (Breadcrumb only) */}
            <header className="cv-top-header">
                <div className="cv-breadcrumb">
                    <span className="cv-breadcrumb-inactive">Views</span>
                    <span className="cv-breadcrumb-separator">›</span>
                    <span className="cv-breadcrumb-active">All projects</span>
                </div>
                <div className="cv-top-actions">
                    <LinkIcon size={16} className="cv-link-icon" />
                </div>
            </header>

            {/* Main Content */}
            <div className="cv-content">

                {/* Title Row: Icon + Title Input + Action Buttons */}
                <div className="cv-title-row">
                    <div className="cv-title-left">
                        <div className="cv-icon-box">
                            <Layers size={20} />
                        </div>
                        <input
                            type="text"
                            className="cv-main-title-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="View name"
                        />
                    </div>

                    <div className="cv-title-actions">
                        <div className="cv-save-options">
                            <span>Save to</span>
                            <div className="cv-save-target">
                                <Lock size={12} />
                                <span>Personal</span>
                            </div>
                        </div>
                        <button className="cv-cancel-btn" onClick={onCancel}>Cancel</button>
                        <button className="cv-save-btn" onClick={async () => {
                            try {
                                const userId = user?._id || user?.googleId;
                                if (!userId) {
                                    console.error("No user ID found");
                                    return;
                                }

                                const url = initialData
                                    ? `${API_BASE_URL}/api/views/${initialData._id}`
                                    : `${API_BASE_URL}/api/views`;

                                const method = initialData ? 'PUT' : 'POST';

                                const response = await fetch(url, {
                                    method: method,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        name: title,
                                        description: description,
                                        owner: userId,
                                        type: 'projects', // Defaulting to projects for now
                                        visibility: 'Personal'
                                    })
                                });

                                if (response.ok) {
                                    const savedView = await response.json();
                                    onSave(savedView); // Trigger parent callback with saved data
                                } else {
                                    console.error("Failed to save view");
                                }
                            } catch (error) {
                                console.error("Error saving view:", error);
                            }
                        }}>{initialData ? 'Update' : 'Save'}</button>
                    </div>
                </div>

                {/* Description Row */}
                <div className="cv-description-row">
                    <input
                        type="text"
                        className="cv-main-desc-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                    />
                </div>

                {/* Tabs & Toolbar */}
                <div className="cv-tabs-toolbar">
                    <div className="cv-tabs-left">
                        <div className="cv-tabs">
                            <div
                                className={`cv-tab ${activeTab === 'issues' ? 'active' : ''}`}
                                onClick={() => setActiveTab('issues')}
                            >
                                Issues
                            </div>
                            <div
                                className={`cv-tab ${activeTab === 'projects' ? 'active' : ''}`}
                                onClick={() => setActiveTab('projects')}
                            >
                                Projects
                            </div>
                        </div>
                        <div className="cv-filter-btn">
                            <ListFilter size={16} /> Filter
                        </div>
                    </div>
                    <div className="cv-display-btn">
                        <SlidersHorizontal size={14} /> Display
                    </div>
                </div>

                {/* Content Area (Project List) */}
                {activeTab === 'projects' && (
                    <div className="cv-list-container">
                        <div className="cv-table-header">
                            <div className="cv-col-name">Name</div>
                            <div className="cv-col-health">Health</div>
                            <div className="cv-col-priority">Priority</div>
                            <div className="cv-col-lead">Lead</div>
                            <div className="cv-col-date">Target date</div>
                            <div className="cv-col-status">Status</div>
                        </div>

                        {displayProjects.length > 0 ? (
                            displayProjects.map((project, index) => (
                                <div className="cv-table-row" key={project._id || index}>
                                    <div className="cv-row-name">
                                        <div className="cv-row-icon"><Box size={14} /></div>
                                        <span>{project.name}</span>
                                    </div>
                                    <div className="cv-row-health">
                                        <CircleDashed size={14} style={{ opacity: 0.3 }} />
                                        <span style={{ opacity: 0.7 }}>No updates</span>
                                    </div>
                                    <div className="cv-row-priority">
                                        <MoreHorizontal size={14} style={{ opacity: 0.4 }} />
                                    </div>
                                    <div className="cv-row-lead">
                                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'transparent', border: '1px dashed #4a4d55', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <UserIcon size={10} color="#8a8f98" />
                                        </div>
                                    </div>
                                    <div className="cv-row-date">
                                        {/* Placeholder for date or interactive element */}
                                        <div style={{ width: 18, height: 18, border: '1px dashed #4a4d55', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: 10, color: '#8a8f98' }}>+</span>
                                        </div>
                                    </div>
                                    <div className="cv-row-status">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <CircleDashed size={14} color="#fce883" />
                                            <span style={{ color: '#e3e4e8' }}>0%</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="cv-table-row">
                                <div className="cv-row-name">
                                    <div className="cv-row-icon"><Box size={14} /></div>
                                    <span style={{ fontWeight: 500 }}>demo</span>
                                </div>
                                <div className="cv-row-health">
                                    <CircleDashed size={14} style={{ opacity: 0.3 }} />
                                    <span style={{ opacity: 0.7 }}>No updates</span>
                                </div>
                                <div className="cv-row-priority">
                                    <MoreHorizontal size={14} style={{ opacity: 0.4 }} />
                                </div>
                                <div className="cv-row-lead">
                                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'transparent', border: '1px dashed #4a4d55', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <UserIcon size={10} color="#8a8f98" />
                                    </div>
                                </div>
                                <div className="cv-row-date">
                                    <div style={{ width: 18, height: 18, border: '1px dashed #4a4d55', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: 10, color: '#8a8f98' }}>+</span>
                                    </div>
                                </div>
                                <div className="cv-row-status">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <CircleDashed size={14} color="#fce883" />
                                        <span style={{ color: '#e3e4e8' }}>0%</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateView;
