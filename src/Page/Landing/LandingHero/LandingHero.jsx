import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../LandingHeader/LandingHeader';
import './LandingHero.css';

const LandingHero = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleGetStarted = (e) => {
        e.preventDefault();

        const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];
        const isRegistered = registeredEmails.includes(email.toLowerCase());

        // If email is already registered, go to home
        if (isRegistered) {
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
            const username = registeredUsers[email.toLowerCase()] || "User";

            localStorage.setItem('currentUser', JSON.stringify({
                username: username,
                email: email.toLowerCase()
            }));

            navigate('/home');
        }
        // Mock logic: If email includes 'new', go to signup
        else if (email.toLowerCase().includes('new')) {
            navigate('/signup', { state: { email } });
        }
        // Default to signup for anything else that feels like a new user 
        // but for now let's stick to the user's "new" keyword or just go to signup if not found
        else {
            navigate('/signup', { state: { email } });
        }
    };

    return (
        <div className="landing-hero">
            <LandingHeader />
            <div className="landing-hero__background">
                <div className="landing-hero__overlay"></div>
                <img
                    src="https://thurrott-assets.nyc3.digitaloceanspaces.com/web/wp-content/uploads/sites/2/2022/01/14172326/netflix.jpg"
                    alt="Background"
                    className="hero-bg-img"
                />
            </div>
            <div className="landing-hero__content">
                <h1>Unlimited movies, TV <br /> shows, and more</h1>
                <p className="hero-subtitle">Starts at US$6.99. Cancel anytime.</p>
                <p className="hero-cta">Ready to watch? Enter your email to create or restart your membership.</p>
                <form className="hero-form" onSubmit={handleGetStarted}>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">
                        Get Started
                        <span className="button-arrow">›</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LandingHero;
