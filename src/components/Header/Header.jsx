import React, { useEffect, useState } from 'react';
import './Header.css';
import Netflix_logo from "../../assets/images/Netflix_logo.svg";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Header({ setSearchQuery }) {
  const [show, setShow] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    setSearchQuery(query);
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
          {/* Right nav*/}
          <ul>
            <li><img src={Netflix_logo} alt="netflix logo" /></li>
            <li>Home</li>
            <li>TvShows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>MyList</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <div className='header_right'>
          {/* Left nav */}
          <ul>
            <li>
              <div className={`header__search ${searchActive && "active"}`}>
                <SearchIcon onClick={() => setSearchActive(!searchActive)} />
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                  onBlur={() => !localSearchQuery && setSearchActive(false)}
                />
              </div>
            </li>
            <li><NotificationsIcon /></li>
            <li><AccountBoxIcon /></li>
            <li><ArrowDropDownIcon /></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
