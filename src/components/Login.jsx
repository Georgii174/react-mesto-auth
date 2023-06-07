import React, {useState} from "react";

function Login({ onAuthorize}) {
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
    onAuthorize(email, password);
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <form className="auth__form" name="login" id="login-form" onSubmit={handleSubmit} noValidate>
          <h2 className="auth__title">Вход</h2>
           <input type="text" className="auth__input"
           name="login-email" id="login-email"
           placeholder="Email"
           value={email}
           onChange={handleChangeEmail} />
           <input type="text" className="auth__input"
           name="login-password" id="login-password"
           placeholder="Пароль"
           value={password}
           onChange={handleChangePassword} />
           <button type="submit" className="auth__button-save" id="login-button-save">Войти</button>
           <button type="button" className="auth__button" id="login-auth-button" style={{cursor: 'auto'}}></button>
        </form>
      </div>
    </div>
  )

}

export default Login
