import React from "react"
import css from './style.module.css'
import {Profile, Order, Map, Header} from '../../Components'
import {PrivateRoute} from '../../PrivateRoute'
import {Routes, Route, Link} from 'react-router-dom'

function Authorized() {

    return (
        <div className={css.wrapper}>
            <Header/>
            <div className={css.container}>
                <Routes>
                    <Route exact path="/" element={<PrivateRoute/>}>
                        <Route exact path="/" element={
                            <div className={css.orderWrapper}>
                                <Order />
                            </div>
                        } />
                    </Route>
                    <Route exact path="/profile" element={<PrivateRoute/>}>
                        <Route exact path="/profile" element={
                            <div className={css.windowModal}>
                                <Link to="/" className={css.windowModalLink}/>
                                <div className={css.windowModalContent}>
                                    <Profile />
                                </div>
                            </div>
                        }/>
                    </Route>
                </Routes>
                <div className={css.map}>
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default Authorized