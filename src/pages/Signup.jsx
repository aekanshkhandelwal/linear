import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';
import './Auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleGoogleSignup = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            // Fetch user info using the access token
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${credentialResponse.access_token}` },
            })
                .then(res => res.json())
                .then(userInfo => {
                    // Send to Backend to Create User
                    fetch(`${API_BASE_URL}/api/auth/signup`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: userInfo.email,
                            googleId: userInfo.sub,
                            name: userInfo.name,
                            picture: userInfo.picture
                        })
                    })
                        .then(async res => {
                            const data = await res.json();
                            if (res.ok) {
                                login(data);
                                navigate('/workspace');
                            } else {
                                alert(data.message);
                            }
                        })
                        .catch(err => {
                            console.error("Backend Error:", err);
                            alert("Signup Failed");
                        });
                })
                .catch(error => console.error("Error fetching user info:", error));
        },
        onError: () => {
            console.log('Signup Failed');
        },
    });

    const handleSignup = () => {
        // Mock signup redirect
        navigate('/workspace');
    };

    return (
        <div className="auth-page">
            <Link to="/" className="auth-logo">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>

            <div className="auth-container">
                <h1 className="auth-title">Create your workspace</h1>

                <div className="auth-buttons">
                    <button className="btn-auth btn-google" onClick={() => handleGoogleSignup()}>
                        <span className="google-icon">G</span> Continue with Google
                    </button>

                    <div className="auth-divider-text">You used Google to log in last time</div>

                    <button className="btn-auth btn-secondary" onClick={handleSignup}>
                        Continue with email
                    </button>
                </div>

                <div className="auth-footer">
                    <p className="auth-footer-text" style={{ marginBottom: '20px', maxWidth: '300px' }}>
                        By signing up, you agree to our <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Data Processing Agreement</a>.
                    </p>
                    <p className="auth-footer-text">
                        Already have an account? <Link to="/login" className="auth-link">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
