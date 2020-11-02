import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IncrementFormButton, DecrementFormButton } from '../../UI/Buttons'
import { selectFormIndex,
  selectTitle,
  selectReason,
  selectTasks,
  setTitleState,
  setReasonState,
  setTasksState,
  incrementIndex,
  decrementIndex
} from './goalFormSlice'

export function Title() {
const dispatch = useDispatch()
const [title, setTitle] = useState('')
const titleState = useSelector(selectTitle)

useEffect(() => {
  setTitle(titleState)
}, [])

function handleNext(e) {
  e.preventDefault()
  dispatch(setTitleState(title))
  dispatch(incrementIndex())
    // function handleIncrement() {
    // }
    // const saveState = () => {
    // }
}

// console.log(props.title)
// const x = title
  return (
    <div>
      <h3>Goal</h3>
      <label htmlFor="title">I want...</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="e.g. to gain muscle"></input>
      <button onClick={(e) => handleNext(e)} >Next</button>
      {/* <IncrementFormButton onClick={(e) => saveState(e)}/> */}
    </div>
  )
}

export function Reason() {
  const dispatch = useDispatch()
  const [reason, setReason] = useState('')
  // const titleState = useSelector(selectTitle)
  const reasonState = useSelector(selectReason)

useEffect(() => {
  setReason(reasonState)
}, [])

  function handleNext(e) {
    e.preventDefault()
    dispatch(setReasonState(reason))
    dispatch(incrementIndex())
  }
  // console.log(titleState)
  function handlePrevious(e) {
    e.preventDefault()
    dispatch(setReasonState(reason))
    dispatch(decrementIndex())
  }

  return (
    <div>
      <h3>Reason</h3>
      <label htmlFor="reason">Because...</label>
      <input value={reason} onChange={(e) => setReason(e.target.value)} type="text" placeholder="e.g. i'll look and feel healthier"></input>
      {/* <DecrementFormButton /> */}
      {/* <IncrementFormButton /> */}
      <button onClick={(e) => handlePrevious(e)} >Previous</button>
      <button onClick={(e) => handleNext(e)} >Next</button>
    </div>
  )
}

export function Tasks() {
  const dispatch = useDispatch()
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const taskState = useSelector(selectTasks)
  console.log(tasks)

  useEffect(() => {
    setTasks(taskState)
  }, [])


  function handleNext(e) {
    e.preventDefault()
    dispatch(setTasksState(tasks))
    dispatch(incrementIndex())
  }
  // console.log(titleState)
  function handlePrevious(e) {
    e.preventDefault()
    dispatch(setTasksState(tasks))
    dispatch(decrementIndex())
  }
  function handleTaskAdd(e) {
    e.preventDefault()
    setTasks([...tasks, task])
  }

  return (
    <div>
      <h3>Tasks</h3>
      <label htmlFor="tasks">So I must...</label>
      <input value={task} onChange={(e) => setTask(e.target.value)} type="text" placeholder="e.g. i'll look and feel healthier"></input>
      {/* <DecrementFormButton /> */}
      {/* <IncrementFormButton /> */}
      <button onClick={(e) => handleTaskAdd(e)} >Add Task</button>
      <button onClick={(e) => handlePrevious(e)} >Previous</button>
      <button onClick={(e) => handleNext(e)} >Next</button>
      <ol>
        {tasks.map((task) => (
          <li>{task}</li>
        ))}
      </ol>
    </div>
  )
}

// export function Tasks() {
// }

export function GoalForm() {
  const [title, setTitle] = useState('')
  const [reason, setReason] = useState('')

  // this.state.form = {
  //   title: '',
  // }

  const formState = {
    title: '',
  }

  const formIndex = useSelector(selectFormIndex)
  // console.log(formState.title)
  
  //   switch (formIndex) {
  //   case (formIndex === 1):
      
  //   break;
  // }


  const renderForm1 = formIndex === 1 ? <Title title={title} /> : ''
  const renderForm2 = formIndex === 2 ? <Reason /> : ''
  const renderForm3 = formIndex === 3 ? <Tasks /> : ''

  // const formArr = [title,
  //   reason,
  //   //tasks,
  // ]
  
  const tasksArr = []

  return (
    <form>
      {renderForm1 || renderForm2 || renderForm3}
      <DecrementFormButton />
      {/* {renderform2} */}
      {/* {for (let i = 0; i < formArr.length; i++) {}} */}
      {/* {formArr.map((question) => {
          console.log(question.props.children)
          return question.props.children
      })} */}
    </form>
  )
  // each question is an item in an array
  // track the state by the index of each array question
}