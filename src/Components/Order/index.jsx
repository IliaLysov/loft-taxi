import React, {useEffect, useState} from "react"
import css from "./style.module.scss"
import { connect } from "react-redux"
import Input from '@mui/material/Input'
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { address, route } from "../../modules/auth"


function Order(events) {

    const {isPaymentAdded, address, addresses, route} = events

    const [addressesArr, serAddressesArr] = useState([]) //неприкасаемый
    const [selected, setSelected] = useState({from: {}, to: {}}) //выбранные
    // const [notSelected, setNotSelected] = useState([]) //не выбранные адреса
    const [suggestions, setSuggestions] = useState([]) //предложения из списка не выбранных (в наличии), по вводу
    const [valueFrom, setValueFrom] = useState('') //Передает и чистит значение ввода
    const [valueTo, setValueTo] = useState('')
    const [currentSelected, setCurrentSelected] = useState('')
    console.log(addressesArr)

    useEffect(() => {
        address()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    
    useEffect(() => {
        const array = []
        addresses.map((address, index) => array.push({address: address, index: index}))
        serAddressesArr(array)
        notSelect(selected, array)
        console.log(addresses)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addresses])

    const find = (e) => {
        const copiedSelected = {...selected}
        copiedSelected[e.target.id] = {}
        setSelected(copiedSelected)
        const notSelectedArray = notSelect(copiedSelected, addressesArr)

        const input = e.target.value.trim().toLowerCase().split('').map(e => {
            if(e === '(' || e === ')') {
                e = `\\${e}`
                return e
            } else {
                return e
            }
        }).join('')
        const array = []
        notSelectedArray.forEach(suggest => {
            if (suggest.address.toLowerCase().search(input) !== -1) {
                array.push({address: suggest.address, index: suggest.index})
            }
        })
        setSuggestions(array)
    }

    const select = (address, target) => {
        if (address) {
            const selectedArrdessObj = {address: address.address, index: address.index}
            let copiedSelected = {...selected}
            copiedSelected[target] = selectedArrdessObj
            setSelected(copiedSelected)
    
            notSelect(copiedSelected, addressesArr)
        }
        setCurrentSelected('')
    }
    
    const notSelect = (selected, addressesArr) => {
        const notSelectedArray = []
        addressesArr.forEach(obj => {
            if (obj.address !== selected.from.address && obj.address !== selected.to.address) {
                notSelectedArray.push(obj)
            }
        })
        // setNotSelected(notSelectedArray)
        setSuggestions(notSelectedArray)
        return notSelectedArray
    }

    const routeAddress = (e) => {
        e.preventDefault()
        let addressObj = {}
        e.target.querySelectorAll('input').forEach(e => addressObj[e.name] = e.value)
        route(addressObj)
    }

    // console.log(routeCoordinates)
            
    return (
        <div className={css.wrapper}>{isPaymentAdded 
            ?
            <form className={css.form} onSubmit={routeAddress}>
                <div className={css.container}>
                    <Autocomplete
                    id="from"
                    options={addresses}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} onClick={console.log(params)} label="From" />}
                     />
                     <Autocomplete
                    id="to"
                    options={addresses}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="To" />}
                     />
                    <div className={css.inputWrapper}>
                        <Input className={css.input} 
                            id="from" 
                            type="text" 
                            name="from" 
                            placeholder="Откуда" 
                            value={selected.from.address ? selected.from.address : valueFrom} 
                            onChange={(e) => {find(e); setValueFrom(e.target.value)}} 
                            onClick={() => notSelect(selected, addressesArr)} 
                            onBlur={() => {setValueFrom(''); select()}} 
                            onFocus={(e) => setCurrentSelected(e.target.id)}
                        />
                        {
                            currentSelected === 'from' &&
                            <ul className={css.suggestions}>
                                {suggestions.map(address => (
                                    <li key={address.index} className={css.suggestion} onClick={() => select(address, 'from')}>{address.address}</li>
                                ))
                            }
                            </ul>
                        }
                    </div>
                    <div className={css.inputWrapper}>
                        <Input className={css.input} 
                            id="to" 
                            type="text" 
                            name="to" 
                            placeholder="Куда" 
                            value={selected.to.address ? selected.to.address : valueTo} 
                            onChange={(e) => {find(e); setValueTo(e.target.value)}} 
                            onClick={() => notSelect(selected, addressesArr)} 
                            onBlur={() => setValueTo('')} 
                            onFocus={(e) => setCurrentSelected(e.target.id)}
                        />
                        {
                            currentSelected === 'to' &&
                            <ul className={css.suggestions}>
                                {suggestions.map(address => (
                                    <li key={address.index} className={css.suggestion} onClick={() => select(address, 'to')}>{address.address}</li>
                                ))
                            }
                            </ul>
                        }
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

export default  connect(state => ({isPaymentAdded: state.auth.isPaymentAdded, addresses: state.auth.addresses, routeCoordinates: state.auth.routeCoordinates}), {address, route})(Order)