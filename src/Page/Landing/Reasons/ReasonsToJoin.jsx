import React from 'react';
import './ReasonsToJoin.css';
import TvIcon from '@mui/icons-material/Tv';
import DownloadIcon from '@mui/icons-material/Download';
import DevicesIcon from '@mui/icons-material/Devices';
import ChildCareIcon from '@mui/icons-material/ChildCare';

const ReasonsToJoin = () => {
    const reasons = [
        {
            title: "Enjoy on your TV",
            description: "Watch on Smart TVs, Playstation, Xbox, Apple TV, Chromecast, Blu-ray players, and more.",
            icon: <TvIcon style={{ fontSize: 40, color: '#fff' }} />
        },
        {
            title: "Download your shows to watch offline",
            description: "Save your favorites easily and always have something to watch.",
            icon: <DownloadIcon style={{ fontSize: 40, color: '#fff' }} />
        },
        {
            title: "Watch everywhere",
            description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
            icon: <DevicesIcon style={{ fontSize: 40, color: '#fff' }} />
        },
        {
            title: "Create profiles for kids",
            description: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
            icon: <ChildCareIcon style={{ fontSize: 40, color: '#fff' }} />
        }
    ];

    return (
        <div className="reasons-section">
            <h2>More Reasons to Join</h2>
            <div className="reasons-grid">
                {reasons.map((reason, index) => (
                    <div key={index} className="reason-card">
                        <h3>{reason.title}</h3>
                        <p>{reason.description}</p>
                        <div className="reason-icon">
                            {reason.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReasonsToJoin;
