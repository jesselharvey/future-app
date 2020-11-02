import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrementIndex, incrementIndex, selectFormIndex } from '../components/goals/goalFormSlice'
// import { Link } from 'react-router-dom'

export function LoginButton() {

  return(
    <button>Log in</button>
  )
}

export function RegisterButton() {

  return (
    <button>Register</button>
  )
}

export function AddGoalButton(props) {

  return (
  <button>New Goal!</button>
  )
}

export function IncrementFormButton() {
  const dispatch = useDispatch()
  // const formIndex = useSelector(selectFormIndex)
  function handleIncrement(e) {
    e.preventDefault()
    dispatch(incrementIndex())
  }

  return (
    <button onClick={(e) => handleIncrement(e)}>Next</button>
  )
}

export function DecrementFormButton() {
  const dispatch = useDispatch()
  const formIndex = useSelector(selectFormIndex)
  function handleDecrement(e) {
    e.preventDefault()
    // console.log(formIndex)
    dispatch(decrementIndex())
  }

  return (
    <button onClick={(e) => handleDecrement(e)}>Previous</button>
  )
}