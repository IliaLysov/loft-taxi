import React from "react"

export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    const logIn = (email, password) => new Promise((resolve, reject) => {
        if (email !== 'valid@email.com' || password !== 'correctpassword') return reject('fail')

        resolve('success')

        setIsLoggedIn(true)
    })

    const logOut = () => {
        setIsLoggedIn(false)
    }

    const providerVariables = {
        isLoggedIn, logOut, logIn
    }

    return (
        <AuthContext.Provider value={providerVariables}>
            {children}
        </AuthContext.Provider>
    )
}

export const withAuth = (WrapperComponent) => {
    return class extends React.Component {
        render() {
            return (
                <AuthContext.Consumer>
                    {(value) => <WrapperComponent {...value} {...this.props} />}
                </AuthContext.Consumer>
            )
        }
    }
}