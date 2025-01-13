import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-title">© 2025 MephiCrimeMap. Все права защищены.</p>
        <div className="footer-links">
          <Link to="/terms" className="footer-link">Пользовательское соглашение</Link>
          <Link to="/privacy" className="footer-link">Политика конфиденциальности</Link>
          <Link to="/contact" className="footer-link">Контакты</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
