import React from "react"
import css from './style.module.scss'
import Input from '@mui/material/Input'
// import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'




function Auth(events) {
    
    const {isRegistered, setRegistration, send} = events
    
    const SignupSchema = Yup.object().shape({
        name: !isRegistered && Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(4, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Required')
    });
    
    const InputWrapper = ({field, form, ...props}) => {
        return <Input className={css.input} {...field} {...props} />
    }
    
    return (
        <Formik
            onSubmit={send}
            initialValues={{ email: "", password: "", name: "" }}
            validationSchema={SignupSchema}
        >
            {({ handleSubmit, touched, errors }) => {
                return (
                    <Form onSubmit={handleSubmit} className={css.form}>
                        <div className={css.header}>Войти</div>
                        <div className={css.inputContainer}>
                            <div className={css.inputWrapper}>
                                <label htmlFor="email" className={css.label}>Email</label>
                                <Field type="email" name="email" component={InputWrapper}/>
                                <ErrorMessage name="email"/>
                            </div>
                            {!isRegistered
                            &&
                            <div className={css.inputWrapper}>
                                <label className={css.label} htmlFor="name">Как вас зовут?*</label>
                                <Field type="text" name="name" component={InputWrapper}/>
                                <ErrorMessage name="name"/>
                            </div>
                            }
                            <div className={css.inputWrapper}>
                                <label className={css.label} htmlFor="password">Password</label>
                                <Field type="password" name="password" component={InputWrapper}/>
                                <ErrorMessage name="password"/>
                            </div>
                            {isRegistered
                            &&
                            <div className={css.passportQuestionWrapper}>
                                <button className={css.passportQuestionBtn} onClick={setRegistration}>Забыли пароль?</button>
                            </div>
                            }
                        </div>
                        <input className={css.entryBtn} type="submit" value={isRegistered ? "Войти" : "Зарегистрироваться"} />
                        <div className={css.registrationWrapper}>
                            <div className={css.registrationQuestion}>{isRegistered ? "Новый пользователь?" : "Уже зарегистрированы?"}</div>
                            <button className={css.registrationBtn} onClick={setRegistration}>{isRegistered ? "Регистрация" : "Войти"}</button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
        

        // <form className={css.form} onSubmit={send}>
        //     <div className={css.header}>{isRegistered ? 'Войти' : 'Регистрация'}</div>
        //     <div className={css.inputContainer}>
        //         <div className={css.inputWrapper}>
        //             <label htmlFor="email" className={css.label}>Email</label>
        //             <Input className={css.input} id="email" type="email" required name="email" />
        //         </div>
        //         {!isRegistered
        //         &&
        //         <div className={css.inputWrapper}>
        //             <label className={css.label} htmlFor="name">Как вас зовут?*</label>
        //             <Input className={css.input} id="name" type="text" name="name" />
        //         </div>
        //         }
        //         <div className={css.inputWrapper}>
        //             <label className={css.label} htmlFor="password">Password</label>
        //             <Input className={css.input} id="password" type="password" required name="password" />
        //         </div>
        //         {isRegistered
        //         &&
        //         <div className={css.passportQuestionWrapper}>
        //             <button className={css.passportQuestionBtn} onClick={setRegistration}>Забыли пароль?</button>
        //         </div>
        //         }
        //     </div>
        //     <input className={css.entryBtn} type="submit" value={isRegistered ? "Войти" : "Зарегистрироваться"} />
        //     <div className={css.registrationWrapper}>
        //         <div className={css.registrationQuestion}>{isRegistered ? "Новый пользователь?" : "Уже зарегистрированы?"}</div>
        //         <button className={css.registrationBtn} onClick={setRegistration}>{isRegistered ? "Регистрация" : "Войти"}</button>
        //     </div>
        // </form>
    )
}

export default Auth