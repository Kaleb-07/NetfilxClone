import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Netflix_logo from "../../../assets/images/Netflix_logo.svg";
import './SignUpPage.css';

const SignUpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialEmail = location.state?.email || '';

    const [formData, setFormData] = useState({
        username: '',
        email: initialEmail,
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Persist the user datas
        const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};

        if (!registeredEmails.includes(formData.email.toLowerCase())) {
            registeredEmails.push(formData.email.toLowerCase());
            localStorage.setItem('registeredEmails', JSON.stringify(registeredEmails));
        }

        // Store full users name and
        registeredUsers[formData.email.toLowerCase()] = {
            username: formData.username,
            password: formData.password
        };
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        // Set as current user data
        localStorage.setItem('currentUser', JSON.stringify({
            username: formData.username,
            email: formData.email.toLowerCase()
        }));

        console.log("User Signed Up:", formData);
        // Navigate to home after registration
        navigate('/home');
    };

    return (
        <div className="signup-page">
            <header className="signup-header">
                <img src={Netflix_logo} alt="Netflix Logo" onClick={() => navigate('/')} />
                <button className="signup-header__signin" onClick={() => navigate('/login')}>Sign In</button>
            </header>

            <div className="signup-container">
                <div className="signup-box">
                    <p className="step-indicator">STEP <b>1</b> OF <b>3</b></p>
                    <h1>Create a password to start your membership</h1>
                    <p>Just a few more steps and you're done! We hate paperwork, too.</p>

                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="input-group">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Add a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="signup-submit">Next</button>
                    </form>
                </div>
            </div>

            <footer className="signup-footer">
                <div className="footer-content">
                    <p>Questions? Call 1-844-505-2993</p>
                    <ul>
                        <li>FAQ</li>
                        <li>Help Center</li>
                        <li>Netflix Shop</li>
                        <li>Terms of Use</li>
                        <li>Privacy</li>
                        <li>Cookie Preferences</li>
                        <li>Corporate Information</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default SignUpPage;
