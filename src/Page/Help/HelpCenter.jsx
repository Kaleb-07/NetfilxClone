import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Netflix_logo from "../../assets/images/Netflix_logo.svg";
import './HelpCenter.css';

const HelpCenter = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [modal, setModal] = React.useState({ show: false, title: "", message: "" });

    const trendingTopics = [
        { title: "How to sign up for Netflix", video: "https://youtu.be/GXPpytVRN9w?si=M8eLrPxMrSexJ1un" },
        { title: "Plans and Pricing", video: "https://youtu.be/Ptr5SahPJls?si=6jtd7T1S9V-UzKb_" },
        { title: "Can't sign in to Netflix", video: "https://youtu.be/6TJ5ktQ9DUY?si=kAVu-KXBzrQGnhRG" },
        { title: "How to watch Netflix on your TV", video: "https://youtu.be/3TyKalYQefE?si=YwvdZeruZK-enspp" }
    ];

    const quickLinks = [
        { title: "Reset Password", path: "/account", edit: "Password" },
        { title: "Update Email", path: "/account", edit: "Email" },
        { title: "Get Help Signing In", path: "/" },
        { title: "Update Payment Method", path: "/account", edit: "Phone" } // For demo, let's map payment help to phone/plan
    ];

    const filteredTrending = trendingTopics.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredQuickLinks = quickLinks.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLinkClick = (e, link) => {
        e.preventDefault();
        if (link.video) {
            window.open(link.video, '_blank');
        } else if (link.path) {
            navigate(link.path, { state: { edit: link.edit } });
        } else {
            setModal({ show: true, title: "Coming Soon", message: "This help article is currently being prepared to provide you with the best support experience." });
        }
    };

    return (
        <div className="help-center">
            <header className="help-header">
                <div className="help-header__left">
                    <img
                        src={Netflix_logo}
                        alt="Netflix"
                        className="help-logo"
                        onClick={() => navigate('/home')}
                    />
                    <span className="help-divider">|</span>
                    <span className="help-title" onClick={() => navigate('/help')}>Help Center</span>
                </div>
                <div className="help-header__right">
                    <button className="join-netflix" onClick={() => navigate('/')}>Join Netflix</button>
                    <button className="sign-in-help" onClick={() => navigate('/home')}>Sign In</button>
                </div>
            </header>

            <div className="help-hero">
                <div className="help-hero__content">
                    <h1>How can we help?</h1>
                    <div className="help-search-bar">
                        <SearchIcon className="search-icon-help" />
                        <input
                            type="text"
                            placeholder="What do you need help with?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="help-body">
                <div className="help-container">
                    <section className="trending-topics">
                        <div className="trending-header">
                            <span className="trending-icon">📈</span>
                            <h2>Trending Topics</h2>
                        </div>
                        <ul className="help-links">
                            {filteredTrending.length > 0 ? filteredTrending.map((topic, index) => (
                                <li key={index}><a href="#" onClick={(e) => handleLinkClick(e, topic)}>{topic.title}</a></li>
                            )) : <p className="no-results">No trending topics found.</p>}
                        </ul>
                    </section>

                    <div className="help-grid">
                        <div className="help-card" onClick={() => setModal({ show: true, title: "Getting Started", message: "Comprehensive guide for new users is coming soon!" })}>
                            <h3>Getting Started</h3>
                            <p>Everything you need to know to start watching.</p>
                        </div>
                        <div className="help-card" onClick={() => navigate('/account')}>
                            <h3>Manage My Account</h3>
                            <p>How to change your email, password, or plan.</p>
                        </div>
                        <div className="help-card" onClick={() => setModal({ show: true, title: "Watching Netflix", message: "Troubleshooting guides are in the works!" })}>
                            <h3>Watching Netflix</h3>
                            <p>Troubleshoot issues with video quality or devices.</p>
                        </div>
                        <div className="help-card">
                            <h3>Quick Links</h3>
                            <ul className="quick-links-list">
                                {filteredQuickLinks.length > 0 ? filteredQuickLinks.map((link, index) => (
                                    <li key={index}><a href="#" onClick={(e) => handleLinkClick(e, link)}>{link.title}</a></li>
                                )) : <li className="no-results">No quick links found.</li>}
                            </ul>
                        </div>
                    </div>

                    <button className="back-to-home" onClick={() => navigate('/home')}>Back to Home</button>
                </div>
            </div>

            <footer className="help-footer">
                <div className="help-container">
                    <p>Questions? Call 1-844-505-2993</p>
                    <div className="footer-links-help">
                        <a href="#" onClick={(e) => e.preventDefault()}>Terms of Use</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>Cookie Preferences</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>Corporate Information</a>
                    </div>
                </div>
            </footer>

            {modal.show && (
                <div className="modal-overlay">
                    <div className="modern-modal help-modal">
                        <h2>{modal.title}</h2>
                        <p>{modal.message}</p>
                        <button className="modal-close-btn" onClick={() => setModal({ show: false, title: "", message: "" })}>Got it</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpCenter;
