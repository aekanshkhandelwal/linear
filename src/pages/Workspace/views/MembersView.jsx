import React, { useState, useEffect } from 'react';
import {
    Layout,
    ListFilter,
    ArrowDown,
    User as UserIcon,
    UserPlus
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import InviteMemberModal from '../InviteMemberModal';

const MembersView = ({ setActiveView }) => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const fetchUsers = async () => {
        if (!user) return;
        const userId = user._id || user.googleId;
        try {
            const response = await fetch(`http://localhost:5000/api/users?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [user]);

    return (
        <main className="workspace-main" style={{ backgroundColor: '#0b0c0e' }}>
            <div className="members-header">
                <div className="members-title-area">
                    <span className="members-title">Members</span>
                    <span className="members-count">{users.length}</span>
                </div>
                <div className="members-actions-right">
                    <button className="new-team-btn" onClick={() => setIsInviteModalOpen(true)}>
                        <UserPlus size={14} /> New member
                    </button>
                    <button className="display-btn">
                        <Layout size={14} /> Display
                    </button>
                </div>
            </div>

            <div className="members-toolbar">
                <div className="toolbar-filter">
                    <ListFilter size={16} /> Filter
                </div>
            </div>

            <div className="members-table-header">
                <div className="col-mem-name">Name <ArrowDown size={12} /></div>
                <div className="col-mem-status">Status</div>
                <div className="col-mem-joined">Joined</div>
                <div className="col-mem-teams">Teams</div>
            </div>

            <div className="members-list">
                {users.map(member => (
                    <div className="member-row" key={member._id}>
                        <div className="col-mem-name">
                            <div className="member-avatar">
                                {member.picture ? (
                                    <img src={member.picture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                ) : (
                                    member.name ? member.name.charAt(0).toUpperCase() : 'U'
                                )}
                            </div>
                            <div className="member-info">
                                <span className="member-name">{member.name}</span>
                                <span className="member-email">{member.email}</span>
                            </div>
                        </div>
                        <div className="col-mem-status">
                            <div className="admin-badge">Member</div>
                        </div>
                        <div className="col-mem-joined">
                            <span className="joined-date">Joined</span>
                        </div>
                        <div className="col-mem-teams">
                            <div className="teams-badge">
                                <UserIcon size={12} /> Workspace
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isInviteModalOpen && (
                <InviteMemberModal
                    onClose={() => setIsInviteModalOpen(false)}
                    onInvite={async (email) => {
                        const userId = user._id || user.googleId;
                        const response = await fetch('http://localhost:5000/api/users/invite', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, invitedByUserId: userId })
                        });
                        if (!response.ok) {
                            const err = await response.json();
                            throw new Error(err.message);
                        }
                        fetchUsers();
                    }}
                />
            )}
        </main>
    );
};

export default MembersView;
