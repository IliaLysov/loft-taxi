import React, { useEffect, useState } from "react"
import css from './style.module.scss'
import { Switch, Input } from "@mui/material"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { serverStatus } from "../../modules/auth"
import { connect } from "react-redux"




function Auth(events) {
    
    const {isRegistered, setRegistration, send, serverStatus} = events

    const [isOffline, setIsOffline] = useState(false)

    useEffect(() => {
        if (localStorage.isOffline) {
            setIsOffline(JSON.parse(localStorage.isOffline))
        }
    }, [])

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
                        <div className={css.header}>Log in</div>
                        <div className={css.inputContainer}>
                            <div className={css.inputWrapper}>
                                <label htmlFor="email" className={css.label}>Email</label>
                                <Field type="email" name="email" id="email" component={InputWrapper}/>
                                <ErrorMessage name="email"/>
                            </div>
                            {!isRegistered
                            &&
                            <div className={css.inputWrapper}>
                                <label className={css.label} htmlFor="name">What is your name?*</label>
                                <Field type="text" name="name" id="name" component={InputWrapper}/>
                                <ErrorMessage name="name"/>
                            </div>
                            }
                            <div className={css.inputWrapper}>
                                <label className={css.label} htmlFor="password">Password</label>
                                <Field type="password" name="password" id="password" component={InputWrapper}/>
                                <ErrorMessage name="password"/>
                            </div>
                            {isRegistered
                            &&
                            <div className={css.passportQuestionWrapper}>
                                <div className={css.serverWrapper}>
                                    <label className={css.serverLabel} htmlFor="server">{isOffline ? "Offline" : "Online"}</label>
                                    <Switch name="server" checked={isOffline} onChange={e => {serverStatus(e.target.checked); setIsOffline(e.target.checked)}}/>
                                </div>
                                <button className={css.passportQuestionBtn} onClick={setRegistration}>Forgot your password?</button>
                            </div>
                            }
                        </div>
                        <input className={css.entryBtn} type="submit" id="submitButton" value={isRegistered ? "Log in" : "Register"} />
                        <div className={css.registrationWrapper}>
                            <div className={css.registrationQuestion}>{isRegistered ? "New user?" : "Already registered?"}</div>
                            <button className={css.registrationBtn} onClick={setRegistration}>{isRegistered ? "Register" : "Log in"}</button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default connect(state => ({}), {serverStatus})(Auth)