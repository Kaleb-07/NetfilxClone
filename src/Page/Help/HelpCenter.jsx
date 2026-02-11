import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Netflix_logo from "../../assets/images/Netflix_logo.svg";
import './HelpCenter.css';

const HelpCenter = () => {
    const navigate = useNavigate();

    return (
        <div className="help-center">
            <header className="help-header">
                <div className="help-header__left">
                    <img
                        src={Netflix_logo}
                        alt="Netflix"
                        className="help-logo"
                        onClick={() => navigate('/home')}
                    />
                    <span className="help-divider">|</span>
                    <span className="help-title" onClick={() => navigate('/help')}>Help Center</span>
                </div>
                <div className="help-header__right">
                    <button className="join-netflix" onClick={() => navigate('/')}>Join Netflix</button>
                    <button className="sign-in-help" onClick={() => navigate('/home')}>Sign In</button>
                </div>
            </header>

            <div className="help-hero">
                <div className="help-hero__content">
                    <h1>How can we help?</h1>
                    <div className="help-search-bar">
                        <SearchIcon className="search-icon-help" />
                        <input type="text" placeholder="What do you need help with?" />
                    </div>
                </div>
            </div>

            <div className="help-body">
                <div className="help-container">
                    <section className="trending-topics">
                        <div className="trending-header">
                            <span className="trending-icon">📈</span>
                            <h2>Trending Topics</h2>
                        </div>
                        <ul className="help-links">
                            <li><a href="#">How to sign up for Netflix</a></li>
                            <li><a href="#">Plans and Pricing</a></li>
                            <li><a href="#">Can't sign in to Netflix</a></li>
                            <li><a href="#">How to watch Netflix on your TV</a></li>
                        </ul>
                    </section>

                    <div className="help-grid">
                        <div className="help-card">
                            <h3>Getting Started</h3>
                            <p>Everything you need to know to start watching.</p>
                        </div>
                        <div className="help-card">
                            <h3>Manage My Account</h3>
                            <p>How to change your email, password, or plan.</p>
                        </div>
                        <div className="help-card">
                            <h3>Watching Netflix</h3>
                            <p>Troubleshoot issues with video quality or devices.</p>
                        </div>
                        <div className="help-card">
                            <h3>Quick Links</h3>
                            <ul className="quick-links-list">
                                <li><a href="#">Reset Password</a></li>
                                <li><a href="#">Update Email</a></li>
                                <li><a href="#">Get Help Signing In</a></li>
                                <li><a href="#">Update Payment Method</a></li>
                            </ul>
                        </div>
                    </div>

                    <button className="back-to-home" onClick={() => navigate('/home')}>Back to Home</button>
                </div>
            </div>

            <footer className="help-footer">
                <div className="help-container">
                    <p>Questions? Call 1-844-505-2993</p>
                    <div className="footer-links-help">
                        <a href="#">Terms of Use</a>
                        <a href="#">Privacy</a>
                        <a href="#">Cookie Preferences</a>
                        <a href="#">Corporate Information</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HelpCenter;
