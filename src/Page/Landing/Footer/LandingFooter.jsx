import React from 'react';
import { Link } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import './LandingFooter.css';

const LandingFooter = () => {
    return (
        <footer className="landing-footer">
            <div className="landing-footer__container">
                <p className="footer-top">
                    Questions? Call <a href="tel:1-844-505-2993">1-844-505-2993</a>
                </p>
                <div className="footer-links">
                    <ul>
                        <li><Link to="/">FAQ</Link></li>
                        <li><a href="#">Investor Relations</a></li>
                        <li><a href="#">Buy Gift Cards</a></li>
                        <li><a href="#">Cookie Preferences</a></li>
                        <li><a href="#">Legal Notices</a></li>
                    </ul>
                    <ul>
                        <li><Link to="/help">Help Center</Link></li>
                        <li><a href="#">Jobs</a></li>
                        <li><a href="#">Ways to Watch</a></li>
                        <li><a href="#">Corporate Information</a></li>
                        <li><a href="#">Only on Netflix</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">Account</a></li>
                        <li><a href="#">Netflix Shop</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Ad Choices</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">Media Center</a></li>
                        <li><a href="#">Redeem Gift Cards</a></li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Speed Test</a></li>
                    </ul>
                </div>
                <div className="footer-lang">
                    <div className="lang-selector">
                        <LanguageIcon className="globe-icon" />
                        <select>
                            <option>English</option>
                            <option>Español</option>
                        </select>
                    </div>
                </div>
                <p className="footer-bottom">Netflix United States</p>
            </div>
        </footer>
    );
};

export default LandingFooter;
