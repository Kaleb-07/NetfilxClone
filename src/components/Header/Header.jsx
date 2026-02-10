import React, { useEffect, useState } from 'react';
import './Header.css';
import Netflix_logo from "../../assets/images/Netflix_logo.svg";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Header({ setSearchQuery, setSelectedCategory, setSelectedGenre, selectedCategory }) {
  const [show, setShow] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [profileDropdownActive, setProfileDropdownActive] = useState(false);
  const [movieDropdownActive, setMovieDropdownActive] = useState(false);

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
            <li className={selectedCategory === "Home" ? "active" : ""} onClick={() => handleCategoryClick("Home")}>Home</li>
            <li className={selectedCategory === "TV Shows" ? "active" : ""} onClick={() => handleCategoryClick("TV Shows")}>TV Shows</li>
            <li
              className={`header__navItem ${selectedCategory === "Movies" ? "active" : ""}`}
              onMouseEnter={() => setMovieDropdownActive(true)}
              onMouseLeave={() => setMovieDropdownActive(false)}
            >
              <span onClick={() => handleCategoryClick("Movies")}>Movies</span>
              <ArrowDropDownIcon className="header__navArrow" />
              {movieDropdownActive && (
                <div className="header__movieDropdown">
                  <span className="header__dropdownCaret"></span>
                  <ul className="header__genreList">
                    <li onClick={() => handleGenreClick(28, "Action")}>Action</li>
                    <li onClick={() => handleGenreClick(35, "Comedy")}>Comedy</li>
                    <li onClick={() => handleGenreClick(27, "Horror")}>Horror</li>
                    <li onClick={() => handleGenreClick(10749, "Romance")}>Romance</li>
                    <li onClick={() => handleGenreClick(99, "Documentaries")}>Documentaries</li>
                  </ul>
                </div>
              )}
            </li>
            <li className={selectedCategory === "New & Popular" ? "active" : ""} onClick={() => handleCategoryClick("New & Popular")}>New & Popular</li>
            <li>My List</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <div className='header_right'>
          <div className={`header__search ${searchActive && "active"}`}>
            <SearchIcon className="header__searchIcon" onClick={() => setSearchActive(!searchActive)} />
            <input
              type="text"
              placeholder="Titles, people, genres"
              value={localSearchQuery}
              onChange={handleSearchChange}
              onFocus={() => setSearchActive(true)}
              onBlur={() => !localSearchQuery && setSearchActive(false)}
            />
          </div>
          <p className="header__kids">Kids</p>
          <NotificationsIcon className="header__icon" />
          <div
            className="header__profileContainer"
            onMouseEnter={() => setProfileDropdownActive(true)}
            onMouseLeave={() => setProfileDropdownActive(false)}
          >
            <AccountBoxIcon className="header__avatar" />
            <ArrowDropDownIcon className={`header__dropdownArrow ${profileDropdownActive && "active"}`} />

            {profileDropdownActive && (
              <div className="header__dropdown">
                <span className="header__dropdownCaret"></span>
                <ul className="header__dropdownList">
                  <li className="header__dropdownItem">
                    <AccountBoxIcon /> <span>User 1</span>
                  </li>
                  <li className="header__dropdownItem">
                    <AccountBoxIcon /> <span>User 2</span>
                  </li>
                  <li className="header__dropdownItem">
                    <span>Manage Profiles</span>
                  </li>
                </ul>
                <ul className="header__dropdownSecondary">
                  <li>Account</li>
                  <li>Help Center</li>
                  <li>Sign out of Netflix</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
