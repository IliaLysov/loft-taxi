import './App.css';
import React from 'react';
import {Unauthorized, Authorized} from './Pages'
import {connect} from 'react-redux'

function App(props) {
  const {isLoggedIn} = props

  return (
    <div className="App">
      {
        isLoggedIn
        ? <Authorized />
        : <Unauthorized/>
      }
    </div>
  )
}

export default connect(state => ({isLoggedIn: state.auth.isLoggedIn}))(App);