import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';

import { useLanguage } from "../../utils/LanguageContext";

function Footer() {
  const { language, changeLanguage, t } = useLanguage();
  const [showServiceCode, setShowServiceCode] = useState(false);
  const serviceCode = "501-143";

  return (
    <footer className="footer_container">
      <div className="footer_content">
        <div className="footer_social">
          <a href="https://www.facebook.com/netflix" target="_blank" rel="noreferrer"><FacebookIcon /></a>
          <a href="https://www.instagram.com/netflix" target="_blank" rel="noreferrer"><InstagramIcon /></a>
          <a href="https://twitter.com/netflix" target="_blank" rel="noreferrer"><TwitterIcon /></a>
          <a href="https://www.youtube.com/user/NewOnNetflix" target="_blank" rel="noreferrer"><YouTubeIcon /></a>
        </div>

        <div className="footer_links">
          <div className="footer_column">
            <Link to="#">{t('footer.audioDescription')}</Link>
            <Link to="#">{t('footer.investorRelations')}</Link>
            <Link to="#">{t('footer.legalNotices')}</Link>
            <Link to="#" onClick={(e) => { e.preventDefault(); setShowServiceCode(!showServiceCode); }}>
              {t('footer.serviceCode')}
            </Link>
          </div>
          <div className="footer_column">
            <Link to="/help">{t('footer.helpCenter')}</Link>
            <Link to="#">{t('footer.jobs')}</Link>
            <Link to="#">{t('footer.cookiePreferences')}</Link>
          </div>
          <div className="footer_column">
            <Link to="#">{t('footer.giftCards')}</Link>
            <Link to="#">{t('footer.termsOfUse')}</Link>
            <Link to="#">{t('footer.corporateInformation')}</Link>
          </div>
          <div className="footer_column">
            <Link to="#">{t('footer.mediaCenter')}</Link>
            <Link to="#">{t('footer.privacy')}</Link>
            <Link to="#">{t('footer.contactUs')}</Link>
          </div>
        </div>

        <div className="footer_service">
          <div className="lang-selector">
            <LanguageIcon className="globe-icon" />
            <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <button className="service_code_btn" onClick={() => setShowServiceCode(!showServiceCode)}>
            {showServiceCode ? serviceCode : t('footer.serviceCode')}
          </button>
        </div>

        <div className="footer_copy">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
