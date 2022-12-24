import React, {useEffect, useState} from "react"
import css from "./style.module.scss"
import { connect } from "react-redux"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { address, route } from "../../modules/auth"


function Order(events) {

    const {isPaymentAdded, address, addresses, route} = events

    const [selected, setSelected] = useState({from: {}, to: {}}) //выбранные
    const [fromOffers, setFromOffers] = useState([])
    const [toOffers, setToOffers] = useState([])


    useEffect(() => {
        address()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (addresses) {
            let copyNotSelected = []
            addresses.forEach(address => {
                copyNotSelected.push(address)
            })
            setFromOffers(copyNotSelected)
            setToOffers(copyNotSelected)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addresses])

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
            ?
            <form className={css.form} onSubmit={routeAddress}>
                <div className={css.container}>
                    <Autocomplete
                    className={css.input}
                    disablePortal
                    id="from"
                    options={fromOffers}
                    onChange={(event, value) => select(value, event.target.id.split('-')[0])}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label="From" />}
                     />
                    <Autocomplete
                    className={css.input}
                    disablePortal
                    id="to"
                    options={toOffers}
                    onChange={(event, value) => select(value, event.target.id.split('-')[0])}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label="To" />}
                     />
                </div>
                <input className={css.callBtn} type="submit" value="Вызвать такси" />
            </form>
            :
            <div className={css.instructions}>Перейдите в профиль и введите данные карты</div>
        }
        </div>
    )
}

export default  connect(state => ({isPaymentAdded: state.auth.isPaymentAdded, addresses: state.auth.addresses, routeCoordinates: state.auth.routeCoordinates}), {address, route})(Order)