import React from 'react';
import './Pricing.css';
import { CheckCircle2 } from 'lucide-react';

const Pricing = () => {
    const CheckIcon = () => <CheckCircle2 size={16} fill="#5e6ad2" color="#000" className="check-icon" />;

    return (
        <div className="pricing-page">
            <div className="pricing-container">
                <div className="pricing-header">
                    <h1 className="pricing-title">Pricing</h1>
                    <p className="pricing-subtitle">
                        Use Linear for free with your team. Upgrade to enable <br /> unlimited issues, enhanced security controls, and additional features.
                    </p>
                </div>

                <div className="pricing-grid">
                    {/* Free Plan */}
                    <div className="pricing-card">
                        <h3>Free</h3>
                        <div className="price-block">
                            <span className="currency">$</span>
                            <span className="amount">0</span>
                        </div>
                        <div className="plan-desc">Free for everyone</div>

                        <ul className="feature-list">
                            <li className="feature-item"><CheckIcon /> Unlimited members</li>
                            <li className="feature-item"><CheckIcon /> 2 teams</li>
                            <li className="feature-item"><CheckIcon /> 250 issues</li>
                            <li className="feature-item"><CheckIcon /> Slack and GitHub</li>
                            <li className="feature-item"><CheckIcon /> AI agents</li>
                        </ul>

                        <button className="plan-btn">Get started</button>
                    </div>

                    {/* Basic Plan */}
                    <div className="pricing-card">
                        <h3>Basic</h3>
                        <div className="price-block">
                            <span className="currency">$</span>
                            <span className="amount">10</span>
                            <span className="period">per user/month</span>
                        </div>
                        <div className="billing-label">
                            <div className="toggle-switch"></div> Billed yearly
                        </div>

                        <ul className="feature-list">
                            <li className="feature-item"><CheckIcon /> All Free features +</li>
                            <li className="feature-item"><CheckIcon /> 5 teams</li>
                            <li className="feature-item"><CheckIcon /> Unlimited issues</li>
                            <li className="feature-item"><CheckIcon /> Unlimited file uploads</li>
                            <li className="feature-item"><CheckIcon /> Admin roles</li>
                        </ul>

                        <button className="plan-btn">Get started</button>
                    </div>

                    {/* Business Plan - Highlighted */}
                    <div className="pricing-card highlighted">
                        <h3>Business</h3>
                        <div className="price-block">
                            <span className="currency">$</span>
                            <span className="amount">16</span>
                            <span className="period">per user/month</span>
                        </div>
                        <div className="billing-label">
                            <div className="toggle-switch"></div> Billed yearly
                        </div>

                        <ul className="feature-list">
                            <li className="feature-item"><CheckIcon /> All Basic features +</li>
                            <li className="feature-item"><CheckIcon /> Unlimited teams</li>
                            <li className="feature-item"><CheckIcon /> Private teams and guests</li>
                            <li className="feature-item"><CheckIcon /> Triage Intelligence</li>
                            <li className="feature-item"><CheckIcon /> Linear Insights</li>
                            <li className="feature-item"><CheckIcon /> Linear Asks</li>
                            <li className="feature-item"><CheckIcon /> Issue SLAs</li>
                            <li className="feature-item"><CheckIcon /> Zendesk and Intercom integrations</li>
                        </ul>

                        <button className="plan-btn">Get started</button>
                        <a href="#" className="contact-link">or contact sales</a>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="pricing-card">
                        <h3>Enterprise</h3>
                        <div className="price-block">
                            <span className="custom-price">Contact us</span>
                        </div>
                        <div className="plan-desc">Annual billing only</div>

                        <ul className="feature-list">
                            <li className="feature-item"><CheckIcon /> All Business features +</li>
                            <li className="feature-item"><CheckIcon /> Sub-initiatives</li>
                            <li className="feature-item"><CheckIcon /> Advanced Linear Asks</li>
                            <li className="feature-item"><CheckIcon /> Dashboards</li>
                            <li className="feature-item"><CheckIcon /> SAML and SCIM</li>
                            <li className="feature-item"><CheckIcon /> Advanced security</li>
                            <li className="feature-item"><CheckIcon /> Migration and onboarding support</li>
                        </ul>

                        <button className="plan-btn">Request trial</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
