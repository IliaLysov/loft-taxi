import React from "react"
import logo_img from '../../images/logo-mini.svg'
import css from './style.module.scss'

function Header(events) {

    const {clickNavItem, currentPage} = events
    
    const navList = [
        {name: 'order', value: 'Карта'},
        {name: 'profile', value: 'Профиль'},
        {name: 'out', value: 'Выйти'},
    ]

    return (
        <header className={css.header}>
            <img className={css.logo} src={logo_img} alt="logo" />
            <ul className={css.navigation}>
                {navList.map((el, i) => (
                    <li
                        key={i}
                        data-active={currentPage === el.name}
                        className={css.nav}
                        onClick={() => clickNavItem(el)}
                    >{el.value}</li>
                ))}
            </ul>
        </header>
    )
}

export default Header