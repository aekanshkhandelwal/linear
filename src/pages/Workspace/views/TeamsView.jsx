import React from 'react';
import {
    Plus,
    Layout,
    MoreHorizontal,
    ListFilter,
    Check,
    Box
} from 'lucide-react';

const TeamsView = ({ teams, setActiveView, user }) => {
    return (
        <main className="workspace-main" style={{ backgroundColor: '#0b0c0e' }}>
            <div className="teams-header">
                <div className="teams-title-area">
                    <span className="teams-title">Teams</span>
                    <span className="teams-count">{teams.length}</span>
                    <MoreHorizontal size={14} color="#8a8f98" />
                </div>
                <div className="teams-actions-right">
                    <button className="new-team-btn" onClick={() => setActiveView('create_team')}>
                        <Plus size={14} /> New team
                    </button>
                    <button className="display-btn">
                        <Layout size={14} /> Display
                    </button>
                </div>
            </div>

            <div className="teams-toolbar">
                <div className="toolbar-filter">
                    <ListFilter size={16} /> Filter
                </div>
            </div>

            <div className="teams-table-header">
                <div className="col-name">Name</div>
                <div className="col-membership">Membership</div>
                <div className="col-members">Members</div>
                <div className="col-projects">Active projects</div>
            </div>

            <div className="teams-list">
                {teams.map(team => (
                    <div className="team-row" key={team._id}>
                        <div className="col-name" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="team-icon-box" style={{ backgroundColor: '#a52b65', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', color: 'white', marginRight: '10px' }}>
                                {team.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="team-name">{team.name}</span>
                            <span className="team-code" style={{ marginLeft: '8px', color: '#8a8f98', fontSize: '12px' }}>{team.identifier}</span>
                        </div>
                        <div className="col-membership">
                            <div className="joined-badge">
                                <Check size={10} /> Joined
                            </div>
                        </div>
                        <div className="col-members">
                            <div className="member-avatar-circles">
                                <div className="mini-avatar" style={{ backgroundColor: '#5e6ad2' }}>
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>
                        </div>
                        <div className="col-projects">
                            <div className="project-count">
                                <Box size={14} /> 0
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default TeamsView;
