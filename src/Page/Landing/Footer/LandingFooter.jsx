import React from 'react';
import { Link } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import './LandingFooter.css';
import { useLanguage } from '../../../utils/LanguageContext';

const LandingFooter = () => {
    const { language, changeLanguage, t } = useLanguage();

    return (
        <footer className="landing-footer">
            <div className="landing-footer__container">
                <p className="footer-top">
                    {t('footer.questions')} <a href="tel:1-844-505-2993">1-844-505-2993</a>
                </p>
                <div className="footer-links">
                    <ul>
                        <li><Link to="/">{t('footer.faq')}</Link></li>
                        <li><a href="#">{t('footer.investorRelations')}</a></li>
                        <li><a href="#">{t('footer.buyGiftCards')}</a></li>
                        <li><a href="#">{t('footer.cookiePreferences')}</a></li>
                        <li><a href="#">{t('footer.legalNotices')}</a></li>
                    </ul>
                    <ul>
                        <li><Link to="/help">{t('footer.helpCenter')}</Link></li>
                        <li><a href="#">{t('footer.jobs')}</a></li>
                        <li><a href="#">{t('footer.waysToWatch')}</a></li>
                        <li><a href="#">{t('footer.corporateInformation')}</a></li>
                        <li><a href="#">{t('footer.onlyOnNetflix')}</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">{t('footer.account')}</a></li>
                        <li><a href="#">{t('footer.netflixShop')}</a></li>
                        <li><a href="#">{t('footer.termsOfUse')}</a></li>
                        <li><a href="#">{t('footer.contactUs')}</a></li>
                        <li><a href="#">{t('footer.adChoices')}</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">{t('footer.mediaCenter')}</a></li>
                        <li><a href="#">{t('footer.redeemGiftCards')}</a></li>
                        <li><a href="#">{t('footer.privacy')}</a></li>
                        <li><a href="#">{t('footer.speedTest')}</a></li>
                    </ul>
                </div>
                <div className="footer-lang">
                    <div className="lang-selector">
                        <div className="lang-flag">
                            <img
                                src={language === 'en' ? 'https://flagcdn.com/w40/us.png' : language === 'es' ? 'https://flagcdn.com/w40/es.png' : 'https://flagcdn.com/w40/sa.png'}
                                alt={language}
                                style={{ width: '24px', height: 'auto', display: 'block' }}
                            />
                        </div>
                        <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="ar">العربية</option>
                        </select>
                    </div>
                </div>
                <p className="footer-bottom">{t('footer.country')}</p>
            </div>
        </footer>
    );
};

export default LandingFooter;
