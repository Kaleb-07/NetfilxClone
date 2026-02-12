import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Netflix_logo from "../../assets/images/Netflix_logo.svg";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useLanguage } from '../../utils/LanguageContext';

function Header({ setSearchQuery, setSelectedCategory, setSelectedGenre, selectedCategory, onProfileSwitch }) {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [profileDropdownActive, setProfileDropdownActive] = useState(false);
  const [movieDropdownActive, setMovieDropdownActive] = useState(false);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : { username: "User", email: "guest", profileId: 1 };
  });

  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem(`profiles_${currentUser.email}`);
    if (savedProfiles) return JSON.parse(savedProfiles);

    return [
      { id: 1, name: currentUser.username, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix" },
      { id: 2, name: "Kids", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Milo" },
    ];
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);

      const savedProfiles = localStorage.getItem(`profiles_${user.email}`);
      if (savedProfiles) {
        setProfiles(JSON.parse(savedProfiles));
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleProfileSwitch = (selectedProfile) => {
    if (selectedProfile.id === profiles[0].id) return;

    const otherProfiles = profiles.filter(p => p.id !== selectedProfile.id);
    const newProfiles = [selectedProfile, ...otherProfiles];

    const updatedUser = {
      username: selectedProfile.name,
      email: currentUser.email,
      profileId: selectedProfile.id
    };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem(`profiles_${currentUser.email}`, JSON.stringify(newProfiles));

    setCurrentUser(updatedUser);
    setProfiles(newProfiles);
    setProfileDropdownActive(false);

    if (onProfileSwitch) {
      onProfileSwitch(selectedProfile.id);
    }
  };

  const handleMenuClick = (item) => {
    switch (item) {
      case 'Manage Profiles':
        navigate('/manage-profiles');
        break;
      case 'Transfer Profile':
        navigate('/transfer-profile');
        break;
      case 'Account':
        navigate('/account');
        break;
      case 'Help Center':
        navigate('/help');
        break;
      default:
        break;
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    setSearchQuery(query);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedGenre(null);
  };

  const handleGenreClick = (genreId, genreName) => {
    setSelectedCategory("Movies");
    setSelectedGenre({ id: genreId, name: genreName });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`header_outer_container ${show && "header_black"}`}>
      <div className='header_container'>
        <div className='header-left'>
          <img
            className="header__logo"
            src={Netflix_logo}
            alt="netflix logo"
            onClick={() => handleCategoryClick("Home")}
          />
          <ul>
            <li className={selectedCategory === "Home" ? "active" : ""} onClick={() => handleCategoryClick("Home")}>{t('header.home')}</li>
            <li className={selectedCategory === "TV Shows" ? "active" : ""} onClick={() => handleCategoryClick("TV Shows")}>{t('header.tvShows')}</li>
            <li
              className={`header__navItem ${selectedCategory === "Movies" ? "active" : ""}`}
              onMouseEnter={() => setMovieDropdownActive(true)}
              onMouseLeave={() => setMovieDropdownActive(false)}
              onClick={() => handleCategoryClick("Movies")}
            >
              <span>{t('header.movies')}</span>
              <ArrowDropDownIcon className="header__navArrow" />
              {movieDropdownActive && (
                <div className="header__movieDropdown">
                  <span className="header__dropdownCaret"></span>
                  <ul className="header__genreList">
                    <li onClick={() => handleGenreClick(28, "Action")}>{t('genres.action')}</li>
                    <li onClick={() => handleGenreClick(35, "Comedy")}>{t('genres.comedy')}</li>
                    <li onClick={() => handleGenreClick(27, "Horror")}>{t('genres.horror')}</li>
                    <li onClick={() => handleGenreClick(10749, "Romance")}>{t('genres.romance')}</li>
                    <li onClick={() => handleGenreClick(99, "Documentaries")}>{t('genres.documentaries')}</li>
                  </ul>
                </div>
              )}
            </li>
            <li className={selectedCategory === "New & Popular" ? "active" : ""} onClick={() => handleCategoryClick("New & Popular")}>{t('header.newAndPopular')}</li>
            <li className={selectedCategory === "My List" ? "active" : ""} onClick={() => handleCategoryClick("My List")}>{t('header.myList')}</li>
            <li>{t('header.browseByLanguages')}</li>
          </ul>
        </div>
        <div className='header_right'>
          <div className={`header__search ${searchActive && "active"}`}>
            <SearchIcon className="header__searchIcon" onClick={() => setSearchActive(!searchActive)} />
            <input
              type="text"
              placeholder={t('header.searchPlaceholder')}
              value={localSearchQuery}
              onChange={handleSearchChange}
              onFocus={() => setSearchActive(true)}
              onBlur={() => !localSearchQuery && setSearchActive(false)}
            />
          </div>
          <p className="header__kids">{t('header.kids')}</p>
          <NotificationsIcon className="header__icon" />
          <div
            className="header__profileContainer"
            onMouseEnter={() => setProfileDropdownActive(true)}
            onMouseLeave={() => setProfileDropdownActive(false)}
          >
            <img
              className="header__avatar"
              src={profiles[0]?.avatar || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
              alt="avatar"
              onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" }}
            />
            <ArrowDropDownIcon className={`header__dropdownArrow ${profileDropdownActive && "active"}`} />

            <div className="header__dropdown">
              <span className="header__dropdownCaret"></span>
              <ul className="header__dropdownList">
                {profiles.map((profile, index) => (
                  <li
                    key={profile.id}
                    className="header__dropdownItem"
                    onClick={() => index !== 0 && handleProfileSwitch(profile)}
                    style={{ cursor: index === 0 ? 'default' : 'pointer' }}
                  >
                    <img src={profile.avatar} alt={profile.name} className="header__dropdownAvatar" />
                    <span style={{ fontWeight: index === 0 ? '700' : '400' }}>{profile.name}</span>
                  </li>
                ))}
                <li className="header__dropdownItem" onClick={() => handleMenuClick('Manage Profiles')}>
                  <span>{t('header.manageProfiles')}</span>
                </li>
                <li className="header__dropdownItem" onClick={() => handleMenuClick('Transfer Profile')}>
                  <span>{t('header.transferProfile')}</span>
                </li>
              </ul>
              <ul className="header__dropdownSecondary">
                <li onClick={() => handleMenuClick('Account')}>{t('header.account')}</li>
                <li onClick={() => handleMenuClick('Help Center')}>{t('header.helpCenter')}</li>
                <li onClick={handleSignOut}>{t('header.signOut')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header
