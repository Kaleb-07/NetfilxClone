import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import './AccountPage.css';

const AccountPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : { username: "User", email: "guest", phone: "+1 555-0123" };
    });

    const [profiles] = useState(() => {
        const savedProfiles = localStorage.getItem(`profiles_${currentUser.email}`);
        return savedProfiles ? JSON.parse(savedProfiles) : [];
    });

    const [modal, setModal] = useState({ show: false, type: "message", target: "", title: "", message: "", value: "" });

    const currentAvatar = profiles[0]?.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix";

    const handleSignOut = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const showMessageModal = (title, message) => {
        setModal({ show: true, type: "message", target: "", title, message, value: "" });
    };

    const openEditModal = (target, currentValue) => {
        setModal({
            show: true,
            type: "edit",
            target,
            title: `Update ${target}`,
            message: `Enter your new ${target.toLowerCase()} below.`,
            value: currentValue || ""
        });
    };

    // Deep Linking Effect
    useEffect(() => {
        if (location.state?.edit) {
            const target = location.state.edit;
            let currentValue = "";
            if (target === "Email") currentValue = currentUser.email;
            if (target === "Phone") currentValue = currentUser.phone;

            openEditModal(target, currentValue);

            // Clear state so it doesn't reopen on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state, currentUser.email, currentUser.phone]);

    const handleSave = () => {
        const { target, value } = modal;
        if (!value.trim()) {
            alert("Please enter a valid value.");
            return;
        }

        const updatedUser = { ...currentUser };

        if (target === "Email") {
            updatedUser.email = value.toLowerCase();
        } else if (target === "Phone") {
            updatedUser.phone = value;
        } else if (target === "Password") {
            // In a real app, this would be a password update logic
            // For the demo, we just show success
        }

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        setModal({ show: false, type: "message", target: "", title: "Success!", message: `${target} updated successfully!`, value: "" });
        setTimeout(() => setModal({ show: false, type: "message", target: "", title: "", message: "", value: "" }), 2000);
    };

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
                        <button className="cancel-button" onClick={() => showMessageModal("Cancel Membership", "Membership cancellation is simplified for this demo. Please contact support for real account changes.")}>Cancel Membership</button>
                    </div>
                    <div className="section-details">
                        <div className="detail-row">
                            <span className="email">{currentUser.email}</span>
                            <a href="#" onClick={(e) => { e.preventDefault(); openEditModal("Email", currentUser.email); }}>Change account email</a>
                        </div>
                        <div className="detail-row">
                            <span className="password">Password: ********</span>
                            <a href="#" onClick={(e) => { e.preventDefault(); openEditModal("Password", ""); }}>Change password</a>
                        </div>
                        <div className="detail-row">
                            <span className="phone">Phone: {currentUser.phone || "+1 555-0123"}</span>
                            <a href="#" onClick={(e) => { e.preventDefault(); openEditModal("Phone", currentUser.phone || "+1 555-0123"); }}>Change phone number</a>
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
                            <a href="#" onClick={(e) => { e.preventDefault(); showMessageModal("Change Plan", "Explore new plans and upgrade options coming in the next release!"); }}>Change plan</a>
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
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/manage-profiles'); }}>Manage</a>
                        </div>
                        <div className="detail-row">
                            <span>Sign out of all devices</span>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleSignOut(); }}>Sign out</a>
                        </div>
                    </div>
                </section>

                <hr className="section-divider" />

                <button className="back-home-btn" onClick={() => navigate('/home')}>Return to Netflix</button>
            </div>

            {modal.show && (
                <div className="modal-overlay">
                    <div className="modern-modal account-modal">
                        <h2>{modal.title}</h2>
                        <p>{modal.message}</p>

                        {modal.type === "edit" ? (
                            <div className="modal-edit-form">
                                <input
                                    type={modal.target === "Password" ? "password" : "text"}
                                    value={modal.value}
                                    onChange={(e) => setModal({ ...modal, value: e.target.value })}
                                    placeholder={`New ${modal.target}`}
                                    className="modal-input"
                                    autoFocus
                                />
                                <div className="modal-actions">
                                    <button className="save-btn" onClick={handleSave}>Save</button>
                                    <button className="cancel-link" onClick={() => setModal({ show: false, type: "message", target: "", title: "", message: "", value: "" })}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <button className="modal-close-btn" onClick={() => setModal({ show: false, type: "message", target: "", title: "", message: "", value: "" })}>Got it</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountPage;
