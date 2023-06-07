import React, { useState } from "react";
import {Link} from "react-router-dom";

function Register({ onRegister}) {
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
    <div className="auth">
      <div className="auth__container">
        <form className="auth__form" name="register" id="register-form" onSubmit={handleSubmit} noValidate>
          <h2 className="auth__title">Вход</h2>
           <input type="text" className="auth__input"
           name="register-email" id="register-email"
           placeholder="Email"
           value={email}
           onChange={handleChangeEmail} />
           <input type="text" className="auth__input"
           name="register-password" id="register-password"
           placeholder="Пароль"
           value={password}
           onChange={handleChangePassword} />
           <button type="submit" className="auth__button-save" id="login-button-save">Зарегистрироваться</button>
           <Link to="./sing-in" className="auth__button">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </div>
  )
}

export default Register
