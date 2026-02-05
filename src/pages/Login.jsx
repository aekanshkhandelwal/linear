import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${credentialResponse.access_token}` },
            })
                .then(res => res.json())
                .then(userInfo => {
                    // Send to Backend
                    fetch('http://localhost:5000/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: userInfo.email,
                            googleId: userInfo.sub
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
                            alert("Authentication Failed");
                        });
                })
                .catch(error => console.error("Error fetching google info:", error));
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    const handleLogin = () => {
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
                <h1 className="auth-title">Log in to Linear</h1>

                <div className="auth-buttons">
                    <button className="btn-auth btn-google" onClick={() => handleGoogleLogin()}>
                        <span className="google-icon">G</span> Continue with Google
                    </button>

                    <div className="auth-divider-text">You used Google to log in last time</div>

                    <button className="btn-auth btn-secondary" onClick={handleLogin}>
                        Continue with email
                    </button>
                </div>

                <div className="auth-footer">
                    <p className="auth-footer-text">
                        Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link> or <a href="#" className="auth-link">learn more</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
