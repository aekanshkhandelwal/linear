import React from 'react';
import { ChevronRight } from 'lucide-react';
import './AISection.css';

const AISection = () => {
    return (
        <section className="ai-section">
            <div className="container">
                <div className="ai-header">
                    <div className="ai-badge">Artificial Intelligence <ChevronRight size={12} /></div>
                    <h2>AI-assisted product development</h2>
                    <p className="ai-sub">
                        Linear for Agents. Choose from a variety of AI<br />
                        agents and start delegating work, from code<br />
                        generation to other technical tasks.
                    </p>
                    <button className="ai-btn">Learn more <ChevronRight size={14} /></button>
                </div>

                <div className="ai-visual">
                    <div className="ai-card glass">
                        <div className="ai-input-bar">
                            <span className="cursor-text">Assign to...</span>
                        </div>

                        <div className="ai-list">
                            {/* Cursor */}
                            <div className="ai-item selected">
                                <div className="ai-icon cursor-icon">
                                    <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                                        <path d="M2 2l7.586 7.586"></path>
                                        <circle cx="11" cy="11" r="2"></circle>
                                    </svg>
                                </div>
                                <span className="item-name">Cursor</span>
                                <span className="tag">Agent</span>
                                <div className="check-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                            </div>

                            {/* GitHub Copilot */}
                            <div className="ai-item">
                                <div className="ai-icon github-icon">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </div>
                                <span className="item-name">GitHub Copilot</span>
                                <span className="tag">Agent</span>
                            </div>

                            {/* Sentry */}
                            <div className="ai-item">
                                <div className="ai-icon sentry-icon">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                        <path d="M14.615 14.974H9.37l-1.464-3.483L2.64 23h18.72l-5.266-11.51-1.478 3.484zm-7.619-3.483l-2.062 1.455L.236 23h2.404l4.356-11.509zm10.01 0l4.354 11.51h2.403L19.065 12.95l-2.061-1.459zM12.003.882L6.155 13.91l1.644 1.064 4.199-10.02 4.204 10.02 1.645-1.064L12.003.882z" />
                                    </svg>
                                </div>
                                <span className="item-name">Sentry</span>
                                <span className="tag">Agent</span>
                            </div>

                            {/* Leela */}
                            <div className="ai-item">
                                <div className="ai-icon leela-icon">
                                    <img src="https://avatar.vercel.sh/leela" alt="" style={{ width: '100%', height: '100%', borderRadius: '4px' }} />
                                </div>
                                <span className="item-name">Leela</span>
                            </div>

                            {/* Codex */}
                            <div className="ai-item">
                                <div className="ai-icon codex-icon">
                                    <div style={{ background: '#333', width: '10px', height: '10px', borderRadius: '50%' }}></div>
                                </div>
                                <span className="item-name">Codex</span>
                                <span className="tag">Agent</span>
                            </div>

                            {/* Conor */}
                            <div className="ai-item">
                                <div className="ai-icon conor-icon">
                                    <img src="https://avatar.vercel.sh/conor" alt="" style={{ width: '100%', height: '100%', borderRadius: '4px' }} />
                                </div>
                                <span className="item-name">Conor</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ai-features-grid">
                    {/* Feature 1: Self-driving product operations */}
                    <div className="ai-feature-block">
                        <div className="ai-feature-text">
                            <h3>Self-driving product operations</h3>
                            <p>Streamline your product development workflows with AI assistance for routine, manual tasks.</p>
                        </div>
                        <div className="ai-feature-visual visual-triage">
                            {}
                            <div className="triage-card">
                                <div className="triage-header">
                                    <span className="sparkle-icon">✨</span> Triage Intelligence
                                </div>
                                <div className="triage-row">
                                    <span className="label">Suggestions</span>
                                    <div className="tags">
                                        <span className="tag-pill"><span className="icon">⚡</span> nan</span>
                                        <span className="tag-pill"><span className="icon">📱</span> Mobile App Refactor</span>
                                        <span className="tag-pill dimmed"><span className="icon">#</span> Slack</span>
                                    </div>
                                </div>
                                <div className="triage-row">
                                    <span className="label">Duplicate of</span>
                                    <div className="tags">
                                        <span className="tag-pill"><span className="icon">⚡</span> nan</span>
                                    </div>
                                </div>
                                <div className="triage-row">
                                    <span className="label">Related to</span>
                                </div>

                                {/* Popover */}
                                <div className="triage-popover">
                                    <div className="pop-content">
                                        <h4>Why this assignee was suggested</h4>
                                        <p>This person was the assignee on previous issues related to performance problems in the mobile app launch flow</p>
                                    </div>
                                    <div className="pop-content">
                                        <h4>Alternatives</h4>
                                        <div className="avatars">
                                            <div className="avatar-pill"><img src="https://avatar.vercel.sh/yann" alt="" /> yann</div>
                                            <div className="avatar-pill"><img src="https://avatar.vercel.sh/erin" alt="" /> erin</div>
                                        </div>
                                    </div>
                                    <div className="pop-action">
                                        <button className="accept-btn">
                                            <span className="check">✓</span> Accept suggestion
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Linear MCP */}
                    <div className="ai-feature-block">
                        <div className="ai-feature-text">
                            <h3>Linear MCP</h3>
                            <p>Connect Linear to your favorite tools including Cursor, Claude, ChatGPT, and more.</p>
                        </div>
                        <div className="ai-feature-visual visual-mcp">
                            {/* CSS-only Code/MCP Mockup */}
                            <div className="mcp-card">
                                <div className="code-block">
                                    <div className="code-line comment">// mcp.linear.app/sse</div>
                                    <div className="code-line"><span className="key">"mcpServers"</span>: {'{'}</div>
                                    <div className="code-line indent">    <span className="key">"linear"</span>: {'{'}</div>
                                    <div className="code-line indent-2">        <span className="key">"command"</span>: <span className="value">"npx"</span></div>
                                </div>

                                <div className="mcp-input">
                                    <div className="input-placeholder">| Ask anything</div>
                                    <div className="input-actions">
                                        <button><span className="icon">📎</span> Attach</button>
                                        <button><span className="icon">🌐</span> Search</button>
                                        <button><span className="icon">💡</span> Reason</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AISection;
