import './Footer.css';
import instagramIcon from './instagram.svg';
import telegramIcon from './telegram.svg';
import mailIcon from './mail.svg';
import githubIcon from './github.svg';

export const Footer = ({ setGreetingVisible }) => {
    const onBtnClick = () => {
        setGreetingVisible(true);
    };

    return (
        <footer className="footer">
            <button className="footer__help" href="#" onClick={onBtnClick}>Help</button>
            <p className="footer__links">
                Contact:
                <a href="https://github.com/Den1Marshall" target="_blank" rel="noopener noreferrer">
                    <img className="footer__link-icon" src={githubIcon} alt="Github" />
                </a>
                <a href="https://www.instagram.com/d.e.n_marshall/" target="_blank" rel="noopener noreferrer">
                    <img className="footer__link-icon" src={instagramIcon} alt="Instagram" />
                </a>
                <a href="https://t.me/den_marshall" target="_blank" rel="noopener noreferrer">
                    <img className="footer__link-icon" src={telegramIcon} alt="Telegram" />
                </a>
                <a href="mailto:denyshrychulevych@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img className="footer__link-icon" src={mailIcon} alt="Mail" />
                </a>
            </p>
            <p className="footer__copyright">&copy; Denys Hrychulevych, 2022-{new Date().getFullYear()}. All rights reserved.</p>
        </footer>
    )
}