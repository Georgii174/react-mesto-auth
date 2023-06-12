import React from 'react';
import logo from '../images/logo/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ email, onSignOut, isLoggedIn }) {
  const location = useLocation();

  return (
    <header className="header">
        <img src={logo} alt="место" className="header__logo" />
        {location.pathname === '/sign-in' && (
          <Link className='header__link' to={'/sign-up'}>Регистрация</Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link className='header__link' to={'/sign-in'}>Войти</Link>
        )}
        {isLoggedIn && (
          <>
          <div className='header__exit'>
            {email}
            <Link className='header__link' to={'/sign-in'} onClick={onSignOut}>
              Выйти
            </Link>
          </div>
          </>
        )}
    </header>
  )
}

export default Header





