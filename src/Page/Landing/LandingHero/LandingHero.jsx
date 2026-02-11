import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../LandingHeader/LandingHeader';
import './LandingHero.css';

const LandingHero = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleGetStarted = (e) => {
        e.preventDefault();
        // For now, just navigate to home
        navigate('/home');
    };

    return (
        <div className="landing-hero">
            <LandingHeader />
            <div className="landing-hero__background">
                <div className="landing-hero__overlay"></div>
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c0-6d57-4f31-81d5-aa6af8393b33/05df4f89-8d69-45e3-8580-0a2a7cc3d685/US-en-20241209-TRIFECTA-perspective_2674e2a8-175f-42a9-9831-4822606ed057_large.jpg"
                    alt="Background"
                    className="hero-bg-img"
                />
            </div>
            <div className="landing-hero__content">
                <h1>Unlimited movies, TV shows, and more</h1>
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
