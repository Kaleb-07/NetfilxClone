import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Netflix_logo from "../../../assets/images/Netflix_logo.svg";
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
        const user = registeredUsers[email.toLowerCase()];

        if (user && user.password === password) {
            localStorage.setItem('currentUser', JSON.stringify({
                username: user.username,
                email: email.toLowerCase()
            }));
            navigate('/home');
        } else {
            setError('Incorrect email or password. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <header className="login-header">
                <img
                    src={Netflix_logo}
                    alt="Netflix Logo"
                    className="login-logo"
                    onClick={() => navigate('/')}
                />
            </header>

            <div className="login-container">
                <div className="login-box">
                    <h1>Sign In</h1>
                    {error && <div className="login-error-message">{error}</div>}
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email or mobile number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Sign In</button>
                    </form>

                    <div className="login-extras">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <p>Need help?</p>
                    </div>

                    <div className="login-signup-now">
                        <p>New to Netflix? <Link to="/signup">Sign up now</Link>.</p>
                    </div>
                </div>
            </div>

            <footer className="login-footer">
                <div className="footer-content">
                    <p>Questions? Call 1-844-505-2993</p>
                    <ul>
                        <li>FAQ</li>
                        <li>Help Center</li>
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

export default LoginPage;
