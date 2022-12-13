import React, {useState} from "react"
import css from './style.module.scss'
import Input from '@mui/material/Input'
import cardLogo from '../../images/card-logo.svg'
import cardChip from '../../images/card-chip.svg'
import masterCard from '../../images/master-card.svg'



export default function Profile() {

    const [date, setDate] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    

    return (
        <div className={css.wrapper}>
            <h1 className={css.tltle}>Профиль</h1>
            <div className={css.description}>Введите платежные данные</div>
            <div className={css.container}>
                <form className={css.formWrapper}>
                    <div className={css.formContainer}>
                        <div className={css.form}>
                            <div className={css.inputContainer}>
                                <label htmlFor="name" className={css.label}>Имя владельца</label>
                                <Input className={css.input} id="name" type="text" name="name" required/>
                            </div>
                            <div className={css.inputContainer}>
                                <label htmlFor="card" className={css.label}>Номер карты</label>
                                <Input className={css.input} id="card" type="number" name="card" required onChange={(e) => setCardNumber(e.target.value)}/>
                            </div>
                            <div className={css.inputWrapper}>
                                <div className={css.inputContainer}>
                                    <label htmlFor="date" className={css.label}>MM/YY</label>
                                    <Input className={css.input} id="date" type="text" name="date" required onChange={(e) => setDate(e.target.value)}/>
                                </div>
                                <div className={css.inputContainer}>
                                    <label htmlFor="cvc" className={css.label}>CVC</label>
                                    <Input className={css.input} id="cvc" type="number" name="cvc" required />
                                </div>
                            </div>
                        </div>
                        <div className={css.render}>
                            <div className={css.renderTop}>
                                <img className={css.cardLogo} src={cardLogo} alt="card-logo" />
                                <div className={css.date}>{date}</div>
                            </div>
                            <div className={css.cardNumber}>{cardNumber}</div>
                            <div className={css.renderBottom}>
                                <img className={css.cardChip} src={cardChip} alt="card-logo" />
                                <img className={css.masterCard} src={masterCard} alt="card-logo" />
                            </div>
                        </div>
                    </div>
                    <input type="submit" className={css.saveBtn} value="Сохранить" />
                </form>
            </div>
        </div>
    )
}