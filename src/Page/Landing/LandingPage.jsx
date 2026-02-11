import React from 'react';
import LandingHero from './LandingHero/LandingHero';
import TrendingSection from './Trending/TrendingSection';
import ReasonsToJoin from './Reasons/ReasonsToJoin';
import FAQSection from './FAQ/FAQSection';
import LandingFooter from './Footer/LandingFooter';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <LandingHero />
            <div className="curve-container">
                <div className="default-ltr-iqcdef-cache-1f97ztc"></div>
            </div>
            <TrendingSection title="Trending Now" />
            <ReasonsToJoin />
            <FAQSection />
            <LandingFooter />
        </div>
    );
};

export default LandingPage;
