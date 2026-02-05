import React, { useMemo, useState } from 'react';
import {
    Layout,
    ListFilter,
    MoreHorizontal,
    Circle,
    User as UserIcon,
    Plus,
    Box,
    Check
} from 'lucide-react';
import CreateIssueModal from '../CreateIssueModal'; 

const MyIssuesView = ({ issues = [], user, onIssueClick }) => {
    const [activeTab, setActiveTab] = useState('Assigned');

    const myIssues = useMemo(() => {
        if (!user || !issues) return [];

        console.log('MyIssuesView Debug:', {
            user,
            totalIssues: issues.length,
            activeTab
        });

        return issues.filter(issue => {
            if (activeTab === 'Assigned') {
                return (
                    issue.assignee === user.name ||
                    issue.assignee === user._id ||
                    issue.assignee === user.email
                );
            }
            if (activeTab === 'Created') {
                return (
                    issue.createdBy === user._id ||
                    issue.createdBy === user.googleId ||
                    (user.email && issue.createdBy === user.email)
                );
            }
            return false;
        });
    }, [issues, user, activeTab]);

    return (
        <main className="workspace-main" style={{ backgroundColor: '#0b0c0e' }}>
            <div className="my-issues-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="issues-breadcrumb">My issues</div>
                    <div className="issues-tabs">
                        <div
                            className={`issues-tab ${activeTab === 'Assigned' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Assigned')}
                        >
                            Assigned
                        </div>
                        <div
                            className={`issues-tab ${activeTab === 'Created' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Created')}
                        >
                            Created
                        </div>
                        <div className="issues-tab">Subscribed</div>
                        <div className="issues-tab">Activity</div>
                    </div>
                </div>
                <div className="header-right">
                    <button className="display-btn">
                        <Layout size={14} /> Display
                    </button>
                </div>
            </div>

            <div className="issues-toolbar">
                <div className="toolbar-left">
                    <div className="filter-btn">
                        <ListFilter size={16} /> Filter
                    </div>
                </div>
            </div>

            {myIssues.length > 0 ? (
                <div className="ti-content" style={{ padding: '0 20px' }}>
                    <div className="ti-group-header">
                        <span className="ti-group-toggle">▼</span>
                        <Circle size={14} className="ti-group-icon" />
                        <span>{activeTab}</span>
                        <span className="ti-group-count">{myIssues.length}</span>
                        <Plus size={14} className="ti-group-add" />
                    </div>

                    <div className="ti-list">
                        {myIssues.map(issue => (
                            <div
                                className="ti-row"
                                key={issue._id}
                                style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                                onClick={() => onIssueClick && onIssueClick(issue)}
                            >
                                <div className="ti-cell-left" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <MoreHorizontal size={14} className="ti-priority-icon" style={{ opacity: 0.5 }} />
                                    <span className="ti-issue-id" style={{ color: '#8a8f98', fontFamily: 'monospace' }}>{issue.identifier}</span>
                                    <Circle size={14} className="ti-status-icon" style={{ color: '#e3e4e8' }} />
                                    <span className="ti-title" style={{ fontWeight: 500 }}>{issue.title}</span>
                                </div>
                                <div className="ti-cell-right" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#8a8f98' }}>
                                    <div className="member-avatar" style={{ width: 16, height: 16, fontSize: '9px', background: '#3a3d45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={10} />}
                                    </div>
                                    <span className="ti-date" style={{ fontSize: '13px' }}>{new Date(issue.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="issues-empty-state">
                    <div className="empty-state-illustration">
                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="20" stroke="#4a4d55" strokeWidth="2" strokeDasharray="4 4" />
                            <path d="M40 80 C 40 80, 60 90, 80 80" stroke="#4a4d55" strokeWidth="2" strokeLinecap="round" />
                            <path d="M40 40 C 40 40, 60 30, 80 40" stroke="#4a4d55" strokeWidth="2" strokeLinecap="round" />
                            <path d="M30 60 C 30 60, 40 60, 40 60" stroke="#4a4d55" strokeWidth="2" strokeLinecap="round" />
                            <path d="M80 60 C 80 60, 90 60, 90 60" stroke="#4a4d55" strokeWidth="2" strokeLinecap="round" />
                            <ellipse cx="60" cy="30" rx="15" ry="8" stroke="#4a4d55" strokeWidth="2" />
                            <ellipse cx="60" cy="90" rx="15" ry="8" stroke="#4a4d55" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="empty-state-title">No issues {activeTab.toLowerCase()} by you</div>
                    <button className="create-issue-btn">Create new issue</button>
                </div>
            )}
        </main>
    );
};

export default MyIssuesView;
