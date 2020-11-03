import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
    <form onSubmit={handle} className="authForm">
      <h1>Log in</h1>
      <label htmlFor="login">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="login"></input>
      <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password"></input>
      {/* <button type="submit">Login</button> */}
      <div >
        <LoginButton />
        <Link to={'/register'} ><RegisterButton /></Link>
      </div>
    </form>
  )
}

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const { register } = useAuth()
  function handle(e) {
    e.preventDefault()
    register(email, password).then((resp) => {
      history.push('/login')
    })
  }

  return (
    <form onSubmit={handle} className="authForm">
      <h1>Register</h1>
      <label htmlFor="login">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="login"></input>
      <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password"></input>
      {/* <button type="submit">Login</button> */}
      <div >
        <RegisterButton />
      </div>
    </form>
  )
}

// MULTI STEP GOAL FORM

