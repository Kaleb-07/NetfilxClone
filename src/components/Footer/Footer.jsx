import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';

function Footer() {
  const [showServiceCode, setShowServiceCode] = useState(false);
  const serviceCode = "501-143";

  return (
    <footer className="footer_container">
      <div className="footer_social">
        <a href="https://www.facebook.com/netflix" target="_blank" rel="noreferrer"><FacebookIcon /></a>
        <a href="https://www.instagram.com/netflix" target="_blank" rel="noreferrer"><InstagramIcon /></a>
        <a href="https://twitter.com/netflix" target="_blank" rel="noreferrer"><TwitterIcon /></a>
        <a href="https://www.youtube.com/user/NewOnNetflix" target="_blank" rel="noreferrer"><YouTubeIcon /></a>
      </div>

      <div className="footer_links">
        <div className="footer_column">
          <Link to="#">Audio Description</Link>
          <Link to="#">Investor Relations</Link>
          <Link to="#">Legal Notices</Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); setShowServiceCode(!showServiceCode); }}>
            Service Code
          </Link>
        </div>
        <div className="footer_column">
          <Link to="/help">Help Center</Link>
          <Link to="#">Jobs</Link>
          <Link to="#">Cookie Preferences</Link>
        </div>
        <div className="footer_column">
          <Link to="#">Gift Cards</Link>
          <Link to="#">Terms of Use</Link>
          <Link to="#">Corporate Information</Link>
        </div>
        <div className="footer_column">
          <Link to="#">Media Center</Link>
          <Link to="#">Privacy</Link>
          <Link to="#">Contact Us</Link>
        </div>
      </div>

      <div className="footer_service">
        <div className="lang-selector">
          <LanguageIcon className="globe-icon" />
          <select>
            <option>English</option>
            <option>Español</option>
          </select>
        </div>
        <button className="service_code_btn" onClick={() => setShowServiceCode(!showServiceCode)}>
          {showServiceCode ? serviceCode : "Service Code"}
        </button>
      </div>

      <div className="footer_copy">
        © 1997-2024 Netflix, Inc.
      </div>
    </footer>
  );
}

export default Footer;
