import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="nav-links">
          <p className="header-title">MephiCrimeMap</p>
          <Link to="/" className="header-link">Карта</Link>
          <Link to="/crime-types" className="header-link">Типы преступлений</Link>
          <Link to="/wanted-persons" className="header-link">Преступники</Link>
          <Link to="/about" className="header-link">О приложении</Link>
        </div>
        <div className="auth-links">
          <Link to="/login" className="header-link">Вход</Link>
          <Link to="/register" className="header-link">Регистрация</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
