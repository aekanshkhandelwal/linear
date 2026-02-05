import React, { useState } from 'react';
import {
    CheckCircle2,
    AlertCircle,
    User as UserIcon,
    Tag,
    Box,
    Link,
    Paperclip,
    Copy,
    MoreHorizontal,
    CornerUpLeft,
    Smile,
    Send,
    CircleDashed,
    ArrowUp,
    X,
    Signal,
    CheckCircle
} from 'lucide-react';
import './IssueDetailsView.css';

const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
        case 'in progress': return <CircleDashed size={14} color="#f2c94c" />;
        case 'done': return <CheckCircle size={14} color="#5e6ad2" />;
        case 'canceled': return <X size={14} color="#8a8f98" />;
        default: return <Circle size={14} color="#8a8f98" />; // Todo
    }
};

const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
        case 'urgent': return <AlertCircle size={14} color="#eb5757" />;
        case 'high': return <Signal size={14} color="#eb5757" />;
        case 'medium': return <Signal size={14} color="#f2994a" />;
        case 'low': return <Signal size={14} color="#94989e" />;
        default: return <MoreHorizontal size={14} color="#8a8f98" />;
    }
};

const IssueDetailsView = ({ issue, onClose, user, project }) => {
    if (!issue) return <div>No issue selected</div>;

    const [comment, setComment] = useState('');

    return (
        <div className="issue-details-container">
            {/* Header / Breadcrumbs */}
            <div className="issue-details-header">
                <div className="id-breadcrumbs">
                    <span className="id-team-name">
                        <div className="id-team-icon">{project?.team?.name?.charAt(0) || 'T'}</div>
                        {project?.team?.name || 'Team'}
                    </span>
                    <span className="id-separator">›</span>
                    <span className="id-issue-id">{issue.identifier}</span>
                    <span className="id-star">☆</span>
                    <span className="id-more">···</span>
                </div>
                <div className="id-header-right">
                    {/* Add close button or other header actions if needed */}
                    <button className="id-close-btn" onClick={onClose}><X size={16} /></button>
                </div>
            </div>

            <div className="issue-details-body">
                {/* Main Content (Left) */}
                <div className="id-main-content">
                    <h1 className="id-title">{issue.title}</h1>
                    <div className="id-description">
                        {issue.description || 'No description provided.'}
                    </div>

                    <div className="id-sub-issues">
                        <div className="id-sub-header">
                            <CircleDashed size={14} />
                            <span>Add sub-issues</span>
                        </div>
                    </div>

                    <div className="id-activity-section">
                        <div className="id-activity-header">
                            <h3>Activity</h3>
                            <div className="id-activity-actions">
                                <span>Unsubscribe</span>
                                <div className="id-avatar-small">{user?.name?.charAt(0) || 'U'}</div>
                            </div>
                        </div>

                        <div className="id-activity-feed">
                            <div className="id-feed-item">
                                <div className="id-avatar-xs">{issue.createdBy?.name?.charAt(0) || 'U'}</div>
                                <div className="id-feed-text">
                                    <span className="id-actor">{issue.createdBy?.name || 'User'}</span> created the issue · <span className="id-time">{new Date(issue.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="id-comment-box">
                            <textarea
                                placeholder="Leave a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div className="id-comment-toolbar">
                                <div className="id-toolbar-left">
                                    <Paperclip size={14} />
                                </div>
                                <div className="id-toolbar-right">
                                    <ArrowUp size={14} className="id-send-btn" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="id-sidebar">
                    <div className="id-sidebar-header">
                        <span className="id-sidebar-title">Properties</span>
                        <div className="id-sidebar-actions">
                            <Link size={14} className="id-icon" />
                            <Copy size={14} className="id-icon" />
                            <MoreHorizontal size={14} className="id-icon" />
                        </div>
                    </div>

                    <div className="id-sidebar-section">
                        <div className="id-sidebar-label">Status</div>
                        <div className="id-sidebar-value">
                            <div className={`id-status-indicator ${issue.status?.toLowerCase().replace(' ', '-') || 'todo'}`}>
                                {getStatusIcon(issue.status)}
                            </div>
                            <span>{issue.status || 'Todo'}</span>
                        </div>
                    </div>

                    <div className="id-sidebar-section">
                        <div className="id-sidebar-label">Priority</div>
                        <div className="id-sidebar-value">
                            <div className={`id-priority-indicator ${issue.priority?.toLowerCase() || 'no-priority'}`}>
                                {getPriorityIcon(issue.priority)}
                            </div>
                            <span>{issue.priority || 'No Priority'}</span>
                        </div>
                    </div>

                    <div className="id-sidebar-section">
                        <div className="id-sidebar-label">Assignee</div>
                        <div className="id-sidebar-value">
                            <div className="id-avatar-xs" style={{ marginRight: '8px', background: '#5e6ad2' }}>
                                {issue.assignee ? issue.assignee.charAt(0).toUpperCase() : <UserIcon size={10} />}
                            </div>
                            <span>{issue.assignee || 'Unassigned'}</span>
                        </div>
                    </div>

                    <div className="id-sidebar-section">
                        <div className="id-sidebar-label">Labels</div>
                        <div className="id-sidebar-action">
                            <Tag size={14} />
                            <span>Add label</span>
                        </div>
                    </div>

                    <div className="id-sidebar-section">
                        <div className="id-sidebar-label">Project</div>
                        <div className="id-sidebar-value">
                            <Box size={14} style={{ marginRight: '8px' }} />
                            <span>{project?.name || 'No Project'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetailsView;
