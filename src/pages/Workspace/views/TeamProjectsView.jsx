import React, { useMemo } from 'react';
import {
    Box,
    Layers,
    Link as LinkIcon,
    Plus,
    Layout,
    ListFilter,
    CircleDashed,
    MoreHorizontal
} from 'lucide-react';
import ProjectDetailsModal from '../ProjectDetailsModal';

const TeamProjectsView = ({
    setActiveView,
    setIsCreateProjectModalOpen,
    projects = [],
    team,
    user,
    setSelectedProject,
    selectedProject 
}) => {

    const teamProjects = useMemo(() => {
        if (!team) return [];
        return projects.filter(p => p.team === team._id);
    }, [projects, team]);

    return (
        <main className="workspace-main" style={{ backgroundColor: '#0b0c0e', padding: 0 }}>
            <div className="team-projects-header">
                <div className="tp-breadcrumb-area">
                    <span className="tp-title">{team ? `${team.name} Projects` : 'Team Projects'}</span>
                    <div className="tp-tabs">
                        <div className="tp-tab active">
                            <Box size={14} /> All projects
                        </div>
                    </div>
                </div>
                <div className="tp-actions-right">
                    <button className="tp-icon-btn"><LinkIcon size={16} /></button>
                    <button className="tp-add-btn" onClick={() => setIsCreateProjectModalOpen(true)}>
                        <Plus size={14} /> Add project
                    </button>
                    <button className="tp-icon-btn"><Layout size={16} /></button>
                </div>
            </div>

            <div className="team-projects-toolbar">
                <div className="tp-filter">
                    <ListFilter size={16} /> Filter
                </div>
            </div>

            {teamProjects.length > 0 ? (
                <div className="projects-list-container" style={{ padding: '0 20px' }}>
                    <div className="projects-table-header" style={{ display: 'flex', color: '#8a8f98', fontSize: '13px', borderBottom: '1px solid #333', padding: '10px 0', marginBottom: '10px' }}>
                        <div style={{ flex: 6 }}>Name</div>
                        <div style={{ flex: 1 }}>Status</div>
                        <div style={{ flex: 1 }}>Priority</div>
                        <div style={{ flex: 1 }}>Key</div>
                    </div>
                    {teamProjects.map((project) => (
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
                                <span style={{ color: '#8a8f98', fontSize: '13px' }}>{project.status && project.status.replace('_', ' ')}</span>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <MoreHorizontal size={14} color="#8a8f98" />
                                <span style={{ color: '#8a8f98', fontSize: '13px' }}>{project.priority && project.priority.replace('_', ' ')}</span>
                            </div>
                            <div style={{ flex: 1, color: '#8a8f98', fontSize: '13px' }}>
                                {project.key || `${team ? team.identifier : 'PRJ'}-1`}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="tp-empty-state">
                    <div className="tp-empty-icon">
                        {/* Cube Hexagon Icon Approximation */}
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M12 3l9 4.5v9l-9 4.5L3 16.5v-9L12 3z" />
                            <path d="M12 12l9-4.5" />
                            <path d="M12 12v9" />
                            <path d="M12 12L3 7.5" />
                            <path d="M12 8l4.5 2.25" strokeOpacity="0.5" />
                            <path d="M7.5 5.25L12 7.5" strokeOpacity="0.5" />
                        </svg>
                    </div>
                    <div className="tp-empty-title">No projects in {team ? team.name : 'this team'}</div>
                    <div className="tp-empty-description">
                        Projects are larger units of work with a clear outcome. Create a project to start tracking your team's work.
                    </div>
                    <div className="tp-empty-actions">
                        <button className="tp-create-btn" onClick={() => setIsCreateProjectModalOpen(true)}>
                            Create new project <span className="shortcut-box">N</span> then <span className="shortcut-box">P</span>
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default TeamProjectsView;
