import React, {useState, useEffect} from "react"
import css from './style.module.scss'
import Input from '@mui/material/Input'
import cardLogo from '../../images/card-logo.svg'
import cardChip from '../../images/card-chip.svg'
import masterCard from '../../images/master-card.svg'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { setPaymentStatus, addPayment } from "../../modules/auth"



function Profile(events) {

    const { send, paymentStatus, setPaymentStatus, addPayment } = events

    const [cardNumber, setCardNumber] = useState('')
    const [dateCard, setDate] = useState('')
    const [cvcCard, setCVC] = useState('')
    const [cardName, setCardName] = useState('')    
    
    const payment = localStorage.payment

    useEffect(() => {
        setPaymentStatus(false)
        if(payment) {
            const paymentData = JSON.parse(payment)
            setCardNumber(paymentData.cardNumber)
            setCVC(paymentData.cvc)
            setDate(paymentData.expiryDate)
            setCardName(paymentData.cardName)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
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

    const handleCVC = (value) => value.replace(/\D/g, "").substring(0, 3)


    const setPayment = (e) => {
        e.preventDefault()
        if (e.target.querySelectorAll('#card')[0].value.length === 19
        &&
        e.target.querySelectorAll('#date')[0].value.length === 5
        &&
        e.target.querySelectorAll('#cvc')[0].value.length === 3
        ) {
            send(e)
        } else {
            alert('Form filled out incorrectly')
        }
    }

    const cleanForm = () => {
        localStorage.removeItem('payment')
        addPayment(false)
        setCardNumber('')
        setCVC('')
        setDate('')
        setCardName('')
    }

    
    return (
        <div className={css.wrapper}>
            <h1 className={css.profileTitle}>Profile</h1>
            <div className={css.description}>{paymentStatus ? 'Payment details have been updated. Now you can order a taxi' : 'Enter payment details'}</div>
            <div className={css.container}>{paymentStatus ?
                <Link to="/loft-taxi/dist/" className={css.linkBtn}>Go to map</Link>
                :
                <form className={css.formWrapper} onSubmit={setPayment}>
                    <div className={css.formContainer}>
                        <div className={css.form}>
                            <div className={css.inputContainer}>
                                <label htmlFor="name" className={css.label}>Owner's name</label>
                                <Input className={css.input} id="name" type="text" name="name" value={cardName} onChange={e => setCardName(e.target.value)} required/>
                            </div>
                            <div className={css.inputContainer}>
                                <label htmlFor="card" className={css.label}>Card number</label>
                                <Input className={css.input} id="card" type="text" value={cardNumber}  placeholder="XXXX XXXX XXXX XXXX" name="card" required onChange={(e) => handleCardDisplay(e.target.value)}/>
                            </div>
                            <div className={css.inputWrapper}>
                                <div className={css.inputContainerBottom}>
                                    <label htmlFor="date" className={css.label}>MM/YY</label>
                                    <Input className={css.input} id="date" type="text" value={dateCard} name="date" placeholder="XX/XX" required onChange={(e) => handleDateDisplay(e.target.value)}/>
                                </div>
                                <div className={css.inputContainerBottom}>
                                    <label htmlFor="cvc" className={css.label}>CVC</label>
                                    <Input className={css.input} id="cvc" type="text" value={cvcCard} name="cvc" required onChange={(e) => setCVC(handleCVC(e.target.value))}/>
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
                    <div className={css.cleanBtn} onClick={() => cleanForm()}>Clean form</div>
                    <input type="submit" className={css.saveBtn} value="Save"/>
                </form>
            }
            </div>
        </div>
    )
}

export default connect(state => ({paymentStatus: state.auth.paymentStatus}), {setPaymentStatus, addPayment})(Profile)