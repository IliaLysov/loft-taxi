import React, {useEffect, useState} from "react"
import css from "./style.module.scss"
import { connect } from "react-redux"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { address, route, setRouteStatus } from "../../modules/auth"


function Order(events) {

    const {isPaymentAdded, address, addresses, route, setRouteStatus, routeStatus} = events

    const [selected, setSelected] = useState({from: {}, to: {}}) //выбранные
    const [fromOffers, setFromOffers] = useState([])
    const [toOffers, setToOffers] = useState([])


    useEffect(() => {
        address()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (addresses) {
            setFromOffers(addresses)
            setToOffers(addresses)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addresses, routeStatus])

    const select = (current, direction) => {
        let copySelect = {...selected}
        copySelect[direction] = current
        setSelected(copySelect)

        let copyNotSelected = []
        addresses.forEach(address => {
            if (address !== current) {
                copyNotSelected.push(address)
            }
        })
        if (direction === 'from') {
            setToOffers(copyNotSelected)
        } else if (direction === 'to') {
            setFromOffers(copyNotSelected)
        }
    }

    const routeAddress = (e) => {
        e.preventDefault()
        let addressObj = {}
        e.target.querySelectorAll('input').forEach(e => addressObj[e.id] = e.value)
        route(addressObj)
    }

    return (
        <div className={css.wrapper}>{isPaymentAdded 
            ? !routeStatus
                ?    <form className={css.form} onSubmit={e => routeAddress(e)}>
                        <div className={css.container}>
                            <Autocomplete
                            className={css.input}
                            disablePortal
                            id="from"
                            options={fromOffers}
                            onChange={(event, value) => select(value, event.target.id.split('-')[0])}
                            filterSelectedOptions
                            renderInput={(params) => <TextField {...params} label="From" required/>}
                            />
                            <Autocomplete
                            className={css.input}
                            disablePortal
                            id="to"
                            options={toOffers}
                            onChange={(event, value) => select(value, event.target.id.split('-')[0])}
                            filterSelectedOptions
                            renderInput={(params) => <TextField {...params} label="To" required/>}
                            />
                        </div>
                        <input className={css.callBtn} type="submit" value="Call a taxi" />
                    </form>
                :   <div className={css.routeSuccess}>
                        <h1 className={css.title}>Order placed</h1>
                        <div className={css.description}>Your taxi is already on its way to you. Will arrive in about 10 minutes.</div>
                        <button className={css.callBtn} onClick={() => setRouteStatus(false)}>Make a new order</button>
                    </div>
            :
            <div className={css.instructions}>Go to profile and enter card details</div>
        }
        </div>
    )
}

export default  connect(state => ({isPaymentAdded: state.auth.isPaymentAdded, addresses: state.auth.addresses, routeCoordinates: state.auth.routeCoordinates, routeStatus: state.auth.routeStatus}), {address, route, setRouteStatus})(Order)