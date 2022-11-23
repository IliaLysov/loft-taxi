import React from "react"


export default function registration({setLogin, setPage}) {
    return (
        <form className="form">
            <div className="header">Регистрация</div>
            <div className="input-container">
                <div className="input-wrapper">
                    <label className="label" htmlFor="email">Email*</label>
                    <input className="input" id="email" type="email" name="email" />
                </div>
                <div className="input-wrapper">
                    <label className="label" htmlFor="name">Как вас зовут?*</label>
                    <input className="input" id="name" type="text" name="name" />
                </div>
                <div className="input-wrapper">
                    <label className="label" htmlFor="password">Придумайте пароль*</label>
                    <input className="input" id="password" type="password" name="password" />
                </div>
            </div>
            <button className="btn entry-btn" onClick={() => setLogin(true)}>Зарегистрироваться</button>
            <div className="registration-wrapper">
                <div className="registration-question">Новый пользователь?</div>
                <button className="btn registration-btn" onClick={() => setPage('login')}>Войти</button>
            </div>
        </form>        
    )
}