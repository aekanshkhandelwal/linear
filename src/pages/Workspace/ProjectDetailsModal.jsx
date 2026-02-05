import React from 'react';
import {
    X, Box, ChevronRight, CircleDashed, Calendar, MoreHorizontal,
    User, Link as LinkIcon, Users, Activity, FileText, Layout,
    List, Plus, Tag, Flag
} from 'lucide-react';
import './ProjectDetailsModal.css';

const ProjectDetailsModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="pd-view-container">
            {/* Top Navigation / Header */}
            <div className="pd-header">
                <div className="pd-breadcrumb-area">
                    <span className="pd-breadcrumb-item" onClick={onClose}>Projects</span>
                    <ChevronRight size={14} />
                    <span style={{ color: '#e3e4e8' }}>{project.name}</span>
                    <div style={{ marginLeft: 8 }}>
                        <MoreHorizontal size={14} />
                    </div>
                </div>

                <div className="pd-tabs">
                    <div className="pd-tab active">
                        <Layout size={14} /> Overview
                    </div>
                    <div className="pd-tab">
                        <List size={14} /> Updates
                    </div>
                    <div className="pd-tab">
                        <Box size={14} /> Issues
                    </div>
                </div>

                <div className="pd-actions">
                    {/* Placeholder for right side actions if any */}
                    <div style={{ width: 20 }}></div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="pd-main-layout">
                {/* Center Content */}
                <div className="pd-content-area">
                    <div className="pd-project-header">
                        <div className="pd-icon-title-row">
                            <div className="pd-project-icon-large">
                                <Box size={20} color="#e3e4e8" />
                            </div>
                            <h1 className="pd-project-title">{project.name}</h1>
                        </div>
                        <div className="pd-project-summary">
                            {project.summary || 'No summary'}
                        </div>

                        <div className="pd-horiz-props">
                            <div className="pd-prop-group">
                                Properties
                            </div>
                            <div className="pd-prop-val-box">
                                <CircleDashed size={14} color="#e3e4e8" />
                                {project.status.replace('_', ' ')}
                            </div>
                            <div className="pd-prop-val-box">
                                <Flag size={14} color="#e3e4e8" />
                                {project.priority.replace('_', ' ')}
                            </div>
                            <div className="pd-prop-val-box">
                                <User size={14} color="#e3e4e8" />
                                Lead
                            </div>
                            <div className="pd-prop-val-box">
                                <Activity size={14} color="#e3e4e8" />
                                Target date
                            </div>
                            <div className="pd-prop-val-box">
                                <div style={{ width: 14, height: 14, background: '#a52b65', borderRadius: 2, fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>A</div>
                                Aekansh
                            </div>
                        </div>

                        <div className="pd-resources-row">
                            <span>Resources</span>
                            <span className="pd-add-resource">+ Add document or link...</span>
                        </div>
                    </div>

                    <button className="pd-update-btn-large">
                        <FileText size={16} /> Write first project update
                    </button>

                    <div className="pd-description-section">
                        <div className="pd-section-title">Description</div>
                        <div className="pd-description-text">
                            {project.description || project.summary || "No description provided."}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="pd-right-sidebar">
                    <div className="pd-sidebar-group">
                        <div className="pd-sidebar-header">
                            Properties
                            <Plus size={14} style={{ cursor: 'pointer' }} />
                        </div>

                        <div className="pd-sidebar-row">
                            <span className="pd-sidebar-label">Status</span>
                            <div className="pd-sidebar-value">
                                <CircleDashed size={14} color="#e6b450" /> {project.status.replace('_', ' ')}
                            </div>
                        </div>
                        <div className="pd-sidebar-row">
                            <span className="pd-sidebar-label">Priority</span>
                            <div className="pd-sidebar-value">
                                <MoreHorizontal size={14} /> {project.priority.replace('_', ' ')}
                            </div>
                        </div>
                        <div className="pd-sidebar-row">
                            <span className="pd-sidebar-label">Lead</span>
                            <div className="pd-sidebar-value" style={{ color: '#8a8f98' }}>
                                <User size={14} /> Add lead
                            </div>
                        </div>
                        <div className="pd-sidebar-row">
                            <span className="pd-sidebar-label">Members</span>
                            <div className="pd-sidebar-value" style={{ color: '#8a8f98' }}>
                                <Users size={14} /> Add members
                            </div>
                        </div>
                        <div className="pd-sidebar-row">
                            <span className="pd-sidebar-label">Start date</span>
                            <div className="pd-sidebar-value">
                                <Calendar size={14} /> {project.startDate ? project.startDate : <span style={{ color: '#333' }}>-</span>}
                            </div>
                        </div>
                        <div className="pd-sidebar-row">
                            <span className="pd-sidebar-label">Target date</span>
                            <div className="pd-sidebar-value">
                                <Activity size={14} /> {project.targetDate ? project.targetDate : <span style={{ color: '#333' }}>-</span>}
                            </div>
                        </div>
                        <div className="pd-sidebar-row">
                            <span className="pd-sidebar-label">Teams</span>
                            <div className="pd-sidebar-value">
                                <div style={{ width: 14, height: 14, background: '#a52b65', borderRadius: 2, fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>A</div>
                                Aekansh
                            </div>
                        </div>
                        <div className="pd-sidebar-row">
                            <span className="pd-sidebar-label">Labels</span>
                            <div className="pd-sidebar-value" style={{ color: '#8a8f98' }}>
                                <Tag size={14} /> Add label
                            </div>
                        </div>
                    </div>

                    <div className="pd-sidebar-group" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
                        <div className="pd-sidebar-header">
                            Milestones
                            <Plus size={14} style={{ cursor: 'pointer' }} />
                        </div>
                        <div style={{ fontSize: '12px', color: '#8a8f98', lineHeight: '1.5', marginBottom: 12 }}>
                            Add milestones to organize work within your project and break it into more granular stages. <span style={{ textDecoration: 'underline' }}>Learn more</span>
                        </div>
                        <div className="pd-milestone-add">
                            <Plus size={14} /> Milestone
                        </div>
                    </div>

                    <div className="pd-sidebar-group" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
                        <div className="pd-sidebar-header">
                            Activity
                            <span style={{ fontWeight: 400, cursor: 'pointer' }}>See all</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: '#8a8f98' }}>
                            <Box size={14} />
                            <span>Aekansh Khandelwal created the project • {new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;
