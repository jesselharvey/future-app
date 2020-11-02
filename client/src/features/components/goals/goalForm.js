import React from 'react'
import { useState, useSelector } from 'react-redux'
import { IncrementFormButton, DecrementFormButton } from '../../UI/Buttons'
import { selectFormIndex } from './goalFormSlice'

export function Title() {


  return (
    <div>
      <h3>Goal</h3>
      <label htmlFor="title">I want...</label>
      <input type="text" placeholder="e.g. to gain muscle"></input>
    </div>
  )
}

export function Reason() {


  return (
    <div>
      <h3>Reason</h3>
      <label htmlFor="title">Because...</label>
      <input type="text" placeholder="e.g. i'll look and feel healthier"></input>
    </div>
  )
}

export function GoalForm() {


  const formIndex = useSelector(selectFormIndex)
  console.log(formIndex)
  
  //   switch (formIndex) {
  //   case (formIndex === 1):
      
  //   break;
  // }


  const renderForm1 = formIndex === 1 ? <Title /> : ''
  const renderForm2 = formIndex === 2 ? <Reason /> : ''

  // const formArr = [title,
  //   reason,
  //   //tasks,
  // ]
  
  const tasksArr = []

  return (
    <form>
      {renderForm1 || renderForm2}
      {/* {renderform2} */}
      {/* {for (let i = 0; i < formArr.length; i++) {}} */}
      {/* {formArr.map((question) => {
          console.log(question.props.children)
          return question.props.children
      })} */}
      <DecrementFormButton />
      <IncrementFormButton />
    </form>
  )
  // each question is an item in an array
  // track the state by the index of each array question
}