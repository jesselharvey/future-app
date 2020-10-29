import React from 'react'

export function LoginForm() {

  return(
    <form>
      <label htmlFor="login">Log in</label>
        <input type="text" name="login"></input>
      <label htmlFor="password">Password</label>
        <input type="password" name="password"></input>
    </form>
  )
}