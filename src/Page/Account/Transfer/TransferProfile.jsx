import React from 'react';
import { useNavigate } from 'react-router-dom';
import Netflix_logo from "../../../assets/images/Netflix_logo.svg";
import './TransferProfile.css';

const TransferProfile = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);

    const handleContinue = () => {
        setShowModal(true);
    };

    return (
        <div className="transfer-page">
            <header className="transfer-header">
                <img src={Netflix_logo} alt="Netflix" onClick={() => navigate('/home')} className="transfer-logo" />
                <button className="exit-btn" onClick={() => navigate('/home')}>Finish Later</button>
            </header>

            <div className="transfer-content">
                <div className="transfer-box">
                    <div className="transfer-icon-animation">
                        <div className="icon-circle">
                            <span className="arrow-icon">➜</span>
                        </div>
                    </div>
                    <h1>Transfer Profile</h1>
                    <p>Now it's easier to transfer a profile from this account to a brand new membership.</p>

                    <ul className="transfer-benefits">
                        <li>
                            <span className="check">✓</span>
                            Keep your recommendations, watch history, My List, and more
                        </li>
                        <li>
                            <span className="check">✓</span>
                            Transferred profiles stay on this account as well
                        </li>
                        <li>
                            <span className="check">✓</span>
                            Transfer to a new account that you pay for
                        </li>
                    </ul>

                    <button className="continue-btn" onClick={handleContinue}>Continue</button>
                    <p className="privacy-note">Your profile information will be used to move this profile. <a href="#">Learn more.</a></p>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modern-modal">
                        <h2>Coming Soon!</h2>
                        <p>The Profile Transfer feature is currently under development to ensure a seamless experience.</p>
                        <button className="modal-close-btn" onClick={() => setShowModal(false)}>Got it</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransferProfile;
