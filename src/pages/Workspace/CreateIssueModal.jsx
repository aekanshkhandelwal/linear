import React, { useState, useEffect, useRef } from 'react';
import { X, Maximize2, Minimize2, Circle, MoreHorizontal, User, Paperclip, ChevronDown, Check, CircleDashed, Box } from 'lucide-react';
import './CreateIssueModal.css';

const CreateIssueModal = ({ onClose, onCreate, projects = [], user, teams = [] }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createMore, setCreateMore] = useState(false);

    // State for interactive dropdowns
    const [activeDropdown, setActiveDropdown] = useState(null);
    const modalRef = useRef(null);

    // Initial state matching design
    const [status, setStatus] = useState('Todo');
    const [priority, setPriority] = useState('Priority'); 
    const [assignee, setAssignee] = useState('Assignee');
    const [labels, setLabels] = useState('Labels');
    const [project, setProject] = useState(null);

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeDropdown && !event.target.closest('.cim-dropdown-container')) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);

    const statusOptions = [
        { label: 'Backlog', icon: <CircleDashed size={14} className="icon-backlog" />, count: 1 },
        { label: 'Todo', icon: <Circle size={14} />, count: 2 },
        { label: 'In Progress', icon: <div className="icon-progress"><div className="half-circle"></div></div>, count: 3 },
        { label: 'Done', icon: <div className="icon-done"><Check size={10} /></div>, count: 4 },
        { label: 'Canceled', icon: <X size={14} className="icon-canceled" />, count: 5 },
        { label: 'Duplicate', icon: <X size={14} className="icon-canceled" />, count: 6 },
    ];

    const priorityOptions = [
        { label: 'No priority', icon: <MoreHorizontal size={14} />, count: 0 },
        { label: 'Urgent', icon: <div className="icon-priority urgent">!</div>, count: 1 },
        { label: 'High', icon: <div className="icon-priority high">III</div>, count: 2 },
        { label: 'Medium', icon: <div className="icon-priority medium">II</div>, count: 3 },
        { label: 'Low', icon: <div className="icon-priority low">I</div>, count: 4 },
    ];

    const getStatusIcon = (name) => {
        const opt = statusOptions.find(o => o.label === name);
        return opt ? opt.icon : <Circle size={14} />;
    };

    const getPriorityIcon = (name) => {
        const opt = priorityOptions.find(o => o.label === name);
        // Special case for initial "Priority" state
        if (name === 'Priority') return <MoreHorizontal size={14} />;
        return opt ? opt.icon : <MoreHorizontal size={14} />;
    };

    return (
        <div className="cim-overlay" onClick={onClose}>
            <div className="cim-content" onClick={e => e.stopPropagation()}>
                <div className="cim-header">
                    <div className="cim-breadcrumb">
                        <span className="cim-team-badge">AEK</span>
                        <span className="cim-breadcrumb-sep">›</span>
                        <span className="cim-breadcrumb-active">New issue</span>
                    </div>
                    <div className="cim-header-actions">
                        <button className="cim-icon-btn"><Maximize2 size={14} /></button>
                        <button className="cim-icon-btn" onClick={onClose}><X size={14} /></button>
                    </div>
                </div>

                <div className="cim-body">
                    <input
                        type="text"
                        className="cim-title-input"
                        placeholder="Issue title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        autoFocus
                    />
                    <textarea
                        className="cim-desc-input"
                        placeholder="Add description..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <div className="cim-meta-row">
                        {/* Status Dropdown */}
                        <div className="cim-dropdown-container">
                            <button
                                className={`cim-meta-btn ${activeDropdown === 'status' ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleDropdown('status'); }}
                            >
                                {getStatusIcon(status)} {status}
                            </button>
                            {activeDropdown === 'status' && (
                                <div className="cim-dropdown-menu status-menu" onClick={e => e.stopPropagation()}>
                                    <div className="cim-dropdown-search-container">
                                        <input type="text" className="cim-dropdown-search" placeholder="Change status..." autoFocus />
                                        <div className="cim-kbd">S</div>
                                    </div>
                                    <div className="cim-dropdown-list">
                                        {statusOptions.map(opt => (
                                            <div
                                                key={opt.label}
                                                className="cim-dropdown-item"
                                                onClick={() => { setStatus(opt.label); setActiveDropdown(null); }}
                                            >
                                                <div className="cim-item-left">
                                                    {opt.icon}
                                                    <span>{opt.label}</span>
                                                </div>
                                                <div className="cim-item-right">
                                                    {status === opt.label && <Check size={14} className="cim-check" />}
                                                    <span className="cim-count">{opt.count}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Priority Dropdown */}
                        <div className="cim-dropdown-container">
                            <button
                                className={`cim-meta-btn ${activeDropdown === 'priority' ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleDropdown('priority'); }}
                            >
                                {getPriorityIcon(priority)} {priority}
                            </button>
                            {activeDropdown === 'priority' && (
                                <div className="cim-dropdown-menu priority-menu" onClick={e => e.stopPropagation()}>
                                    <div className="cim-dropdown-header">
                                        <span>Set priority to...</span>
                                        <div className="cim-kbd">P</div>
                                    </div>
                                    <div className="cim-dropdown-list">
                                        {priorityOptions.map(opt => (
                                            <div
                                                key={opt.label}
                                                className="cim-dropdown-item"
                                                onClick={() => { setPriority(opt.label); setActiveDropdown(null); }}
                                            >
                                                <div className="cim-item-left">
                                                    {opt.icon}
                                                    <span>{opt.label}</span>
                                                </div>
                                                <div className="cim-item-right">
                                                    {priority === opt.label && <Check size={14} className="cim-check" />}
                                                    <span className="cim-count">{opt.count}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Assignee Dropdown */}
                        <div className="cim-dropdown-container">
                            <button
                                className={`cim-meta-btn ${activeDropdown === 'assignee' ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleDropdown('assignee'); }}
                            >
                                <User size={14} /> {assignee}
                            </button>
                            {activeDropdown === 'assignee' && (
                                <div className="cim-dropdown-menu assignee-menu" onClick={e => e.stopPropagation()}>
                                    <div className="cim-dropdown-header">
                                        <span>Assign to...</span>
                                        <div className="cim-kbd">A</div>
                                    </div>
                                    <div className="cim-dropdown-list">
                                        <div className="cim-dropdown-item" onClick={() => { setAssignee('No assignee'); setActiveDropdown(null); }}>
                                            <div className="cim-item-left">
                                                <div className="cim-user-avatar-placeholder"><User size={12} /></div>
                                                <span>No assignee</span>
                                            </div>
                                            {assignee === 'No assignee' && <Check size={14} className="cim-check" />}
                                        </div>

                                        <div className="cim-dropdown-section-title">Team members</div>

                                        {user && (
                                            <div className="cim-dropdown-item" onClick={() => { setAssignee(user.name); setActiveDropdown(null); }}>
                                                <div className="cim-item-left">
                                                    <div className="cim-user-avatar" style={{ background: '#007aff' }}>
                                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                    </div>
                                                    <span>{user.name || 'Current User'}</span>
                                                </div>
                                                {assignee === user.name && <Check size={14} className="cim-check" />}
                                            </div>
                                        )}
                                        {/* Potentially map other team members here if available in 'teams' prop */}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Project Dropdown */}
                        <div className="cim-dropdown-container">
                            <button
                                className={`cim-meta-btn ${activeDropdown === 'project' ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleDropdown('project'); }}
                            >
                                <i className="cim-project-icon">#</i> {project?.name || 'Project'}
                            </button>
                            {activeDropdown === 'project' && (
                                <div className="cim-dropdown-menu project-menu" onClick={e => e.stopPropagation()}>
                                    <div className="cim-dropdown-search-container">
                                        <input type="text" className="cim-dropdown-search" placeholder="Filter projects..." autoFocus />
                                    </div>
                                    <div className="cim-dropdown-list">
                                        <div className="cim-dropdown-item" onClick={() => { setProject(null); setActiveDropdown(null); }}>
                                            <div className="cim-item-left">
                                                <CircleDashed size={14} className="cim-dash-icon" />
                                                <span>No project</span>
                                            </div>
                                            {project === null && <Check size={14} className="cim-check" />}
                                        </div>

                                        {projects.length > 0 ? (
                                            projects.map((proj) => (
                                                <div key={proj._id} className="cim-dropdown-item" onClick={() => { setProject(proj); setActiveDropdown(null); }}>
                                                    <div className="cim-item-left">
                                                        <Box size={14} />
                                                        <span>{proj.name}</span>
                                                    </div>
                                                    {project?._id === proj._id && <Check size={14} className="cim-check" />}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="cim-dropdown-item" onClick={() => { setProject({ _id: 'demo', name: 'demo' }); setActiveDropdown(null); }}>
                                                <div className="cim-item-left">
                                                    <Box size={14} />
                                                    <span>demo</span>
                                                </div>
                                                {project?.name === 'demo' && <Check size={14} className="cim-check" />}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Labels Dropdown */}
                        <div className="cim-dropdown-container">
                            <button
                                className={`cim-meta-btn ${activeDropdown === 'labels' ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleDropdown('labels'); }}
                            >
                                <i className="cim-tag-icon">🏷️</i> {labels}
                            </button>
                            {activeDropdown === 'labels' && (
                                <div className="cim-dropdown-menu labels-menu" onClick={e => e.stopPropagation()}>
                                    <div className="cim-dropdown-search-container">
                                        <input type="text" className="cim-dropdown-search" placeholder="Add labels..." autoFocus />
                                        <div className="cim-kbd">L</div>
                                    </div>
                                    <div className="cim-dropdown-list">
                                        <div className="cim-dropdown-item" onClick={() => { setLabels('Bug'); setActiveDropdown(null); }}>
                                            <div className="cim-item-left">
                                                <div className="cim-label-dot" style={{ background: '#eb5757' }}></div>
                                                <span>Bug</span>
                                            </div>
                                        </div>
                                        <div className="cim-dropdown-item" onClick={() => { setLabels('Feature'); setActiveDropdown(null); }}>
                                            <div className="cim-item-left">
                                                <div className="cim-label-dot" style={{ background: '#bb87fc' }}></div>
                                                <span>Feature</span>
                                            </div>
                                        </div>
                                        <div className="cim-dropdown-item" onClick={() => { setLabels('Improvement'); setActiveDropdown(null); }}>
                                            <div className="cim-item-left">
                                                <div className="cim-label-dot" style={{ background: '#4ea7fc' }}></div>
                                                <span>Improvement</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="cim-meta-btn icon-only">
                            <MoreHorizontal size={14} />
                        </button>
                    </div>
                </div>

                <div className="cim-footer">
                    <div className="cim-footer-left">
                        <button className="cim-attach-btn">
                            <Paperclip size={16} />
                        </button>
                    </div>
                    <div className="cim-footer-right">
                        <div className="cim-toggle-create-more" onClick={() => setCreateMore(!createMore)}>
                            <div className={`cim-toggle-switch ${createMore ? 'checked' : ''}`}>
                                <div className="cim-toggle-thumb"></div>
                            </div>
                            <span>Create more</span>
                        </div>
                        <div className="cim-create-actions">
                            <button className="cim-create-btn" onClick={() => {
                                if (!project) {
                                    alert('Please select a project');
                                    return;
                                }
                                onCreate({
                                    title,
                                    description,
                                    status,
                                    priority,
                                    assignee,
                                    project: project._id, // Send ID
                                    labels
                                });
                            }}>Create issue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateIssueModal;
