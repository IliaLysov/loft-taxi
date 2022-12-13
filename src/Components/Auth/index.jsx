import React from "react"
import css from './style.module.scss'
import Input from '@mui/material/Input'
// import {Link} from 'react-router-dom'


function Auth(events) {
    
    const {isRegistered, setRegistration, send} = events

    return (
        <form className={css.form} onSubmit={send}>
            <div className={css.header}>{isRegistered ? 'Войти' : 'Регистрация'}</div>
            <div className={css.inputContainer}>
                <div className={css.inputWrapper}>
                    <label htmlFor="email" className={css.label}>Email</label>
                    <Input className={css.input} id="email" type="email" required name="email" />
                </div>
                {!isRegistered
                &&
                <div className={css.inputWrapper}>
                    <label className={css.label} htmlFor="name">Как вас зовут?*</label>
                    <Input className={css.input} id="name" type="text" name="name" />
                </div>
                }
                <div className={css.inputWrapper}>
                    <label className={css.label} htmlFor="password">Password</label>
                    <Input className={css.input} id="password" type="password" required name="password" />
                </div>
                {isRegistered
                &&
                <div className={css.passportQuestionWrapper}>
                    <button className={css.passportQuestionBtn} onClick={setRegistration}>Забыли пароль?</button>
                </div>
                }
            </div>
            <input className={css.entryBtn} type="submit" value={isRegistered ? "Войти" : "Зарегистрироваться"} />
            <div className={css.registrationWrapper}>
                <div className={css.registrationQuestion}>{isRegistered ? "Новый пользователь?" : "Уже зарегистрированы?"}</div>
                <button className={css.registrationBtn} onClick={setRegistration}>{isRegistered ? "Регистрация" : "Войти"}</button>
            </div>
        </form>
    )
}

export default Auth