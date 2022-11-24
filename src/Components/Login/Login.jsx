import React from "react"
import './Login.css'

export default function Login({setLogin, setPage}) {
    return (
        <form className="form" onSubmit={() => setLogin(true)}>
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
            <input className="btn entry-btn" type="submit" value="Войти" />
            <div className="registration-wrapper">
                <div className="registration-question">Новый пользователь?</div>
                <button className="btn registration-btn" onClick={() => setPage('registration')}>Регистрация</button>
            </div>
        </form>
    )
}