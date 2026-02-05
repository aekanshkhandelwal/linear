import React, { useState, useRef, useEffect } from 'react';
import './SavedView.css';
import {
    Layers,
    Star,
    MoreHorizontal,
    Link as LinkIcon,
    Plus,
    Layout, 
    ListFilter,
    SlidersHorizontal,
    Box,
    CircleDashed,
    User as UserIcon,
    Lock,
    User,
    PanelRight,
    Pencil,
    Trash2,
    Download
} from 'lucide-react';

const SavedView = ({ viewData, projects, user, onBack, onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const hasItems = viewData?.projects && viewData.projects.length > 0;

    return (
        <div className="saved-view-container">
            {/* Top Global Header - Full Width */}
            <header className="sv-header">
                <div className="sv-title-area">
                    {/* Breadcrumb Style */}
                    <span
                        className="sv-breadcrumb-link"
                        onClick={onBack}
                    >
                        Views
                    </span>
                    <span className="sv-breadcrumb-separator">›</span>
                    <Layers size={16} className="sv-view-icon" style={{ marginRight: 6 }} />
                    <span className="sv-title-text">{viewData?.name || 'Untitled View'}</span>
                    <Star size={14} className="sv-star-icon" style={{ marginLeft: 8 }} />
                    <MoreHorizontal size={14} className="sv-star-icon" style={{ marginLeft: 8 }} />
                </div>
                <div className="sv-actions-right">
                    <button className="sv-link-btn"><LinkIcon size={16} /></button>
                    <button className="sv-add-project-btn">
                        <Plus size={14} /> Add project
                    </button>
                    <button className="sv-sidebar-toggle">
                        <PanelRight size={18} />
                    </button>
                </div>
            </header>

            {/* Global Toolbar - Full Width */}
            <div className="sv-toolbar">
                <div className="sv-filter">
                    <ListFilter size={16} /> Filter
                </div>
                {/* Display button */}
                <div className="sv-display">
                    <SlidersHorizontal size={14} /> Display
                </div>
            </div>

            {/* Content Body: Left Main Area + Right Sidebar */}
            <div className="sv-body">
                {/* Main Content Area */}
                <div className="sv-main-area">
                    <div className="sv-content">
                        <div className="sv-table-header">
                            <div className="sv-col-name">Name</div>
                            <div className="sv-col-health">Health</div>
                            <div className="sv-col-priority">Priority</div>
                            <div className="sv-col-lead">Lead</div>
                            <div className="sv-col-date">Target date</div>
                            <div className="sv-col-status">Status</div>
                        </div>

                        {/* Render actual projects if available */}
                        {projects && projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div className="sv-table-row" key={project._id || index}>
                                    <div className="sv-row-name">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }}>
                                            <Box size={12} color="#8a8f98" />
                                        </div>
                                        <span>{project.name}</span>
                                    </div>
                                    <div className="sv-row-health">
                                        <CircleDashed size={14} style={{ opacity: 0.3 }} />
                                    </div>
                                    <div className="sv-row-priority">
                                        <MoreHorizontal size={14} style={{ opacity: 0.3 }} />
                                    </div>
                                    <div className="sv-row-lead">
                                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <UserIcon size={10} color="#8a8f98" />
                                        </div>
                                    </div>
                                    <div className="sv-row-date">
                                        {project.targetDate ? new Date(project.targetDate).toLocaleDateString() : ''}
                                    </div>
                                    <div className="sv-row-status" style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                                        <CircleDashed size={14} color="#fce883" />
                                        <span>0%</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="sv-table-row">
                                <div className="sv-row-name">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }}>
                                        <Box size={12} color="#8a8f98" />
                                    </div>
                                    <span>demo</span>
                                </div>
                                <div className="sv-row-health">
                                    <CircleDashed size={14} style={{ opacity: 0.3 }} />
                                </div>
                                <div className="sv-row-priority">
                                    <MoreHorizontal size={14} style={{ opacity: 0.3 }} />
                                </div>
                                <div className="sv-row-lead">
                                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <UserIcon size={10} color="#8a8f98" />
                                    </div>
                                </div>
                                <div className="sv-row-date">
                                    {/* Empty or Placeholder */}
                                </div>
                                <div className="sv-row-status" style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                                    <CircleDashed size={14} color="#fce883" />
                                    <span>0%</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Right Sidebar */}
                <aside className="sv-right-sidebar">
                    <div className="sv-rs-header">
                        <div className="sv-rs-title-row">
                            <div className="sv-rs-title">
                                <Layers size={18} />
                                {viewData?.name || 'view1'}
                            </div>
                            <div className="sv-rs-actions" ref={menuRef} style={{ position: 'relative' }}>
                                <Star size={14} style={{ cursor: 'pointer' }} />
                                <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'flex', cursor: 'pointer' }}>
                                    <MoreHorizontal size={14} />
                                </div>

                                {isMenuOpen && (
                                    <div className="sv-dropdown-menu">
                                        <div className="sv-dropdown-item" onClick={() => {
                                            setIsMenuOpen(false);
                                            onEdit && onEdit();
                                        }}>
                                            <Pencil size={12} /> Edit...
                                        </div>
                                        <div className="sv-dropdown-item">
                                            <LinkIcon size={12} /> Copy link
                                        </div>
                                        <div className="sv-dropdown-item">
                                            <Download size={12} /> Export projects as CSV...
                                        </div>
                                        <div className="sv-dropdown-divider"></div>
                                        <div className="sv-dropdown-item delete" onClick={() => {
                                            setIsMenuOpen(false);
                                            onDelete && onDelete();
                                        }}>
                                            <Trash2 size={12} /> Delete
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Description removed as per new screenshot request */}
                        {/* <div className="sv-rs-desc">{viewData?.description || 'test'}</div> */}

                        <div className="sv-rs-meta">
                            <div className="sv-meta-row">
                                <div className="sv-meta-label">Visibility</div>
                                <div className="sv-meta-value">
                                    <Lock size={12} /> {viewData?.visibility || 'Personal'}
                                </div>
                            </div>
                            <div className="sv-meta-row">
                                <div className="sv-meta-label">Owner</div>
                                <div className="sv-meta-value">
                                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#007aff', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 'bold' }}>
                                        {user?.name ? user.name.charAt(0).toUpperCase() + user.name.split(' ')[1]?.charAt(0).toUpperCase() : 'AK'}
                                    </div>
                                    {user?.name || 'Aekansh Khandelwal'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sv-rs-tabs">
                        <div className="sv-rs-tab active">Leads</div>
                        <div className="sv-rs-tab">Health</div>
                    </div>

                    <div className="sv-rs-content">
                        <div className="sv-rs-empty-lead">
                            <div className="sv-rs-empty-lead-icon">
                                <div style={{ padding: 4, borderRadius: 4, border: '1px dashed #4a4d55' }}>
                                    <UserIcon size={12} />
                                </div>
                                <span>No lead</span>
                            </div>
                            <span>1</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SavedView;
