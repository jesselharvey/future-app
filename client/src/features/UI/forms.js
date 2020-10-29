import React from 'react'
import { LoginButton, RegisterButton } from './Buttons'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../authentication/auth'
// import api from '../../utils/request'

export function LoginForm() {
  const history = useHistory()
  const { login } = useAuth()
  function handle(e) {
    e.preventDefault()
    login('authTest', 'password').then((resp) => {
      history.push('/dashboard')
    })
  }

  return(
    <form onSubmit={handle} id="loginForm">
      <label htmlFor="login">Log in</label>
        <input type="text" name="login"></input>
      <label htmlFor="password">Password</label>
        <input type="password" name="password"></input>
      <div >
        <LoginButton />
        <RegisterButton />
      </div>
    </form>
  )
}