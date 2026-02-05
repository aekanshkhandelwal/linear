import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col">
                    <div className="logo brand-name">Linear</div>
                    <div className="footer-links social">
                        <a href="#">Twitter</a>
                        <a href="#">GitHub</a>
                        <a href="#">Slack</a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Product</h4>
                    <a href="#">Features</a>
                    <a href="#">Integrations</a>
                    <a href="#">Pricing</a>
                    <a href="#">Changelog</a>
                </div>

                <div className="footer-col">
                    <h4>Company</h4>
                    <a href="#">About us</a>
                    <a href="#">Careers</a>
                    <a href="#">Blog</a>
                    <a href="#">Contact</a>
                </div>

                <div className="footer-col">
                    <h4>Resources</h4>
                    <a href="#">Community</a>
                    <a href="#">Contact</a>
                    <a href="#">DPA</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
