import React, {useState} from "react"
import './style.css'
import {Auth} from '../../Components'
import logo_img from '../../images/logo.svg'
import {withAuth} from '../../contexts'

function Unauthorized(events) {
    const {logIn} = events

    const [isRegistered, setRegistration] = useState(true)

    function send(e){
        e.preventDefault()
        let send_obj = {sendType: isRegistered ? 'login' : 'registration'}
        e.target.querySelectorAll('input').forEach(el => send_obj[el.name] = el.value)
        
        logIn(send_obj.email, send_obj.password).catch(err => {alert('не правильный логин или пароль')})
        console.log(send_obj)
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

export default withAuth(Unauthorized);