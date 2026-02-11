import React from 'react';
import { useNavigate } from 'react-router-dom';
import Netflix_logo from "../../../assets/images/Netflix_logo.svg";
import './LandingHeader.css';

const LandingHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="landing-header">
            <div className="landing-header__logo">
                <img src={Netflix_logo} alt="Netflix Logo" />
            </div>
            <div className="landing-header__actions">
                <button className="signin-button" onClick={() => navigate('/login')}>Sign In</button>
            </div>
        </header>
    );
};

export default LandingHeader;
