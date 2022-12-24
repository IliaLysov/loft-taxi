import React, {useState} from "react"
import './style.css'
import {Auth} from '../../Components'
import logo_img from '../../images/logo.svg'
import {authenticate, registration} from '../../modules/auth'
import { connect } from "react-redux"

function Unauthorized(events) {
    const {authenticate, registration} = events

    const [isRegistered, setRegistration] = useState(true)

    if(localStorage.user) {
        const user = JSON.parse(localStorage.user)
        authenticate(user)
    }

    function send(e){
        e.preventDefault()
        let send_obj = {sendType: isRegistered ? 'login' : 'registration'}
        e.target.querySelectorAll('input').forEach(el => send_obj[el.name] = el.value)

        if(send_obj.sendType === 'login') {
            authenticate(send_obj)
        } else if(send_obj.sendType === 'registration') {
            const [name, surname] = send_obj.name.split(' ')
            send_obj.name = name
            send_obj.surname = surname
            registration(send_obj)
        }
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

export default connect(state => ({isLoggedIn: state.auth.isLoggedIn}), {authenticate, registration})(Unauthorized);