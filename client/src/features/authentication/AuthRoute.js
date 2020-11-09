import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './auth'

export default function AuthRoute(props) {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        return <Redirect to="/login"/>
        }
        return <Route {...props} />
}
