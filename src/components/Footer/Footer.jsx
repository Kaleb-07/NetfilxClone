import React from "react";
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <div className="footer_container">
      {/* Social icons */}
      <div className="footer_social">
        <FacebookIcon />
        <InstagramIcon />
        <YouTubeIcon />
      </div>

      {/* Links */}
      <div className="footer_links">
        <div className="footer_column">
          <p>Audio Description</p>
          <p>Investor Relations</p>
          <p>Legal Notice</p>
          <p>Service Code</p>
        </div>
        <div className="footer_column">
          <p>Help Center</p>
          <p>Jobs</p>
          <p>Cookie Preferences</p>
        </div>
        <div className="footer_column">
          <p>Gift Cards</p>
          <p>Terms of Use</p>
          <p>Corporate Information</p>
        </div>
        <div className="footer_column">
          <p>Media Center</p>
          <p>Privacy</p>
          <p>Contact Us</p>
        </div>
      </div>

      <div className="footer_copy">
        © 1997-2024 Netflix, Inc.
      </div>
    </div>
  );
}

export default Footer;
