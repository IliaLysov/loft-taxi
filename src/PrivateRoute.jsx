import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";


export const PrivateRoute = connect(state => ({isLoggedIn: state.auth.isLoggedIn}))(({isLoggedIn}) => {
    return isLoggedIn ? <Outlet /> : <Navigate to="/login"/>
})