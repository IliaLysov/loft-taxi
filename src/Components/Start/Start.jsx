import React, {useState} from "react"
import Login from '../Login/Login'
import Registration from "../Registration/Registration"
import './start.css'

export default function Start({setLogin}) {

    const [currentPage, setPage] = useState('login')
    
    const PAGES = {
        login: <Login setLogin={setLogin} setPage={setPage} />,
        registration: <Registration setLogin={setLogin} setPage={setPage}/>
    }
    
    return (
        <div className="wrapper">
            <div className="left-side">
                <img src="../../images/logo.svg" alt="logo" className="logo" />
            </div>
            <div className="container">
                <div className="login-wrapper">
                    {PAGES[currentPage]}
                </div>
            </div>
        </div>
    )
}