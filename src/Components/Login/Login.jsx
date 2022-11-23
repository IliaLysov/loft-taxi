import React from "react"
import './Login.css'

export default function Login({setLogin, setPage}) {
    return (
        <form className="form">
            <div className="header">Войти</div>
            <div className="input-container">
                <div className="input-wrapper">
                    <label className="label" htmlFor="email">Email</label>
                    <input className="input" id="email" type="email" name="email" />
                </div>
                <div className="input-wrapper">
                    <label className="label" htmlFor="password">Password</label>
                    <input className="input" id="password" type="password" name="password" />
                </div>
                <div className="passport-question-wrapper">
                    <button className="btn passport-question-btn">Забыли пароль?</button>
                </div>
            </div>
            <button className="btn entry-btn" onClick={() => setLogin(true)}>Войти</button>
            <div className="registration-wrapper">
                <div className="registration-question">Новый пользователь?</div>
                <button className="btn registration-btn" onClick={() => setPage('registration')}>Регистрация</button>
            </div>
        </form>
    )
}