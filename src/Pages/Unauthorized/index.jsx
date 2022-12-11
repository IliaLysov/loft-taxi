import React, {useState} from "react"
import './style.css'
import {Auth} from '../../Components'
import logo_img from '../../images/logo.svg'
import {authentificate} from '../../modules/auth'
import { connect } from "react-redux"

function Unauthorized(events) {
    const {authentificate} = events

    const [isRegistered, setRegistration] = useState(true)

    function send(e){
        e.preventDefault()
        let send_obj = {sendType: isRegistered ? 'login' : 'registration'}
        e.target.querySelectorAll('input').forEach(el => send_obj[el.name] = el.value)
        
        authentificate(send_obj).catch(err => {alert('не правильный логин или пароль')})
    }
    
    return (
        <div className="wrapper">
            <div className="left-side">
                <img src={logo_img} alt="logo"/>
            </div>
            <div className="container">
                <div className="login-wrapper">
                    <Auth send={send} setRegistration={(e) => {e.preventDefault(); setRegistration(prev => !prev)}} isRegistered={isRegistered}/>
                </div>
            </div>
        </div>
    )
}

export default connect(state => ({isLoggedIn: state.auth.isLoggedIn}), {authentificate})(Unauthorized);