import React, { useState } from 'react';
import { X, User, ChevronDown } from 'lucide-react';
import './CreateTeamModal.css';

const CreateTeamModal = ({ onClose, onCreate, inline = false }) => {
    const [teamName, setTeamName] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [timezone, setTimezone] = useState('GMT+5:30 - India Standard Time - Kolkata');

    if (inline) {
        return (
            <div className="ct-inline-container">
                <div className="create-team-modal-content ct-inline-content">
                    <div className="ct-modal-header">
                        <h2>Create a new team</h2>
                        <p>Create a new team to manage separate cycles, workflows and notifications</p>
                    </div>

                    <div className="ct-modal-body">
                        <div className="ct-card-group">
                            <div className="ct-card-row">
                                <div className="ct-card-label">
                                    <label>Team icon</label>
                                </div>
                                <div className="ct-card-input-area">
                                    <div className="ct-icon-placeholder">
                                        <User size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="ct-card-row">
                                <div className="ct-card-label">
                                    <label>Team name</label>
                                </div>
                                <div className="ct-card-input-area">
                                    <input
                                        type="text"
                                        className="ct-input"
                                        placeholder="e.g. Engineering"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="ct-card-row">
                                <div className="ct-card-label">
                                    <label>Identifier</label>
                                    <span>Used to identify issues from this team (e.g. ENG-123)</span>
                                </div>
                                <div className="ct-card-input-area">
                                    <input
                                        type="text"
                                        className="ct-input"
                                        placeholder="e.g. ENG"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="ct-section-header">
                            <h3>Team hierarchy</h3>
                            <p>Teams can be nested to reflect your team structure and to share workflows and settings</p>
                        </div>

                        <div className="ct-form-group">
                            <div className="ct-disabled-box">
                                <span>Parent team</span>
                                <span className="ct-business-tag">Available on Business</span>
                            </div>
                        </div>

                        <div className="ct-section-header">
                            <h3>Copy settings from existing team</h3>
                            <p>You can choose to copy the settings of an existing team for your newly created team. All settings including workflow and cycle settings are copied, but Slack notification settings and team members won't be copied.</p>
                        </div>

                        <div className="ct-form-group">
                            <div className="ct-select-box">
                                <span>Copy from team</span>
                                <div className="ct-select-value">
                                    Don't copy <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="ct-section-header">
                            <h3>Timezone</h3>
                            <p>The timezone should be set as the location where most of your team members reside. All other times referenced by the team will be relative to this timezone setting. For example, if the team uses cycles, each cycle will start at midnight in the specified timezone.</p>
                        </div>

                        <div className="ct-form-group">
                            <div className="ct-select-box">
                                <span>Timezone</span>
                                <div className="ct-select-value">
                                    {timezone} <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="ct-section-header">
                            <h3>Make team private</h3>
                            <p>Private teams and their issues are only visible to members of the team and admins. Only admins and team owners can add new users to a private team. Public teams and their issues are visible to anyone in the workspace.</p>
                        </div>

                        <div className="ct-form-group">
                            <div className="ct-disabled-box">
                                <span>Private team</span>
                                <span className="ct-business-tag">Available on Business</span>
                            </div>
                        </div>
                        <div className="ct-footer-actions">
                            <button className="ct-create-btn" onClick={() => {
                                console.log('Create Team button clicked (inline)');
                                if (!teamName) {
                                    alert('Please enter a team name');
                                    return;
                                }
                                console.log('Calling onCreate with:', { name: teamName, identifier, timezone });
                                onCreate({ name: teamName, identifier, timezone });
                            }}>
                                Create team
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="create-team-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="ct-modal-header">
                    <h2>Create a new team</h2>
                    <p>Create a new team to manage separate cycles, workflows and notifications</p>
                </div>

                <div className="ct-modal-body">
                    <div className="ct-card-group">
                        <div className="ct-card-row">
                            <div className="ct-card-label">
                                <label>Team icon</label>
                            </div>
                            <div className="ct-card-input-area">
                                <div className="ct-icon-placeholder">
                                    <User size={16} />
                                </div>
                            </div>
                        </div>

                        <div className="ct-card-row">
                            <div className="ct-card-label">
                                <label>Team name</label>
                            </div>
                            <div className="ct-card-input-area">
                                <input
                                    type="text"
                                    className="ct-input"
                                    placeholder="e.g. Engineering"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="ct-card-row">
                            <div className="ct-card-label">
                                <label>Identifier</label>
                                <span>Used to identify issues from this team (e.g. ENG-123)</span>
                            </div>
                            <div className="ct-card-input-area">
                                <input
                                    type="text"
                                    className="ct-input"
                                    placeholder="e.g. ENG"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="ct-section-header">
                        <h3>Team hierarchy</h3>
                        <p>Teams can be nested to reflect your team structure and to share workflows and settings</p>
                    </div>

                    <div className="ct-form-group">
                        <div className="ct-disabled-box">
                            <span>Parent team</span>
                            <span className="ct-business-tag">Available on Business</span>
                        </div>
                    </div>

                    <div className="ct-section-header">
                        <h3>Copy settings from existing team</h3>
                        <p>You can choose to copy the settings of an existing team for your newly created team. All settings including workflow and cycle settings are copied, but Slack notification settings and team members won't be copied.</p>
                    </div>

                    <div className="ct-form-group">
                        <div className="ct-select-box">
                            <span>Copy from team</span>
                            <div className="ct-select-value">
                                Don't copy <ChevronDown size={14} />
                            </div>
                        </div>
                    </div>

                    <div className="ct-section-header">
                        <h3>Timezone</h3>
                        <p>The timezone should be set as the location where most of your team members reside. All other times referenced by the team will be relative to this timezone setting. For example, if the team uses cycles, each cycle will start at midnight in the specified timezone.</p>
                    </div>

                    <div className="ct-form-group">
                        <div className="ct-select-box">
                            <span>Timezone</span>
                            <div className="ct-select-value">
                                {timezone} <ChevronDown size={14} />
                            </div>
                        </div>
                    </div>

                    <div className="ct-section-header">
                        <h3>Make team private</h3>
                        <p>Private teams and their issues are only visible to members of the team and admins. Only admins and team owners can add new users to a private team. Public teams and their issues are visible to anyone in the workspace.</p>
                    </div>

                    <div className="ct-form-group">
                        <div className="ct-disabled-box">
                            <span>Private team</span>
                            <span className="ct-business-tag">Available on Business</span>
                        </div>
                    </div>
                    <div className="ct-footer-actions">
                        <button className="ct-create-btn" onClick={() => {
                            console.log('Create Team button clicked (modal)');
                            if (!teamName) {
                                alert('Please enter a team name');
                                return;
                            }
                            console.log('Calling onCreate with:', { name: teamName, identifier, timezone });
                            onCreate({ name: teamName, identifier, timezone });
                        }}>
                            Create team
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

export default CreateTeamModal;
