import React from "react"
import css from './style.module.css'
import {Profile, Order, Map, Header} from '../../Components'
import {PrivateRoute} from '../../PrivateRoute'
import {Routes, Route, Link} from 'react-router-dom'
import { connect } from "react-redux"
import { payment } from "../../modules/auth"

function Authorized(events) {

    const {payment} = events

    function send(e) {
        // e.preventDefault()
        let paymentObj = {}

        e.target.querySelectorAll('input').forEach(el => paymentObj[el.name] = el.value)
        payment(paymentObj)
    }

    return (
        <div className={css.wrapper}>
            <Header/>
            <div className={css.container}>
                <Routes>
                    <Route exact path="/loft-taxi/dist/" element={<PrivateRoute/>}>
                        <Route exact path="/loft-taxi/dist/" element={
                            <div className={css.orderWrapper}>
                                <Order />
                            </div>
                        } />
                    </Route>
                    <Route exact path="/loft-taxi/dist/profile" element={<PrivateRoute/>}>
                        <Route exact path="/loft-taxi/dist/profile" element={
                            <div className={css.windowModal}>
                                <Link to="/loft-taxi/dist/" className={css.windowModalLink}/>
                                <div className={css.windowModalContent}>
                                    <Profile send={send}/>
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

export default connect(state => ({}), {payment})(Authorized)