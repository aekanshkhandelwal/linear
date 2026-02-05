import React, { useState, useEffect, useRef } from 'react';
import { X, Box, ChevronRight, CircleDashed, Users, Calendar, Crosshair, Tag, Network, CheckCircle2, Circle, Check, XCircle, CircleDot, MoreHorizontal, AlertOctagon, Signal, Grip, BarChart3, Binary, AlertCircle, ChevronLeft, ChevronDown } from 'lucide-react';
import './CreateProjectModal.css';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config';

const CreateProjectModal = ({ onClose, onProjectCreated, teams = [] }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');

    const [status, setStatus] = useState({ id: 'backlog', label: 'Backlog', icon: CircleDashed, color: '#e5e5e5' });
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [priority, setPriority] = useState({ id: 'no_priority', label: 'No priority', icon: MoreHorizontal, color: '#8a8f98' });
    const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
    const priorityDropdownRef = useRef(null);

    const [startDate, setStartDate] = useState(null);
    const [isStartDateDropdownOpen, setIsStartDateDropdownOpen] = useState(false);
    const startDateDropdownRef = useRef(null);

    const [targetDate, setTargetDate] = useState('');
    const [isTargetDateDropdownOpen, setIsTargetDateDropdownOpen] = useState(false);
    const targetDateDropdownRef = useRef(null);

    // Team Logic
    const [selectedTeam, setSelectedTeam] = useState(teams.length > 0 ? teams[0] : null);
    const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
    const teamDropdownRef = useRef(null);

    // Sync selected team when teams are loaded
    useEffect(() => {
        if (teams.length > 0 && !selectedTeam) {
            setSelectedTeam(teams[0]);
        }
    }, [teams, selectedTeam]);

    // Calendar Logic
    const [currentDate, setCurrentDate] = useState(new Date());
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const generateCalendarDays = (year, month) => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        // Previous month padding
        const prevMonthDays = getDaysInMonth(year, month - 1);
        for (let i = 0; i < firstDay; i++) {
            days.push({ day: prevMonthDays - firstDay + 1 + i, type: 'prev' });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, type: 'current' });
        }

        // Next month padding (to fill 42 cells - 6 rows)
        const remainingCells = 42 - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            days.push({ day: i, type: 'next' });
        }

        return days;
    };

    const handleMonthChange = (direction) => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
    };

    const handleDateSelect = (day, type, isStart) => {
        let newDate = new Date(currentDate);
        if (type === 'prev') newDate.setMonth(newDate.getMonth() - 1);
        if (type === 'next') newDate.setMonth(newDate.getMonth() + 1);
        newDate.setDate(day);

        const formattedDate = newDate.toISOString().split('T')[0];

        if (isStart) {
            setStartDate(formattedDate);
            setIsStartDateDropdownOpen(false);
        } else {
            setTargetDate(formattedDate);
            setIsTargetDateDropdownOpen(false);
        }
    };

    const renderCalendar = (isStart) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const days = generateCalendarDays(year, month);
        const selectedDate = isStart ? startDate : targetDate;

        return (
            <div className="cp-calendar-grid">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                    <div key={d} className="cp-day-header">{d}</div>
                ))}

                {days.map((d, index) => {
                    // Check if this specific day is selected
                    let isSelected = false;
                    if (selectedDate) {
                        const checkDate = new Date(currentDate);
                        if (d.type === 'prev') checkDate.setMonth(checkDate.getMonth() - 1);
                        if (d.type === 'next') checkDate.setMonth(checkDate.getMonth() + 1);
                        checkDate.setDate(d.day);
                        isSelected = checkDate.toISOString().split('T')[0] === selectedDate;
                    }

                    return (
                        <div
                            key={index}
                            className={`cp-day-cell ${d.type !== 'current' ? 'dimmed' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleDateSelect(d.day, d.type, isStart)}
                        >
                            {d.day}
                        </div>
                    );
                })}
            </div>
        );
    };

    const statuses = [
        { id: 'backlog', label: 'Backlog', icon: CircleDashed, color: '#e5e5e5', shortcut: '1' },
        { id: 'planned', label: 'Planned', icon: Circle, color: '#e5e5e5', shortcut: '2' },
        { id: 'in_progress', label: 'In Progress', icon: CircleDot, color: '#f2c94c', shortcut: '3' },
        { id: 'completed', label: 'Completed', icon: CheckCircle2, color: '#5e6ad2', shortcut: '4' },
        { id: 'canceled', label: 'Canceled', icon: XCircle, color: '#8a8f98', shortcut: '5' },
    ];

    const priorities = [
        { id: 'no_priority', label: 'No priority', icon: MoreHorizontal, color: '#8a8f98', shortcut: '0' },
        { id: 'urgent', label: 'Urgent', icon: AlertCircle, color: '#f2c94c', shortcut: '1' }, // Using AlertCircle as approximation
        { id: 'high', label: 'High', icon: Signal, color: '#f2c94c', shortcut: '2' },
        { id: 'medium', label: 'Medium', icon: Signal, color: '#f2c94c', shortcut: '3' }, // Can style size/opacity later if needed
        { id: 'low', label: 'Low', icon: Signal, color: '#f2c94c', shortcut: '4' },
    ];


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false);
            }
            if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(event.target)) {
                setIsPriorityDropdownOpen(false);
            }
            if (startDateDropdownRef.current && !startDateDropdownRef.current.contains(event.target)) {
                setIsStartDateDropdownOpen(false);
            }
            if (targetDateDropdownRef.current && !targetDateDropdownRef.current.contains(event.target)) {
                setIsTargetDateDropdownOpen(false);
            }
            if (teamDropdownRef.current && !teamDropdownRef.current.contains(event.target)) {
                setIsTeamDropdownOpen(false);
            }
        };

        if (isStatusDropdownOpen || isPriorityDropdownOpen || isStartDateDropdownOpen || isTargetDateDropdownOpen || isTeamDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isStatusDropdownOpen, isPriorityDropdownOpen, isStartDateDropdownOpen, isTargetDateDropdownOpen, isTeamDropdownOpen]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="create-project-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="cp-modal-header">
                    <div className="cp-breadcrumb">
                        <div className="cp-team-badge" style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)} ref={teamDropdownRef}>
                            <div style={{ width: 12, height: 12, background: '#a52b65', borderRadius: 2, fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {selectedTeam ? selectedTeam.name.charAt(0).toUpperCase() : 'T'}
                            </div>
                            {selectedTeam ? selectedTeam.identifier : 'TEAM'}
                            <ChevronDown size={10} />

                            {isTeamDropdownOpen && (
                                <div className="cp-status-menu" style={{ top: '100%', left: 0, width: '200px' }}>
                                    <div className="cp-status-header">{selectedTeam ? selectedTeam.name : 'Select Team'}</div>
                                    {teams.map(t => (
                                        <div key={t._id} className="cp-status-item" onClick={(e) => { e.stopPropagation(); setSelectedTeam(t); setIsTeamDropdownOpen(false); }}>
                                            <div className="cp-status-left">
                                                <div style={{ width: 14, height: 14, background: '#a52b65', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>
                                                    {t.name.charAt(0).toUpperCase()}
                                                </div>
                                                {t.name}
                                            </div>
                                            {selectedTeam?._id === t._id && <Check size={14} />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <ChevronRight size={14} />
                        <span style={{ color: '#e3e4e8', fontWeight: 500 }}>New project</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        {/* Display button from screenshot */}
                        {/* <button className="cp-btn-cancel">Display</button> */}
                        <button className="cp-close-btn" onClick={onClose}>
                            <X size={16} />
                        </button>
                    </div>
                </div>

                <div className="cp-modal-body">
                    <div className="cp-icon-placeholder">
                        <Box size={16} />
                    </div>

                    <input
                        type="text"
                        className="cp-title-input"
                        placeholder="Project name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />

                    <input
                        type="text"
                        className="cp-summary-input"
                        placeholder="Add a short summary..."
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />

                    <div className="cp-meta-row">
                        <div className="cp-status-dropdown-container" ref={dropdownRef}>
                            <button className="cp-meta-btn has-value" onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}>
                                <status.icon size={14} color={status.color} />
                                {status.label}
                            </button>

                            {isStatusDropdownOpen && (
                                <div className="cp-status-menu" onClick={(e) => e.stopPropagation()}>
                                    <div className="cp-status-header">
                                        <span>Change status...</span>
                                        <div className="cp-status-header-keys">
                                            <span className="cp-key-box">P</span> then <span className="cp-key-box">S</span>
                                        </div>
                                    </div>
                                    {statuses.map((s) => (
                                        <div key={s.id} className="cp-status-item" onClick={() => { setStatus(s); setIsStatusDropdownOpen(false); }}>
                                            <div className="cp-status-left">
                                                <s.icon size={14} color={s.color} />
                                                {s.label}
                                            </div>
                                            <div className="cp-status-right">
                                                {status.id === s.id && <Check size={14} />}
                                                <span>{s.shortcut}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="cp-status-dropdown-container" ref={priorityDropdownRef} style={{ marginLeft: '8px' }}>
                            <button className="cp-meta-btn" onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}>
                                <priority.icon size={14} color={priority.color} />
                                {priority.label}
                            </button>

                            {isPriorityDropdownOpen && (
                                <div className="cp-status-menu" onClick={(e) => e.stopPropagation()}>
                                    <div className="cp-status-header">
                                        <span>Change priority...</span>
                                        <div className="cp-status-header-keys">
                                            <span className="cp-key-box">P</span> then <span className="cp-key-box">P</span>
                                        </div>
                                    </div>
                                    {priorities.map((p) => (
                                        <div key={p.id} className="cp-status-item" onClick={() => { setPriority(p); setIsPriorityDropdownOpen(false); }}>
                                            <div className="cp-status-left">
                                                <p.icon size={14} color={p.color} />
                                                {p.label}
                                            </div>
                                            <div className="cp-status-right">
                                                {priority.id === p.id && <Check size={14} />}
                                                <span>{p.shortcut}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button className="cp-meta-btn">
                            <div style={{ border: '1px dashed #8a8f98', borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Users size={10} />
                            </div>
                            Lead
                        </button>
                        <button className="cp-meta-btn">
                            <Users size={14} /> Members
                        </button>
                        <div className="cp-status-dropdown-container" ref={startDateDropdownRef}>
                            <button className={`cp-meta-btn ${startDate ? 'has-value' : ''}`} onClick={() => setIsStartDateDropdownOpen(!isStartDateDropdownOpen)}>
                                <Calendar size={14} /> {startDate ? startDate : 'Start'}
                            </button>

                            {isStartDateDropdownOpen && (
                                <div className="cp-date-picker" onClick={(e) => e.stopPropagation()}>
                                    <div className="cp-date-label">Start date</div>
                                    <input
                                        type="date"
                                        className="cp-date-input"
                                        onChange={(e) => {
                                            setStartDate(e.target.value);
                                            setIsStartDateDropdownOpen(false);
                                        }}
                                        style={{ colorScheme: 'dark' }}
                                    />

                                    <div className="cp-date-tabs">
                                        <div className="cp-date-tab active">Day</div>
                                        <div className="cp-date-tab">Month</div>
                                        <div className="cp-date-tab">Quarter</div>
                                        <div className="cp-date-tab">Half-year</div>
                                        <div className="cp-date-tab">Year</div>
                                    </div>

                                    <div className="cp-calendar-header">
                                        <div className="cp-month-label">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="cp-nav-btn" onClick={() => handleMonthChange(-1)}><ChevronLeft size={16} /></button>
                                            <button className="cp-nav-btn" onClick={() => handleMonthChange(1)}><ChevronRight size={16} /></button>
                                        </div>
                                    </div>

                                    {renderCalendar(true)}
                                </div>
                            )}
                        </div>
                        <div className="cp-status-dropdown-container" ref={targetDateDropdownRef}>
                            <button className={`cp-meta-btn ${targetDate ? 'has-value' : ''}`} onClick={() => setIsTargetDateDropdownOpen(!isTargetDateDropdownOpen)}>
                                <Crosshair size={14} /> {targetDate ? targetDate : 'Target'}
                            </button>

                            {isTargetDateDropdownOpen && (
                                <div className="cp-date-picker" onClick={(e) => e.stopPropagation()}>
                                    <div className="cp-date-label">Target date</div>
                                    <input
                                        type="date"
                                        className="cp-date-input"
                                        onChange={(e) => {
                                            setTargetDate(e.target.value);
                                            setIsTargetDateDropdownOpen(false);
                                        }}
                                        style={{ colorScheme: 'dark' }}
                                    />

                                    <div className="cp-date-tabs">
                                        <div className="cp-date-tab active">Day</div>
                                        <div className="cp-date-tab">Month</div>
                                        <div className="cp-date-tab">Quarter</div>
                                        <div className="cp-date-tab">Half-year</div>
                                        <div className="cp-date-tab">Year</div>
                                    </div>

                                    <div className="cp-calendar-header">
                                        <div className="cp-month-label">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="cp-nav-btn" onClick={() => handleMonthChange(-1)}><ChevronLeft size={16} /></button>
                                            <button className="cp-nav-btn" onClick={() => handleMonthChange(1)}><ChevronRight size={16} /></button>
                                        </div>
                                    </div>

                                    {renderCalendar(false)}
                                </div>
                            )}
                        </div>
                        <button className="cp-meta-btn">
                            <Tag size={14} /> Labels
                        </button>
                        <button className="cp-meta-btn">
                            <Network size={14} /> Dependencies
                        </button>
                    </div>

                    <textarea
                        className="cp-description-area"
                        placeholder="Write a description, a project brief, or collect ideas..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Spacer to push milestones down if needed, currently fixed height in CSS not set so it flows */}

                    <div className="cp-footer-actions">
                        <button className="cp-milestone-btn">
                            <span style={{ fontWeight: 500 }}>Milestones</span>
                            <span style={{ fontSize: '16px' }}>+</span>
                        </button>
                    </div>
                </div>

                <div className="cp-modal-footer">
                    <button className="cp-btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="cp-btn-create" onClick={async () => {
                        try {
                            if (!title) return alert('Project name is required');
                            if (!selectedTeam) return alert('Please select a team');

                            // Debug user object
                            console.log('Current User Object:', user);

                            if (!user) {
                                return alert('You are not logged in. Please log in first.');
                            }

                            const userId = user._id || user.id;
                            if (!userId) {
                                console.error('User ID is missing from user object:', user);
                                return alert('User ID is missing. Please try logging out and logging back in.');
                            }

                            const projectData = {
                                name: title,
                                summary,
                                description,
                                status: status.id,
                                priority: priority.id,
                                startDate,
                                targetDate,
                                userId: userId,
                                teamId: selectedTeam._id
                            };

                            console.log('Sending project data:', projectData);

                            const response = await fetch(`${API_BASE_URL}/api/projects`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(projectData),
                            });

                            const data = await response.json();

                            if (response.ok) {
                                console.log('Project created successfully:', data);
                                if (onProjectCreated) {
                                    onProjectCreated(data);
                                }
                                onClose();
                            } else {
                                console.error('Server returned error:', data);
                                alert(`Failed to create project: ${data.message || 'Unknown error'}`);
                            }
                        } catch (error) {
                            console.error('Network or Logic Error:', error);
                            alert(`Error creating project: ${error.message}`);
                        }
                    }}>Create project</button>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectModal;
