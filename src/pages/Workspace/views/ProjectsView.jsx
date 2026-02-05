import React from 'react';
import {
    Plus,
    Box,
    Layers,
    Layout,
    Link as LinkIcon,
    ListFilter,
    CircleDashed,
    MoreHorizontal
} from 'lucide-react';
import ProjectDetailsModal from '../ProjectDetailsModal';

const ProjectsView = ({
    projects,
    selectedProject,
    setSelectedProject,
    setIsCreateProjectModalOpen,
    setActiveView,
    user
}) => {
    return (
        <main className="workspace-main" style={{ backgroundColor: '#0b0c0e', padding: 0 }}>
            {selectedProject ? (
                <ProjectDetailsModal
                    project={selectedProject}
                    user={user}
                    onClose={() => setSelectedProject(null)}
                />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="projects-header">
                        <div className="projects-breadcrumb-area">
                            <span className="projects-title">Projects</span>
                            <div className="projects-tabs">
                                <div className="projects-tab active">
                                    <Box size={14} /> All projects
                                </div>
                            </div>
                            <div className="new-view-tab" onClick={() => setActiveView('create_view')}>
                                <Layers size={14} /> New view
                            </div>
                        </div>

                        <div className="projects-actions-right">
                            <LinkIcon size={16} className="action-icon" />
                            <button className="add-project-btn" onClick={() => setIsCreateProjectModalOpen(true)}>
                                <Plus size={16} /> Add project
                            </button>
                            <Layout size={16} className="action-icon" />
                        </div>
                    </div>

                    <div className="projects-toolbar">
                        <div className="toolbar-filter">
                            <ListFilter size={16} /> Filter
                        </div>
                    </div>

                    {projects.length > 0 ? (
                        <div className="projects-list-container" style={{ padding: '0 20px' }}>
                            <div className="projects-table-header" style={{ display: 'flex', color: '#8a8f98', fontSize: '13px', borderBottom: '1px solid #333', padding: '10px 0', marginBottom: '10px' }}>
                                <div style={{ flex: 6 }}>Name</div>
                                <div style={{ flex: 1 }}>Status</div>
                                <div style={{ flex: 1 }}>Priority</div>
                                <div style={{ flex: 1 }}>Key</div>
                            </div>
                            {projects.map((project) => (
                                <div
                                    key={project._id}
                                    className="project-row"
                                    onClick={() => setSelectedProject(project)}
                                    style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#e3e4e8', fontSize: '14px', cursor: 'pointer' }}
                                >
                                    <div style={{ flex: 6, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: 18, height: 18, borderRadius: '4px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Box size={12} color="#8a8f98" />
                                        </div>
                                        <span style={{ fontWeight: 500 }}>{project.name}</span>
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <CircleDashed size={14} color="#8a8f98" />
                                        <span style={{ color: '#8a8f98', fontSize: '13px' }}>{project.status.replace('_', ' ')}</span>
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <MoreHorizontal size={14} color="#8a8f98" />
                                        <span style={{ color: '#8a8f98', fontSize: '13px' }}>{project.priority.replace('_', ' ')}</span>
                                    </div>
                                    <div style={{ flex: 1, color: '#8a8f98', fontSize: '13px' }}>
                                        {project.key || 'PRJ-1'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="projects-empty-state">
                            <div className="projects-empty-icon">
                                {/* 3D Cubes Illustration Approximation */}
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M12 3l9 4.5v9l-9 4.5L3 16.5v-9L12 3z" />
                                    <path d="M12 12l9-4.5" />
                                    <path d="M12 12v9" />
                                    <path d="M12 12L3 7.5" />
                                    <path d="M12 8l4.5 2.25" strokeOpacity="0.5" />
                                    <path d="M7.5 5.25L12 7.5" strokeOpacity="0.5" />
                                </svg>
                            </div>
                            <div className="projects-empty-title">Projects</div>
                            <div className="projects-empty-description">
                                Projects are larger units of work with a clear outcome, such as a new feature you want to ship. They can be shared across multiple teams and are comprised of issues and optional documents.
                            </div>
                            <div className="projects-empty-actions">
                                <button className="create-project-primary-btn" onClick={() => setIsCreateProjectModalOpen(true)}>
                                    Create new project <span className="shortcut-hint">N</span> then <span className="shortcut-hint">P</span>
                                </button>
                                <button className="documentation-btn">
                                    Documentation
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
};

export default ProjectsView;
