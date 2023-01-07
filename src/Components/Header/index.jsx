import React from "react"
import { NavLink } from "react-router-dom"
import logo_img from '../../images/logo-mini.svg'
import css from './style.module.scss'
import {logOut} from '../../modules/auth'
import { connect } from "react-redux"

function Header(events) {
    const {logOut} = events
    const isOffline = JSON.parse(localStorage.isOffline)
    let removeObjects = []
    if (isOffline) {
        removeObjects = ['user']
    } else {
        removeObjects = ['user', 'payment']
    }

    const escape = () => {
        window.location.assign(`${window.location.origin}/loft-taxi/dist/`)
        logOut()
        removeObjects.forEach(e => localStorage.removeItem(e))
    }

    return (
        <header className={css.header}>
            <img className={css.logo} src={logo_img} alt="logo" />
            <div className={css.navigation}>
                <NavLink to="/loft-taxi/dist/" className={css.nav}>Map</NavLink>
                <NavLink to="/loft-taxi/dist/profile" className={css.nav}>Profile</NavLink>
                <button to="/loft-taxi/dist/" className={css.nav} onClick={escape}>Log out</button>
            </div>
        </header>
    )
}

export default connect(state => ({isLoggedIn: state.auth.isLoggedIn}), {logOut})(Header)