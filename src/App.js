import './App.css';
import React from 'react';
import {Unauthorized, Authorized} from './Pages'
import { withAuth } from './contexts';

function App(props) {
  const {isLoggedIn} = props


  return (
    <div className="App">
      {
        isLoggedIn
        ? <Authorized />
        : <Unauthorized  />
      }
    </div>
  )
}

export default withAuth(App);
