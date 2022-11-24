import React, {useState} from "react"
import Profile from "../Profile/Profile"
import Order from "../Order/Order"
import './Map.css'

export default function Map() {

    const [currentPage, setPage] = useState('order')

    const PAGES = {
        order: <Order />,
        profile: <Profile />
    }

    return (
        <div className="map-wrapper">
            <div className="map-header">
                <div className="logo"></div>
                <div className="navigation">
                    <button className="btn nav map-btn" onClick={() => setPage('order')}>Карта</button>
                    <button className="btn nav profile-btn" onClick={() => setPage('profile')}>Профиль</button>
                    <button className="btn nav escape-btn">Выйти</button>
                </div>
            </div>
            <div className="map-container">
                {PAGES[currentPage]}
            </div>
        </div>
    )
}