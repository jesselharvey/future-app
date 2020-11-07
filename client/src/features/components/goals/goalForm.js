import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { IncrementFormButton, DecrementFormButton } from '../../UI/Buttons'
import { selectFormIndex,
  selectTitle,
  selectReason,
  selectTasks,
  setTitleState,
  setReasonState,
  setTasksState,
  incrementIndex,
  decrementIndex,
  submitGoalForm,
  clearGoalFormState
} from './goalFormSlice'
import Navbar from '../../UI/Nav'

export function Title() {
const dispatch = useDispatch()
const [title, setTitle] = useState('')
const titleState = useSelector(selectTitle)

useEffect(() => {
  setTitle(titleState)
}, [titleState])

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
    <div className="onboarding-container">
      <div className="onboarding-nav-bar">
      <Navbar />  
      </div>
      <div className="onboarding-body"></div>
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
}, [reasonState])

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
    <div className="onboarding-container">
      <div className="onboarding-nav-bar">
      <Navbar />  
      </div>
      <div className="onboarding-body">
      <h3>Reason</h3>
      <label htmlFor="reason">Because...</label>
      <input value={reason} onChange={(e) => setReason(e.target.value)} type="text" placeholder="e.g. i'll look and feel healthier"></input>
      {/* <DecrementFormButton /> */}
      {/* <IncrementFormButton /> */}
      <button onClick={(e) => handlePrevious(e)} >Previous</button>
      <button onClick={(e) => handleNext(e)} >Next</button>
      </div>
    </div>
  )
}

export function Tasks() {
  const dispatch = useDispatch()
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const taskState = useSelector(selectTasks)
  
  useEffect(() => {
    setTasks(taskState)
    console.log(taskState)
  }, [taskState])


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
    setTask('')
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-nav-bar">
      <Navbar />  
      </div>
      <div className="onboarding-body">
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
          <li key={tasks.indexOf(task)} onClick={(e) => console.log(e.target)}>{task}</li>
        ))}
      </ol>
      </div>
    </div>
  )
}

export function Confirm() {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [reason, setReason] = useState('')
  const [tasks, setTasks] = useState([])

  const titleState = useSelector(selectTitle)
  const reasonState = useSelector(selectReason)
  const taskState = useSelector(selectTasks)

useEffect(() => {
  setTitle(titleState)
  setReason(reasonState)
  setTasks(taskState)
}, [titleState, reasonState, taskState])
console.log(tasks)

function handlePrevious(e) {
  e.preventDefault()
  dispatch(decrementIndex())
}

function handleSubmit(e) {
  e.preventDefault()
  dispatch(submitGoalForm(title, reason, tasks))
  
  // dispatch(clearGoalFormState())
  
}

return(
  <div className="onboarding-container">
    <div className="onboarding-nav-bar">
    <Navbar />  
    </div>
    <div className="onboarding-body">
    <h1>Confirm</h1>
    <div>
      <span>My goal is: <strong>{title}</strong></span>
    </div>
    <div>
      <span>Because: <strong>{reason}</strong></span>
    </div>
    <div>
      <span>Steps to accomplish my goal:</span>
      <ol>
      {tasks.map((task) => (
        <li key={tasks.indexOf(task)}><strong>{task}</strong></li>
      ))}
      </ol>
    </div>
    <button onClick={(e) => handlePrevious(e)}>Previous</button>
    <button onClick={(e) => handleSubmit(e)}>Confirm goal</button>
    </div>
  </div>
)
}

// export function Tasks() {
// }

export function GoalForm() {
  // const [title, setTitle] = useState('')
  // const [reason, setReason] = useState('')

  // this.state.form = {
  //   title: '',
  // }

  // const formState = {
  //   title: '',
  // }

  const formIndex = useSelector(selectFormIndex)
  // console.log(formState.title)
  
  //   switch (formIndex) {
  //   case (formIndex === 1):
      
  //   break;
  // }


  const renderForm1 = formIndex === 1 ? <Title /> : ''
  const renderForm2 = formIndex === 2 ? <Reason /> : ''
  const renderForm3 = formIndex === 3 ? <Tasks /> : ''
  const renderForm4 = formIndex === 4 ? <Confirm /> : ''

  // const formArr = [title,
  //   reason,
  //   //tasks,
  // ]
  
  const tasksArr = []

  return (
    <form>
      {renderForm1 ||
       renderForm2 ||
       renderForm3 ||
       renderForm4}
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