import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginButton, RegisterButton } from './Buttons'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../authentication/auth'

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
    <div>
      <form onSubmit={handle} className="authForm">
        <button className="fake-logo login-logo">
          <h1 className="name-logo login-name">AppName</h1>
        </button>
        <input 
          className="login-reg-input" 
          value={email} onChange={(e) => setEmail(e.target.value)} 
          type="text" name="login" 
          placeholder="Email">
        </input>
        <input 
          className="login-reg-input" 
          value={password} onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          name="password" 
          placeholder="Password">
        </input>
        <div >
          <LoginButton />
          <Link style={{ color: 'darkslategrey' }} to={'/register'} >
            <RegisterButton />
          </Link>
        </div>
      </form>
    </div>
  )
}

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const history = useHistory()
  const { register } = useAuth()

  function handle(e) {
    e.preventDefault()
    if(password !== confirmPassword){
      alert('Must match password!')
    } else {
    register(name, email, password).then((resp) => {
      history.push('/login')
    })
  }
  }

  return (
    <form onSubmit={handle} className="authForm">
      <button className="fake-logo login-logo">
        <h1 className="name-logo login-name">AppName</h1>
      </button>
      <input 
        className="login-reg-input" 
        value={name} onChange={(e) => setName(e.target.value)} 
        type="text" name="name" 
        placeholder="Name">
      </input>
      <input 
        className="login-reg-input" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        type="text" 
        name="login" 
        placeholder="Email">
      </input>
      <input 
        className="login-reg-input" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        type="password" 
        name="password" 
        placeholder="Password">
        </input>
      <input 
        className="login-reg-input" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        type="password" name="confirmPassword" 
        placeholder="Confirm password">
      </input> 
      <div >
        <RegisterButton />
      </div>
    </form>
  )
}



