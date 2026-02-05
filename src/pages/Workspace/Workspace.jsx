import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config';
import './Workspace.css';
import './WorkspaceInbox.css';
import './WorkspaceIssues.css';
import './WorkspaceProjects.css';
import './WorkspaceViews.css';
import './WorkspaceTeams.css';
import './WorkspaceMembers.css';
import './CustomizeSidebarModal.css';
import './WorkspaceTeamIssues.css';
import './WorkspaceTeamProjects.css';
import './WorkspaceUserMenu.css';
import './CreateView.css';

import CreateProjectModal from './CreateProjectModal';
import CreateTeamModal from './CreateTeamModal';
import CreateView from './CreateView';
import SavedView from './SavedView';

import ProjectsView from './views/ProjectsView';
import TeamsView from './views/TeamsView';
import ViewsView from './views/ViewsView';
import InboxView from './views/InboxView';
import MyIssuesView from './views/MyIssuesView';
import MembersView from './views/MembersView';
import TeamIssuesView from './views/TeamIssuesView';
import TeamProjectsView from './views/TeamProjectsView';
import TeamViewsView from './views/TeamViewsView';
import IssueDetailsView from './views/IssueDetailsView';

import {
    Inbox,
    Disc,
    Layers,
    Layout,
    MoreHorizontal,
    Search,
    Plus,
    Box,
    User as UserIcon,
    Users as UsersIcon,
    PanelsTopLeft,
    PenSquare,
    ChevronDown,
    ChevronRight,
    Circle,
    FileText,
    GripVertical,
    X
} from 'lucide-react';


const Workspace = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('inbox');
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(true);
    const [isTeamsOpen, setIsTeamsOpen] = useState(true);
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [currentViewData, setCurrentViewData] = useState(null);
    const [projects, setProjects] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedSidebarTeam, setSelectedSidebarTeam] = useState(null);
    const [views, setViews] = useState([]);

    const [issues, setIssues] = useState([]);

    const fetchTeams = async () => {
        if (!user) return;
        const userId = user._id || user.googleId;
        if (!userId) return;
        console.log('Fetching teams for userId:', userId, 'User object:', user);

        try {
            const response = await fetch(`${API_BASE_URL}/api/teams/${userId}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched teams:', data);
                setTeams(data);
            } else {
                console.error('Failed to fetch teams');
            }
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };
    const fetchProjects = async () => {
        if (!user) return;
        const userId = user._id || user.googleId;
        if (!userId) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/projects/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            } else {
                console.error('Failed to fetch projects');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchViews = async () => {
        if (!user) return;
        const userId = user._id || user.googleId;
        if (!userId) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/views/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setViews(data);
            } else {
                console.error('Failed to fetch views');
            }
        } catch (error) {
            console.error('Error fetching views:', error);
        }
    };

    const fetchIssues = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/issues`);
            if (response.ok) {
                const data = await response.json();
                setIssues(data);
            } else {
                console.error('Failed to fetch issues');
            }
        } catch (error) {
            console.error('Error fetching issues:', error);
        }
    };

    React.useEffect(() => {
        fetchProjects();
        fetchViews();
        fetchTeams();
        fetchIssues();
    }, [user, activeView]);

    const renderMainContent = () => {
        if (activeView === 'create_view') {
            return (
                <CreateView
                    onSave={() => {
                        fetchViews();
                        setActiveView('views');
                    }}
                    onClose={() => setActiveView('views')}
                    activeView={activeView}
                    existingViewData={currentViewData}
                    isEditing={false}
                    user={user}
                    projects={projects}
                />
            );
        }
        if (activeView === 'saved_view') {
            return (
                <SavedView
                    viewData={currentViewData}
                    projects={projects}
                    user={user}
                    onClose={() => setActiveView('views')}
                    onEdit={() => {
                        setActiveView('create_view');
                    }}
                    onDelete={async (viewId) => {
                        if (window.confirm('Are you sure you want to delete this view?')) {
                            try {
                                const response = await fetch(`${API_BASE_URL}/api/views/${viewId}`, {
                                    method: 'DELETE',
                                });
                                if (response.ok) {
                                    fetchViews();
                                    setActiveView('views');
                                    setCurrentViewData(null);
                                } else {
                                    console.error('Failed to delete view');
                                }
                            } catch (error) {
                                console.error('Error deleting view:', error);
                            }
                        }
                    }}
                />
            );
        }
        if (activeView === 'create_team') {
            return (
                <main className="workspace-main" style={{ backgroundColor: '#0b0c0e', padding: 0 }}>
                    <CreateTeamModal
                        inline={true}
                        onClose={() => setActiveView('teams')}
                        onCreate={async (teamData) => {
                            try {
                                const userId = user._id || user.googleId;
                                const identifier = teamData.identifier || teamData.name.substring(0, 3).toUpperCase();

                                const response = await fetch(`${API_BASE_URL}/api/teams`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        ...teamData,
                                        identifier,
                                        owner: userId,
                                    }),
                                });

                                if (response.ok) {
                                    fetchTeams();
                                    setActiveView('teams');
                                } else {
                                    const errorData = await response.json();
                                    console.error('Failed to create team:', errorData);
                                }
                            } catch (error) {
                                console.error('Error creating team:', error);
                            }
                        }}
                    />
                </main>
            );
        }

        if (activeView === 'issue_details') {
            return (
                <IssueDetailsView
                    issue={selectedIssue}
                    onClose={() => setActiveView('issues')}
                    user={user}
                    project={projects.find(p => p._id === selectedIssue?.project) || { name: 'Unknown Project' }}
                />
            );
        }

        switch (activeView) {
            case 'inbox':
                return <InboxView />;
            case 'team_issues':
                return (
                    <TeamIssuesView
                        issues={issues}
                        projects={projects}
                        user={user}
                        teams={teams}
                        onIssueCreated={fetchIssues}
                        team={selectedSidebarTeam}
                        onIssueClick={(issue) => {
                            setSelectedIssue(issue);
                            setActiveView('issue_details');
                        }}
                    />
                );
            case 'team_projects':
                return (
                    <TeamProjectsView
                        setActiveView={setActiveView}
                        setIsCreateProjectModalOpen={setIsCreateProjectModalOpen}
                        projects={projects}
                        team={selectedSidebarTeam}
                        user={user}
                        setSelectedProject={setSelectedProject}
                    />
                );
            case 'team_views':
                return <TeamViewsView setActiveView={setActiveView} />;
            case 'projects':
                return (
                    <ProjectsView
                        projects={projects}
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        setIsCreateProjectModalOpen={setIsCreateProjectModalOpen}
                        setActiveView={setActiveView}
                        user={user}
                    />
                );
            case 'views':
                return (
                    <ViewsView
                        views={views}
                        activeView={activeView}
                        setActiveView={setActiveView}
                        setCurrentViewData={setCurrentViewData}
                        user={user}
                    />
                );
            case 'teams':
                return (
                    <TeamsView
                        teams={teams}
                        setActiveView={setActiveView}
                        user={user}
                    />
                );
            case 'members':
                return <MembersView setActiveView={setActiveView} />;
            default: // 'issues' or unknown
                return (
                    <MyIssuesView
                        issues={issues}
                        user={user}
                        onIssueClick={(issue) => {
                            setSelectedIssue(issue);
                            setActiveView('issue_details');
                        }}
                    />
                );
        }
    };

    return (
        <div className="workspace-container">
            {isUserMenuOpen && (
                <div className="user-menu-overlay" onClick={() => setIsUserMenuOpen(false)} />
            )}

            <aside className="workspace-sidebar">
                <div className="workspace-user-profile" style={{ position: 'relative' }}>
                    <div className="user-info" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                        <div className="user-avatar" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span>{user?.name?.split(' ')[0] || 'User'}</span>
                        <ChevronDown size={12} style={{ marginLeft: '4px', opacity: 0.6 }} />
                    </div>
                    <div className="sidebar-action-icons">
                        <Search size={16} />
                        <MoreHorizontal size={16} />
                    </div>

                    {isUserMenuOpen && (
                        <div className="user-menu-dropdown" onClick={(e) => e.stopPropagation()}>
                            <div className="user-menu-item">
                                <span>Settings</span>
                                <span className="menu-shortcut">G then S</span>
                            </div>
                            <div className="user-menu-item">
                                <span>Invite and manage members</span>
                            </div>
                            <div className="user-menu-separator"></div>
                            <div className="user-menu-item">
                                <span>Download desktop app</span>
                            </div>
                            <div className="user-menu-separator"></div>
                            <div className="user-menu-item">
                                <span>Switch workspace</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span className="menu-shortcut">O then W</span>
                                    <ChevronRight size={12} className="menu-arrow" />
                                </div>
                            </div>
                            <div className="user-menu-item" onClick={() => navigate('/')}>
                                <span>Log out</span>
                                <span className="menu-shortcut">Alt ⇧ Q</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className={`sidebar-item ${activeView === 'inbox' ? 'active' : ''}`} onClick={() => setActiveView('inbox')}>
                    <Inbox size={16} className="sidebar-icon" />
                    Inbox
                </div>
                <div className={`sidebar-item ${activeView === 'issues' ? 'active' : ''}`} onClick={() => setActiveView('issues')}>
                    <Disc size={16} className="sidebar-icon" />
                    My issues
                </div>
                {issues && user && issues.filter(issue =>
                    issue.assignee === user.name ||
                    issue.assignee === user._id ||
                    issue.assignee === user.email
                ).map(issue => (
                    <div
                        key={issue._id}
                        className={`sidebar-item ${selectedIssue?._id === issue._id && activeView === 'issue_details' ? 'active' : ''}`}
                        style={{ paddingLeft: '32px', fontSize: '13px', height: '28px' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIssue(issue);
                            setActiveView('issue_details');
                        }}
                    >
                        <span style={{ marginRight: '8px', opacity: 0.7 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffcc00', display: 'inline-block' }}></div></span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {issue.identifier} {issue.title}
                        </span>
                    </div>
                ))}

                <div className="sidebar-section" style={{ marginTop: '24px' }}>
                    <div
                        className="sidebar-section-title"
                        onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
                        style={{ cursor: 'pointer' }}
                    >
                        Workspace
                        <span style={{
                            fontSize: '10px',
                            transform: isWorkspaceOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                            transition: 'transform 0.1s',
                            display: 'inline-block'
                        }}>▼</span>
                    </div>

                    {isWorkspaceOpen && (
                        <>
                            <div className={`sidebar-item ${activeView === 'projects' ? 'active' : ''}`} onClick={() => setActiveView('projects')}>
                                <Layers size={16} className="sidebar-icon" />
                                Projects
                            </div>
                            <div className={`sidebar-item ${activeView === 'views' ? 'active' : ''}`} onClick={() => setActiveView('views')}>
                                <PanelsTopLeft size={16} className="sidebar-icon" />
                                Views
                            </div>

                            {activeView === 'teams' && (
                                <div className="sidebar-item active" onClick={() => setActiveView('teams')}>
                                    <UserIcon size={16} className="sidebar-icon" />
                                    Teams
                                </div>
                            )}
                            {activeView === 'members' && (
                                <div className="sidebar-item active" onClick={() => setActiveView('members')}>
                                    <UsersIcon size={16} className="sidebar-icon" />
                                    Members
                                </div>
                            )}

                            <div className="sidebar-dropdown-container">
                                <div className={`sidebar-item ${showMoreMenu ? 'active' : ''}`} onClick={() => setShowMoreMenu(!showMoreMenu)}>
                                    <MoreHorizontal size={16} className="sidebar-icon" />
                                    More
                                </div>

                                {showMoreMenu && (
                                    <div className="sidebar-dropdown-menu">
                                        <div className="dropdown-item" onClick={() => { setActiveView('teams'); setShowMoreMenu(false); }}>
                                            <UserIcon size={16} className="dropdown-icon" />
                                            Teams
                                        </div>
                                        <div className="dropdown-item" onClick={() => { setActiveView('members'); setShowMoreMenu(false); }}>
                                            <UsersIcon size={16} className="dropdown-icon" />
                                            Members
                                        </div>
                                        <div className="dropdown-separator"></div>
                                        <div className="dropdown-item" onClick={() => { setIsCustomizeModalOpen(true); setShowMoreMenu(false); }}>
                                            <PenSquare size={16} className="dropdown-icon" />
                                            Customize sidebar
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <div className="sidebar-section">
                    <div
                        className="sidebar-section-title"
                        onClick={() => setIsTeamsOpen(!isTeamsOpen)}
                        style={{ cursor: 'pointer' }}
                    >
                        Your teams
                        <span style={{
                            fontSize: '10px',
                            transform: isTeamsOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                            transition: 'transform 0.1s',
                            display: 'inline-block'
                        }}>▼</span>
                    </div>

                    {isTeamsOpen && (
                        <>
                            {teams.map(team => (
                                <div key={team._id}>
                                    <div className="sidebar-item">
                                        <div style={{ width: 16, height: 16, background: '#a52b65', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: 'white' }}>
                                            {team.name.charAt(0).toUpperCase()}
                                        </div>
                                        {team.name}
                                    </div>
                                    <div className={`sidebar-item ${activeView === 'team_issues' ? 'active' : ''}`} style={{ paddingLeft: '32px' }} onClick={() => { setActiveView('team_issues'); setSelectedSidebarTeam(team); }}>
                                        <span style={{ marginRight: '8px' }}><Circle size={14} /></span> Issues
                                    </div>
                                    <div className={`sidebar-item ${activeView === 'team_projects' ? 'active' : ''}`} style={{ paddingLeft: '32px' }} onClick={() => { setActiveView('team_projects'); setSelectedSidebarTeam(team); }}>
                                        <span style={{ marginRight: '8px' }}><Layers size={14} /></span> Projects
                                    </div>
                                </div>
                            ))}
                            {teams.length === 0 && (
                                <div className="sidebar-item" style={{ color: '#8a8f98', fontStyle: 'italic' }}>
                                    No teams yet
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="sidebar-bottom">
                    <div className="sidebar-item">
                        <Plus size={16} className="sidebar-icon" />
                        Invite people
                    </div>
                </div>
            </aside>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {isCreateTeamModalOpen && (
                    <CreateTeamModal
                        onClose={() => setIsCreateTeamModalOpen(false)}
                        onCreate={async (teamData) => {
                            try {
                                const userId = user._id || user.googleId;
                                const identifier = teamData.identifier || teamData.name.substring(0, 3).toUpperCase();

                                const response = await fetch(`${API_BASE_URL}/api/teams`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        ...teamData,
                                        identifier,
                                        owner: userId,
                                    }),
                                });

                                if (response.ok) {
                                    fetchTeams();
                                    setIsCreateTeamModalOpen(false);
                                } else {
                                    console.error('Failed to create team');
                                }
                            } catch (error) {
                                console.error('Error creating team:', error);
                            }
                        }}
                    />
                )}

                {renderMainContent()}

            </div>

            {isCreateProjectModalOpen && (
                <CreateProjectModal
                    onClose={() => setIsCreateProjectModalOpen(false)}
                    onProjectCreated={() => {
                        fetchProjects();
                    }}
                    teams={teams}
                />
            )}

            {isCustomizeModalOpen && (
                <div className="modal-overlay" onClick={() => setIsCustomizeModalOpen(false)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title">Customize sidebar</div>
                            <button className="modal-close-btn" onClick={() => setIsCustomizeModalOpen(false)}>
                                <X size={16} />
                            </button>
                        </div>
                        <div className="modal-content">

                            <div className="badge-style-row">
                                <span className="row-label">Default badge style</span>
                                <button className="setting-dropdown">
                                    <div style={{ background: '#3a3d45', color: '#e3e4e8', fontSize: '11px', padding: '1px 6px', borderRadius: '4px', marginRight: '6px', fontWeight: 'bold' }}>1</div>
                                    Count <ChevronDown size={14} />
                                </button>
                            </div>

                            <div className="modal-section">
                                <div className="modal-section-label">Personal</div>
                                <div className="settings-box">
                                    <div className="settings-row">
                                        <div className="row-left">
                                            <GripVertical size={14} className="row-drag-handle" />
                                            <Inbox size={16} className="row-icon" />
                                            <span className="row-label">Inbox</span>
                                        </div>
                                        <button className="setting-dropdown">
                                            Always show <ChevronDown size={14} />
                                        </button>
                                    </div>
                                    <div className="settings-row">
                                        <div className="row-left">
                                            <GripVertical size={14} className="row-drag-handle" />
                                            <Disc size={16} className="row-icon" />
                                            <span className="row-label">My Issues</span>
                                        </div>
                                        <button className="setting-dropdown">
                                            Always show <ChevronDown size={14} />
                                        </button>
                                    </div>
                                    <div className="settings-row">
                                        <div className="row-left">
                                            <GripVertical size={14} className="row-drag-handle" />
                                            <FileText size={16} className="row-icon" />
                                            <span className="row-label">Drafts</span>
                                        </div>
                                        <button className="setting-dropdown">
                                            When badged <ChevronDown size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-section">
                                <div className="modal-section-label">Workspace</div>
                                <div className="settings-box">
                                    <div className="settings-row">
                                        <div className="row-left">
                                            <GripVertical size={14} className="row-drag-handle" />
                                            <Layers size={16} className="row-icon" />
                                            <span className="row-label">Projects</span>
                                        </div>
                                        <button className="setting-dropdown">
                                            Always show <ChevronDown size={14} />
                                        </button>
                                    </div>
                                    <div className="settings-row">
                                        <div className="row-left">
                                            <GripVertical size={14} className="row-drag-handle" />
                                            <Layout size={16} className="row-icon" />
                                            <span className="row-label">Views</span>
                                        </div>
                                        <button className="setting-dropdown">
                                            Always show <ChevronDown size={14} />
                                        </button>
                                    </div>
                                    <div className="settings-row">
                                        <div className="row-left">
                                            <GripVertical size={14} className="row-drag-handle" />
                                            <UserIcon size={16} className="row-icon" />
                                            <span className="row-label">Teams</span>
                                        </div>
                                        <button className="setting-dropdown">
                                            Hide in more menu <ChevronDown size={14} />
                                        </button>
                                    </div>
                                    <div className="settings-row">
                                        <div className="row-left">
                                            <GripVertical size={14} className="row-drag-handle" />
                                            <UsersIcon size={16} className="row-icon" />
                                            <span className="row-label">Members</span>
                                        </div>
                                        <button className="setting-dropdown">
                                            Hide in more menu <ChevronDown size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Workspace;
