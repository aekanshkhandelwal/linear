import React, { useState } from 'react';
import {
    Layers,
    CircleDot,
    CircleDashed,
    Box,
    Bell,
    Layout,
    ListFilter,
    SlidersHorizontal,
    Circle,
    Plus,
    MoreHorizontal,
    User as UserIcon
} from 'lucide-react';
import CreateIssueModal from '../CreateIssueModal';

const TeamIssuesView = ({ issues, projects, user, teams, onIssueCreated, team, onIssueClick }) => {

    const filteredIssues = React.useMemo(() => {
        if (!team) return []; 
        return issues.filter(issue => issue.team === team._id || (issue.project && issue.project.team === team._id));
    }, [issues, team]);

    const showEmptyState = filteredIssues.length === 0;
    const [isCreateIssueModalOpen, setIsCreateIssueModalOpen] = useState(false);

    return (
        <main className="workspace-main" style={{ backgroundColor: '#0b0c0e' }}>
            {isCreateIssueModalOpen && (
                <CreateIssueModal
                    onClose={() => setIsCreateIssueModalOpen(false)}
                    onCreate={async (data) => {
                        console.log("Create issue", data);
                        try {
                            const response = await fetch('http://localhost:5000/api/issues', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    ...data,
                                    createdBy: user?._id || user?.googleId,
                                    
                                }),
                            });

                            if (response.ok) {
                                if (onIssueCreated) onIssueCreated();
                                setIsCreateIssueModalOpen(false);
                            } else {
                                console.error('Failed to create issue');
                            }
                        } catch (error) {
                            console.error('Error creating issue:', error);
                        }
                    }}
                    projects={projects}
                    user={user}
                    teams={teams}
                />
            )}
            <div className="team-issues-header">
                <div className="team-issues-tabs">
                    <div className="ti-tab">
                        <Layers size={14} /> All issues
                    </div>
                    <div className="ti-tab active">
                        <CircleDot size={14} /> Active
                    </div>
                    <div className="ti-tab">
                        <CircleDashed size={14} /> Backlog
                    </div>
                    <div className="ti-tab">
                        <Box size={14} />
                    </div>
                </div>

                <div className="ti-actions-right">
                    <Bell size={16} />
                    <Layout size={16} />
                </div>
            </div>

            <div className="team-issues-toolbar">
                <div className="ti-filter">
                    <ListFilter size={16} /> Filter
                </div>
                <div className="ti-display-btn">
                    <SlidersHorizontal size={14} /> Display
                </div>
            </div>

            <div className="ti-content">
                {showEmptyState ? (
                    <div className="ti-empty-state">
                        <div className="ti-illustration">
                            {/* Four circles to mimic the icon in the image */}
                            <CircleDashed size={32} className="ti-illustration-icon" />
                            <CircleDashed size={32} className="ti-illustration-icon" />
                            <CircleDashed size={32} className="ti-illustration-icon" />
                            <CircleDashed size={32} className="ti-illustration-icon" />
                        </div>
                        <div className="ti-empty-title">Active issues</div>
                        <div className="ti-empty-description">
                            Active issues represent work that is currently in flight or should be worked on next. There are currently no active issues in this team. Once an Issue moves to the Todo or In Progress state, it will show up here.
                        </div>
                        <div className="ti-actions-center">
                            <button className="ti-btn-primary" onClick={() => setIsCreateIssueModalOpen(true)}>
                                Create new issue <span className="kbd-shortcut">C</span>
                            </button>
                            <button className="ti-btn-secondary">
                                Documentation
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="ti-group-header">
                            <span className="ti-group-toggle">▼</span>
                            <Circle size={14} className="ti-group-icon" />
                            <span>Todo</span>
                            <span className="ti-group-count">{filteredIssues.length}</span>
                            <Plus
                                size={14}
                                className="ti-group-add"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCreateIssueModalOpen(true);
                                }}
                            />
                        </div>

                        <div className="ti-list">
                            {filteredIssues.map(issue => (
                                <div
                                    className="ti-row"
                                    key={issue._id}
                                    onClick={() => onIssueClick && onIssueClick(issue)}
                                >
                                    <div className="ti-cell-left">
                                        <MoreHorizontal size={14} className="ti-priority-icon" />
                                        <span className="ti-issue-id">{issue.identifier}</span>
                                        <Circle size={14} className="ti-status-icon" />
                                        <span className="ti-title">{issue.title}</span>
                                    </div>
                                    <div className="ti-cell-right">
                                        <div className="member-avatar" style={{ width: 16, height: 16, fontSize: '9px' }}>
                                            <UserIcon size={10} />
                                        </div>
                                        <span className="ti-date">{new Date(issue.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default TeamIssuesView;
