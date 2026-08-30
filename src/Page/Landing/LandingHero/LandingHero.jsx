import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../LandingHeader/LandingHeader';
import './LandingHero.css';
import { useLanguage } from '../../../utils/LanguageContext';

const LandingHero = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleGetStarted = (e) => {
        e.preventDefault();

        const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];
        const isRegistered = registeredEmails.includes(email.toLowerCase());

        // If email is already registered go to homes page
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
                <h1>{t('hero.title').split('<br />').map((text, i) => (
                    <React.Fragment key={i}>
                        {text}
                        {i < t('hero.title').split('<br />').length - 1 && <br />}
                    </React.Fragment>
                ))}</h1>
                <p className="hero-subtitle">{t('hero.subtitle')}</p>
                <p className="hero-cta">{t('hero.cta')}</p>
                <form className="hero-form" onSubmit={handleGetStarted}>
                    <input
                        type="email"
                        placeholder={t('hero.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">
                        {t('hero.getStarted')}
                        <span className="button-arrow">›</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LandingHero;
