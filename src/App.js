import './App.css';
import React from 'react';
import {Unauthorized, Authorized} from './Pages'
import {connect} from 'react-redux'
// import {Routes, Route} from 'react-router-dom'
// import {PrivateRoute} from './PrivateRoute'


function App(props) {
  const {isLoggedIn} = props

  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<PrivateRoute/>}>
          <Route path="/" element={<Authorized/>}/>
        </Route>
        <Route path="/login" element={<Unauthorized/>} />
      </Routes> */}
      {
        isLoggedIn
        ? <Authorized />
        : <Unauthorized/>
      }
    </div>
  )
}

export default connect(state => ({isLoggedIn: state.auth.isLoggedIn}))(App);