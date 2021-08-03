import React from "react";

export default function Login() {
  return (
    <div className="auth__center">
      <div className="auth__box">
          <div className="auth__box__title">
              <h2 className="auth__box--title--text">Авторизация</h2>
          </div>
        <div className="auth__box__row">
          <label htmlFor="login">EMail или логин</label>
          <input type="text" className="auth__field" name="login" />
        </div>
        <div className="auth__box__row">
          <label htmlFor="password">Пароль</label>
          <input type="password" className="auth__field" name="password" />
        </div>
        <div className="auth__box__row">
          <button className="auth--submit">Вход</button>
        </div>
      </div>
    </div>
  );
}
