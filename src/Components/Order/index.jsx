import React, {useEffect, useState} from "react"
import css from "./style.module.scss"
import { connect } from "react-redux"
import Input from '@mui/material/Input'
import { address } from "../../modules/auth"


function Order(events) {

    const {isPaymentAdded, address, addresses} = events

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        address()
        const array = []
        addresses.map((address, i) => array.push({address: address, index: i}))
        setSuggestions(array)
    }, [addresses, address])

    return (
        <div className={css.wrapper}>{!isPaymentAdded 
            ?
            <form className={css.form}>
                <div className={css.container}>
                    <div className={css.inputWrapper}>
                        <Input className={css.input} id="from" type="text" name="from" placeholder="Откуда"/>
                        <ul className={css.suggestions}>
                            {suggestions.map(address => (
                                <li key={address.index} className={css.suggestion}>{address.address}</li>
                            ))
                        }
                        </ul>
                    </div>
                    <div className={css.inputWrapper}>
                        <Input className={css.input} id="from" type="text" name="from" placeholder="Куда"/>
                        <div className={css.suggestion}></div>
                    </div>
                </div>
                <input className={css.callBtn} type="submit" value="Вызвать такси" />
            </form>
            :
            <div className={css.instructions}>Перейдите в профиль и введите данные карты</div>
        }
        </div>
    )
}

export default  connect(state => ({isPaymentAdded: state.auth.isPaymentAdded, addresses: state.auth.addresses}), {address})(Order)