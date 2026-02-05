import React, { useState, useEffect } from 'react';
import { X, UserPlus, Mail, Search } from 'lucide-react';
import './CreateTeamModal.css';

const InviteMemberModal = ({ onClose, onInvite }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length > 2) {
                try {
                    const response = await fetch(`http://localhost:5000/api/users/search?query=${searchQuery}`);
                    if (response.ok) {
                        const data = await response.json();
                        setSearchResults(data);
                    }
                } catch (err) {
                    console.error("Search failed", err);
                }
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSubmit = async () => {
        if (!selectedUser && !searchQuery) return;

        const emailToInvite = selectedUser ? selectedUser.email : searchQuery;

        setIsLoading(true);
        setError(null);
        try {
            await onInvite(emailToInvite);
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to invite user');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="create-team-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                <div className="ct-modal-header">
                    <h2>Add new member</h2>
                    <p>Search for a user by name or email to add to your workspace.</p>
                </div>

                <div className="ct-modal-body">
                    {error && (
                        <div style={{ padding: '10px', background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', borderRadius: '4px', marginBottom: '15px', fontSize: '13px' }}>
                            {error}
                        </div>
                    )}

                    <div className="ct-card-row">
                        <div className="ct-card-label">
                            <label>Search user</label>
                        </div>
                        <div className="ct-card-input-area" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#8a8f98' }} />
                                <input
                                    type="text"
                                    className="ct-input"
                                    style={{ paddingLeft: '34px' }}
                                    placeholder="Search by name or email..."
                                    value={selectedUser ? selectedUser.email : searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setSelectedUser(null); 
                                    }}
                                    autoFocus
                                />
                            </div>

                            {/* Search Results Dropdown */}
                            {searchResults.length > 0 && !selectedUser && (
                                <div className="search-results-dropdown" style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    background: '#1a1b1e',
                                    border: '1px solid #2f3036',
                                    borderRadius: '6px',
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    zIndex: 10
                                }}>
                                    {searchResults.map(user => (
                                        <div
                                            key={user._id}
                                            className="search-result-item"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setSearchQuery(''); 
                                                setSearchResults([]);
                                            }}
                                            style={{
                                                padding: '8px 12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #2f3036'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#2f3036'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                        >
                                            <div style={{
                                                width: '24px', height: '24px', borderRadius: '50%',
                                                backgroundColor: '#5e6ad2', color: 'white',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '12px', marginRight: '10px'
                                            }}>
                                                {user.picture ? <img src={user.picture} style={{ width: '100%', borderRadius: '50%' }} /> : user.name.charAt(0)}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ color: '#e3e4e6', fontSize: '13px' }}>{user.name}</span>
                                                <span style={{ color: '#8a8f98', fontSize: '11px' }}>{user.email}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="ct-footer-actions">
                        <button
                            className="ct-create-btn"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Add member'}
                        </button>
                    </div>
                </div>

                <button className="ct-close-abs" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default InviteMemberModal;
