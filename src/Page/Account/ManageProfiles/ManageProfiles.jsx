import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import './ManageProfiles.css';

const ManageProfiles = () => {
    const navigate = useNavigate();
    const [currentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : { username: "User", email: "guest" };
    });

    const [profiles, setProfiles] = useState(() => {
        const savedProfiles = localStorage.getItem(`profiles_${currentUser.email}`);
        if (savedProfiles) return JSON.parse(savedProfiles);

        // Default profiles if none of exists
        return [
            { id: 1, name: currentUser.username, avatar: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png", isMain: true },
            { id: 2, name: "Kids", avatar: "https://occ-0-3934-3933.1.nflxso.net/dnm/api/v6/K6ndS2WiUm2STUunY19fN-4X6ks/AAAABXy6-U9Y-nL5U0Lue9Z1PloS8W5g3_Y6Z-V7Z7-V7Z7-V7Z7-V7Z7-V7Z7-V7Z7-V7Z7.png?r=abc" },
        ];
    });

    const [editingProfile, setEditingProfile] = useState(null);
    const [editName, setEditName] = useState('');
    const [editAvatar, setEditAvatar] = useState('');

    const avatarOptions = [
        "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
        "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
        "https://api.dicebear.com/7.x/adventurer/svg?seed=Milo",
        "https://api.dicebear.com/7.x/adventurer/svg?seed=Sasha",
        "https://api.dicebear.com/7.x/adventurer/svg?seed=Jasper"
    ];

    const handleEditClick = (profile) => {
        setEditingProfile(profile);
        setEditName(profile.name);
        setEditAvatar(profile.avatar);
    };

    const handleSave = () => {
        const updatedProfiles = profiles.map(p =>
            p.id === editingProfile.id ? { ...p, name: editName, avatar: editAvatar } : p
        );

        // If main profile name changed, update also the currentUser too
        if (editingProfile.isMain) {
            const newCurrentUser = { ...currentUser, username: editName };
            localStorage.setItem('currentUser', JSON.stringify(newCurrentUser));

            // Also update registeredUsers map or address(location)
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
            registeredUsers[currentUser.email] = editName;
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        }

        setProfiles(updatedProfiles);
        localStorage.setItem(`profiles_${currentUser.email}`, JSON.stringify(updatedProfiles));
        setEditingProfile(null);
    };

    const handleDelete = () => {
        if (editingProfile.isMain) {
            alert("Cannot delete the main profile!");
            return;
        }
        const updatedProfiles = profiles.filter(p => p.id !== editingProfile.id);
        setProfiles(updatedProfiles);
        localStorage.setItem(`profiles_${currentUser.email}`, JSON.stringify(updatedProfiles));
        setEditingProfile(null);
    };

    const handleAddProfile = () => {
        const newProfile = {
            id: Date.now(),
            name: `New Profile`,
            avatar: avatarOptions[0]
        };
        const updatedProfiles = [...profiles, newProfile];
        setProfiles(updatedProfiles);
        localStorage.setItem(`profiles_${currentUser.email}`, JSON.stringify(updatedProfiles));
    };

    if (editingProfile) {
        return (
            <div className="manage-profiles edit-mode">
                <div className="edit-profile-container">
                    <h1>Edit Profile</h1>
                    <div className="edit-profile-content">
                        <div className="edit-avatar-section">
                            <img src={editAvatar} alt="Current Avatar" className="current-edit-avatar" />
                            <div className="avatar-options">
                                {avatarOptions.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Option ${index}`}
                                        className={`avatar-option ${editAvatar === url ? 'selected' : ''}`}
                                        onClick={() => setEditAvatar(url)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="edit-details-section">
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Enter name"
                            />
                            <div className="edit-actions">
                                <button className="save-btn" onClick={handleSave}>Save</button>
                                <button className="cancel-btn" onClick={() => setEditingProfile(null)}>Cancel</button>
                                {!editingProfile.isMain && <button className="delete-btn" onClick={handleDelete}>Delete Profile</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="manage-profiles">
            <div className="manage-profiles__container">
                <h1>Manage Profiles:</h1>
                <div className="profile-gate">
                    <ul className="profile-list">
                        {profiles.map(profile => (
                            <li key={profile.id} className="profile" onClick={() => handleEditClick(profile)}>
                                <div className="avatar-wrapper">
                                    <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
                                    <div className="edit-overlay">
                                        <EditIcon className="edit-icon" />
                                    </div>
                                </div>
                                <span className="profile-name">{profile.name}</span>
                            </li>
                        ))}
                        <li className="profile add-profile" onClick={handleAddProfile}>
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
