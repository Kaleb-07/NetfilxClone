import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import './ManageProfiles.css';

const ManageProfiles = () => {
    const navigate = useNavigate();
    const [currentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : { username: "User" };
    });

    const profiles = [
        { id: 1, name: currentUser.username, avatar: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" },
        { id: 2, name: "Kids", avatar: "https://occ-0-3934-3933.1.nflxso.net/dnm/api/v6/K6ndS2WiUm2STUunY19fN-4X6ks/AAAABXy6-U9Y-nL5U0Lue9Z1PloS8W5g3_Y6Z-V7Z7-V7Z7-V7Z7-V7Z7-V7Z7-V7Z7-V7Z7.png?r=abc" },
    ];

    return (
        <div className="manage-profiles">
            <div className="manage-profiles__container">
                <h1>Manage Profiles:</h1>
                <div className="profile-gate">
                    <ul className="profile-list">
                        {profiles.map(profile => (
                            <li key={profile.id} className="profile">
                                <div className="avatar-wrapper">
                                    <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
                                    <div className="edit-overlay">
                                        <EditIcon className="edit-icon" />
                                    </div>
                                </div>
                                <span className="profile-name">{profile.name}</span>
                            </li>
                        ))}
                        <li className="profile add-profile">
                            <div className="avatar-wrapper add-wrapper">
                                <div className="add-icon-circle">+</div>
                            </div>
                            <span className="profile-name">Add Profile</span>
                        </li>
                    </ul>
                </div>
                <button className="done-button" onClick={() => navigate('/home')}>Done</button>
            </div>
        </div>
    );
};

export default ManageProfiles;
