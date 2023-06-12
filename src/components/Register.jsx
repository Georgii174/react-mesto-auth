import React, { useState } from "react";
import Auth from "./Auth";
import Header from "./Header";

function Register({ onRegister, isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <>
      <Header />
      <div className="register">
        <Auth formName='register' onSubmit={handleSubmit} title='Регистрация' buttonText='Зарегистрироваться'>
          <input type="email" className="popup__input popup__input_type_login"
            id="email-input" name="email"
            placeholder="Email" minLength="8" maxLength="40" required
            onChange={handleChangeEmail}
            value={email || ''} />
          <input type="password" className="popup__input popup__input_type_login"
            id="pass-input" name="pass"
            placeholder="Пароль" minLength="6" maxLength="200" required
            onChange={handleChangePassword}
            value={password || ''} />
        </Auth>
      </div>
    </>
  )
}

export default Register
