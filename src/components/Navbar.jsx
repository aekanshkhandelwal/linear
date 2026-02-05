import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'white' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="brand-name">Linear</span>
        </Link>

        <div className="nav-links desktop-only">
          <div className="nav-item-wrapper">
            <Link to="/features" className="nav-link-item">Product</Link>
            <div className="mega-menu glass">
              <div className="mega-menu-content">
                <div className="mega-column core-col">
                  <div className="mega-label">Core Features</div>
                  <a href="#" className="mega-item">
                    <span className="item-title">Plan</span>
                    <span className="item-desc">Set the product direction with projects and initiatives</span>
                  </a>
                  <a href="#" className="mega-item">
                    <span className="item-title">Build</span>
                    <span className="item-desc">Make progress with issue tracking and cycle planning</span>
                  </a>
                </div>

                <div className="mega-column more-col">
                  <div className="mega-label">More</div>
                  <div className="more-grid">
                    <a href="#" className="mega-item">
                      <span className="item-title">Customer requests</span>
                      <span className="item-desc">Manage user feedback</span>
                    </a>
                    <a href="#" className="mega-item">
                      <span className="item-title">Integrations</span>
                      <span className="item-desc">Collaborate across tools</span>
                    </a>
                    <a href="#" className="mega-item">
                      <span className="item-title">Insights</span>
                      <span className="item-desc">Realtime analytics</span>
                    </a>
                    <a href="#" className="mega-item">
                      <span className="item-title">Mobile app</span>
                      <span className="item-desc">Linear in your pocket</span>
                    </a>
                    <a href="#" className="mega-item">
                      <span className="item-title">Linear Asks</span>
                      <span className="item-desc">Workplace requests</span>
                    </a>
                    <a href="#" className="mega-item">
                      <span className="item-title">Artificial intelligence</span>
                      <span className="item-desc">AI-powered workflows</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mega-footer">
                <div className="new-feature">
                  <span className="new-badge">New:</span>
                  <span className="feature-name">Team owners</span>
                  <span className="feature-desc">Permissions for team-level settings</span>
                </div>
                <a href="#" className="changelog-link">Changelog</a>
              </div>
            </div>
          </div>
          <div className="nav-item-wrapper">
            <a href="#method" className="nav-link-item">Resources</a>
            <div className="mega-menu glass">
              <div className="mega-menu-content">
                <div className="mega-column core-col">
                  <div className="mega-label">Company</div>
                  <a href="#" className="mega-item">
                    <span className="item-title">About</span>
                    <span className="item-desc">Meet the team</span>
                  </a>
                  <a href="#" className="mega-item">
                    <span className="item-title">Careers</span>
                    <span className="item-desc">We're hiring</span>
                  </a>
                </div>

                <div className="mega-column more-col">
                  <div className="mega-label">Explore</div>
                  <div className="more-grid">
                    <a href="#" className="mega-item">
                      <span className="item-title">Developers</span>
                      <span className="item-desc">Build on the Linear API</span>
                    </a>
                    <a href="#" className="mega-item">
                      <span className="item-title">Switch to Linear</span>
                      <span className="item-desc">Migration guide</span>
                    </a>
                    <a href="#" className="mega-item">
                      <span className="item-title">Security</span>
                      <span className="item-desc">Safe, secure, and private</span>
                    </a>
                    <a href="#" className="mega-item">
                      <span className="item-title">Download</span>
                      <span className="item-desc">Get the app</span>
                    </a>
                    <a href="#" className="mega-item">
                      <span className="item-title">Docs</span>
                      <span className="item-desc">How to use Linear</span>
                    </a>
                    <a href="#" className="mega-item">
                      <span className="item-title">Quality</span>
                      <span className="item-desc">Conversations on quality</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/pricing" className="nav-link-item">Pricing</Link>
          <Link to="/customers" className="nav-link-item">Customers</Link>
          <Link to="/customers" className="nav-link-item">New</Link>
          <a href="#company" className="nav-link-item">Company</a>
        </div>

        <div className="nav-actions desktop-only">
          <Link to="/login" className="login-link">Log in</Link>
          <Link to="/signup" className="signup-btn">Sign up</Link>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu glass">
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#method" onClick={() => setMobileMenuOpen(false)}>Method</a>
          <Link to="/customers" onClick={() => setMobileMenuOpen(false)}>Customers</Link>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <div className="mobile-actions">
            <a href="#" className="login-link">Log in</a>
            <button className="signup-btn">Sign up</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
