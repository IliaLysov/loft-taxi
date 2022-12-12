import React from "react"
import { NavLink } from "react-router-dom"
import logo_img from '../../images/logo-mini.svg'
import css from './style.module.scss'
import {logOut} from '../../modules/auth'
import { connect } from "react-redux"

function Header(events) {
    const {logOut} = events

    return (
        <header className={css.header}>
            <img className={css.logo} src={logo_img} alt="logo" />
            <div className={css.navigation}>
                <NavLink to="/" className={css.nav}>Карта</NavLink>
                <NavLink to="/profile" className={css.nav}>Профиль</NavLink>
                <button className={css.nav} onClick={() => {logOut(); localStorage.removeItem('user') }}>Выйти</button>
            </div>
        </header>
    )
}

export default connect(state => ({isLoggedIn: state.auth.isLoggedIn}), {logOut})(Header)