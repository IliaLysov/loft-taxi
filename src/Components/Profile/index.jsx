import React, {useState, useEffect} from "react"
import css from './style.module.scss'
import Input from '@mui/material/Input'
import cardLogo from '../../images/card-logo.svg'
import cardChip from '../../images/card-chip.svg'
import masterCard from '../../images/master-card.svg'
import { connect } from "react-redux"
import { Link } from "react-router-dom"



function Profile(events) {

    const { send, isPaymentAdded } = events

    
    
    const [cardNumber, setCardNumber] = useState('')
    const [dateCard, setDate] = useState('')
    const [cvcCard, setCVC] = useState('')
    const [cardName, setCardName] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    
    
    const payment = localStorage.payment
    
    useEffect(() => {
        if(payment) {
            const paymentData = JSON.parse(payment)
            setCardNumber(paymentData.cardNumber)
            setCVC(paymentData.cvc)
            setDate(paymentData.expiryDate)
            setCardName(paymentData.cardName)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payment])
    
    const handleCardDisplay = (text) => {
        let textTemp = [...text.split(' ').join('')]
        const card = []

        
        textTemp.forEach((t, i) => {
            
            if (!isNaN(t)) {
                if (i % 4 === 0) {
                    if (i !== 0) {
                        card.push(' ')
                    }
                }
                card.push(t)
            }
        })

        if (card.length <= 19) {
            setCardNumber(card.join(''))
        }
    }

    const handleDateDisplay = (text) => {
        let textTemp = text
        if (textTemp[0] !== '1' && textTemp[0] !== '0') {
            textTemp = ''
        }
        if (textTemp.length === 2) {
            if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) === 0) {
                textTemp = textTemp[0]
            } else if (dateCard.length === 1) {
                textTemp += '/'
            }
        }
        
        if (textTemp.length <= 5 && !isNaN(textTemp.substring(3, 5))) {
            setDate(textTemp)
        }
    }

    const handleCVC = (text) => {
        if (text.length <= 3 && !isNaN(text)) {
            setCVC(text)
        }
    }

    const addPayment = (e) => {
        e.preventDefault()
        send(e)
        setTimeout(() => {
            if (isPaymentAdded) {
                setPaymentSuccess(true)
            }
        }, 1000)
    }

    
    return (
        <div className={css.wrapper}>
            <h1 className={css.profileTitle}>Профиль</h1>
            <div className={css.description}>{paymentSuccess ? 'Платёжные данные обновлены. Теперь вы можете заказывать такси' : 'Введите платежные данные'}</div>
            <div className={css.container}>{paymentSuccess ?
                <Link to="/" className={css.linkBtn}>Перейти на карту</Link>
                :
                <form className={css.formWrapper} onSubmit={addPayment}>
                    <div className={css.formContainer}>
                        <div className={css.form}>
                            <div className={css.inputContainer}>
                                <label htmlFor="name" className={css.label}>Имя владельца</label>
                                <Input className={css.input} id="name" type="text" name="name" value={cardName} onChange={e => setCardName(e.target.value)} required/>
                            </div>
                            <div className={css.inputContainer}>
                                <label htmlFor="card" className={css.label}>Номер карты</label>
                                <Input className={css.input} id="card" type="text" value={cardNumber}  placeholder="XXXX XXXX XXXX XXXX" name="card" required onChange={(e) => handleCardDisplay(e.target.value)}/>
                            </div>
                            <div className={css.inputWrapper}>
                                <div className={css.inputContainerBottom}>
                                    <label htmlFor="date" className={css.label}>MM/YY</label>
                                    <Input className={css.input} id="date" type="text" value={dateCard} name="date" placeholder="XX/XX" required onChange={(e) => handleDateDisplay(e.target.value)}/>
                                </div>
                                <div className={css.inputContainerBottom}>
                                    <label htmlFor="cvc" className={css.label}>CVC</label>
                                    <Input className={css.input} id="cvc" type="text" value={cvcCard} name="cvc" required onChange={(e) => handleCVC(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className={css.render}>
                            <div className={css.renderTop}>
                                <img className={css.cardLogo} src={cardLogo} alt="card-logo" />
                                <div className={css.date}>{dateCard}</div>
                            </div>
                            <div className={css.cardNumber}>{cardNumber}</div>
                            <div className={css.renderBottom}>
                                <img className={css.cardChip} src={cardChip} alt="card-logo" />
                                <img className={css.masterCard} src={masterCard} alt="card-logo" />
                            </div>
                        </div>
                    </div>
                    <input type="submit" className={css.saveBtn} value="Сохранить"/>
                </form>
            }
            </div>
        </div>
    )
}

export default connect(state => ({isPaymentAdded: state.auth.isPaymentAdded}))(Profile)