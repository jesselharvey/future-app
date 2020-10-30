import React, { useState } from 'react'
import { LoginButton, RegisterButton } from './Buttons'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../authentication/auth'
// import api from '../../utils/request'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const history = useHistory()
  const { login } = useAuth()
  function handle(e) {
    e.preventDefault()
    login(email, password).then((resp) => {
      history.push('/dashboard')
    })
  }

  return(
    <form onSubmit={handle} id="loginForm">
      <label htmlFor="login">Log in</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="login"></input>
      <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password"></input>
      <button type="submit">Login</button>
      {/* <div >
        <LoginButton />
        <RegisterButton />
      </div> */}
    </form>
  )
}

export function RegisterForm() {
  const history = useHistory()
  const { signup } = useAuth()
  function handle(e) {
    e.preventDefault()
    signup('test', 'password').then((resp) => {

    })
  }

}