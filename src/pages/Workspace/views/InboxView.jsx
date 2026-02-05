import React from 'react';
import {
    Filter,
    SlidersHorizontal
} from 'lucide-react';

const InboxView = () => {
    return (
        <div className="inbox-container">
            {/* Inbox List Pane */}
            <div className="inbox-list-pane">
                <div className="inbox-header">
                    <span>Inbox</span>
                    <div className="inbox-actions">
                        <Filter size={16} className="action-icon" />
                        <SlidersHorizontal size={16} className="action-icon" />
                    </div>
                </div>
                {/* Empty list for now as per image logic implied (or hidden items) */}
            </div>

            {/* Inbox Detail / Empty State Pane */}
            <div className="inbox-detail-pane">
                <div className="empty-state">
                    <div className="empty-state-icon">
                        {/* Simple SVG for the tray icon */}
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
                            <path d="M4 12l2-2h12l2 2" />
                            <path d="M4 12h16" />
                        </svg>
                    </div>
                    <div className="empty-state-text">No notifications</div>
                </div>
            </div>
        </div>
    );
};

export default InboxView;
