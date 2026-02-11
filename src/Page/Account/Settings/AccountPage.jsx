import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import './AccountPage.css';

const AccountPage = () => {
    const navigate = useNavigate();
    const [currentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : { username: "User", email: "guest" };
    });

    const [profiles] = useState(() => {
        const savedProfiles = localStorage.getItem(`profiles_${currentUser.email}`);
        return savedProfiles ? JSON.parse(savedProfiles) : [];
    });

    const currentAvatar = profiles[0]?.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix";

    return (
        <div className="account-page">
            <div className="account-navbar">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    alt="Netflix"
                    className="account-logo"
                    onClick={() => navigate('/home')}
                />
                <div className="account-nav-right">
                    <img
                        src={currentAvatar}
                        alt="Avatar"
                        className="nav-avatar"
                        onClick={() => navigate('/home')}
                        onError={(e) => { e.target.src = "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix" }}
                    />
                </div>
            </div>

            <div className="account-content">
                <h1>Account</h1>

                <section className="account-section">
                    <div className="section-title">
                        <h2>MEMBERSHIP & BILLING</h2>
                        <button className="cancel-button">Cancel Membership</button>
                    </div>
                    <div className="section-details">
                        <div className="detail-row">
                            <span className="email">{currentUser.email}</span>
                            <a href="#">Change account email</a>
                        </div>
                        <div className="detail-row">
                            <span className="password">Password: ********</span>
                            <a href="#">Change password</a>
                        </div>
                        <div className="detail-row">
                            <span className="phone">Phone: +1 555-0123</span>
                            <a href="#">Change phone number</a>
                        </div>
                    </div>
                </section>

                <hr className="section-divider" />

                <section className="account-section">
                    <div className="section-title">
                        <h2>PLAN DETAILS</h2>
                    </div>
                    <div className="section-details">
                        <div className="detail-row">
                            <span className="plan-name">Premium <span className="ultra-hd">Ultra HD</span></span>
                            <a href="#">Change plan</a>
                        </div>
                    </div>
                </section>

                <hr className="section-divider" />

                <section className="account-section">
                    <div className="section-title">
                        <h2>SECURITY & PRIVACY</h2>
                    </div>
                    <div className="section-details">
                        <div className="detail-row">
                            <span>Manage access and devices</span>
                            <a href="#">Manage</a>
                        </div>
                        <div className="detail-row">
                            <span>Sign out of all devices</span>
                            <a href="#">Sign out</a>
                        </div>
                    </div>
                </section>

                <hr className="section-divider" />

                <button className="back-home-btn" onClick={() => navigate('/home')}>Return to Netflix</button>
            </div>
        </div>
    );
};

export default AccountPage;
