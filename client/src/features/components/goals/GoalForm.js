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
import { DatePicker, TimePicker, Space, Input, Steps } from 'antd';
import moment from 'moment';

export function Title() {
const dispatch = useDispatch()
const [title, setTitle] = useState('')
const titleState = useSelector(selectTitle)
const { TextArea } = Input;
const { Step } = Steps

useEffect(() => {
  setTitle(titleState)
}, [titleState])

function handleNext(e) {
  e.preventDefault()
  dispatch(setTitleState(title))
  dispatch(incrementIndex())
}

  return (
    <div className="onboarding-container">
      <div className="onboarding-steps">
        <Steps direction="horizontal" current={0}>
          <Step font="bold" title="The Goal" />
          <Step title="The Reason" />
          <Step title="The Steps" />
          <Step title="The Finish Line"/>
          <Step title="Confirm" />
        </Steps>
      </div>
      <div className="onboarding-body">
      <h3 className="onboarding-questions">What do we what to achieve?</h3>
      <TextArea rows={6} value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Your goal starts here..."></TextArea>
      <div className="onboarding-buttons">
      <button onClick={(e) => handleNext(e)} >Next</button>
      </div>
      </div>
    </div>
  )
}

export function Reason() {
  const dispatch = useDispatch()
  const [reason, setReason] = useState('')
  const reasonState = useSelector(selectReason)
  const { TextArea } = Input;
  const { Step } = Steps

useEffect(() => {
  setReason(reasonState)
}, [reasonState])

  function handleNext(e) {
    e.preventDefault()
    dispatch(setReasonState(reason))
    dispatch(incrementIndex())
  }
  
  function handlePrevious(e) {
    e.preventDefault()
    dispatch(setReasonState(reason))
    dispatch(decrementIndex())
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-steps">
        <Steps direction="horizontal" current={1}>
          <Step title="The Goal" />
          <Step title="The Reason" />
          <Step title="The Steps" />
          <Step title="The Finish Line" />
          <Step title="Confirm" />
        </Steps>
      </div>
      <div className="onboarding-body">
      <h3 className="onboarding-questions">Why do we want to accomplish this?</h3>
      <TextArea rows={6} value={reason} onChange={(e) => setReason(e.target.value)} type="text" placeholder="Purpose, motivations, benefits... "></TextArea>
      <div className="onboarding-buttons">
      <button style={{backgroundColor: "#FA4E4E"}} onClick={(e) => handlePrevious(e)} >Previous</button>
      <button onClick={(e) => handleNext(e)} >Next</button>
      </div>
      </div>
    </div>
  )
}

export function Tasks() {
  const dispatch = useDispatch()
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [hideBackground, setHideBackground] = useState(true)
  const taskState = useSelector(selectTasks)
  const { TextArea } = Input;
  const { Step } = Steps
  
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
    setHideBackground(false)
  }

  console.log(tasks)

  return (
    <div className="onboarding-container">
      <div className="onboarding-steps">
        <Steps direction="horizontal" current={2}>
          <Step title="The Goal" />
          <Step title="The Reason" />
          <Step title="The Steps" />
          <Step title="The Finish Line" />
          <Step title="Confirm" />
        </Steps>
      </div>
      <div className="onboarding-body" id="onboard-tasks">
      <h3 className="onboarding-questions">Neccessary tasks needed to meet this goal?</h3>
      <TextArea rows={3} value={task} onChange={(e) => setTask(e.target.value)} type="text" placeholder="Lets list a few..."></TextArea>
      <div className="onboard-tasks-buttons">
      <button className="add-tasks-button1" onClick={(e) => handleTaskAdd(e)} >Add Task</button>
      <button className="add-tasks-button2" onClick={(e) => handlePrevious(e)} >Previous</button>
      <button className="add-tasks-button3" onClick={(e) => handleNext(e)} >Next</button>
      </div>
      <ul className={hideBackground && tasks.length < 2 ? "hide-background" : "tasks-ul"}>
        {tasks.map((task) => (
          <li className="tasks-li" key={tasks.indexOf(task)} onClick={(e) => console.log(e.target)}>{task}</li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export function Timeframe() {
  const dispatch = useDispatch()
  const { Step } = Steps
  

  function handleNext(e) {
    e.preventDefault()
    // dispatch(setReasonState(timeframe))
    dispatch(incrementIndex())
  }
  
  function handlePrevious(e) {
    e.preventDefault()
    // dispatch(setReasonState(timeframe))
    dispatch(decrementIndex())
  }

  return (
    <div>
      <div className="onboarding-container">
        <div className="onboarding-steps">
          <Steps direction="horizontal" current={3}>
            <Step font="bold" title="The Goal" />
            <Step title="The Reason" />
            <Step title="The Steps" />
            <Step title="The Finish Line"/>
            <Step title="Confirm" />
          </Steps>
        </div>
        <div className="onboarding-body">
          <h1 className="onboarding-questions" id="timeframe-question-date">What date shall we set to reach our goal?</h1>
          <div className="onboarding-date-picker">
          <Space direction="horizontal" size={12}>
            <DatePicker size={100} />
          </Space>
          </div>
          <h1 className="onboarding-questions" id="timeframe-question-time">Do we want to narrow it down to the time of the day?</h1>
          <div className="onboarding-time-picker">
          <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} size="large" />
          </div>
          <div className="onboarding-buttons" id="timeframe-buttons">
      <button style={{backgroundColor: "#FA4E4E"}} onClick={(e) => handlePrevious(e)} >Previous</button>
      <button onClick={(e) => handleNext(e)} >Next</button>
      </div>
        </div>
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
  const { Step } = Steps

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
    <div className="onboarding-steps">
        <Steps direction="horizontal" current={4}>
          <Step title="The Goal" />
          <Step title="The Reason" />
          <Step title="The Steps" />
          <Step title="The Finish Line" />
          <Step title="Confirm" />
        </Steps>
      </div>
    <div className="onboarding-body">
    <h1 className="onboarding-questions">Are we set to start?</h1>
    <div className="confirm-form-body">
    <div>
      <span>My goal is: <strong>{title}</strong></span>
    </div>
    <div>
      <span>Because: <strong>{reason}</strong></span>
    </div>
    <div>
      <span>By the date of: <strong>2021-11-10</strong></span>
    </div>
    <div>
      <span>By the time of: <strong>12:00:00</strong></span>
    </div>
    <div>
      <span>Steps to accomplish my goal:</span>
      <ol>
      {tasks.map((task) => (
        <li key={tasks.indexOf(task)}><strong>{task}</strong></li>
      ))}
      </ol>
    </div>
    </div>
    <div className="onboarding-buttons">
    <button style={{backgroundColor: "#FA4E4E"}} onClick={(e) => handlePrevious(e)}>Previous</button>
    <button onClick={(e) => handleSubmit(e)}>Confirm goal</button>
    </div>
    </div>
  </div>
)
}

export function GoalForm() {
  const formIndex = useSelector(selectFormIndex)

  const renderForm1 = formIndex === 1 ? <Title /> : ''
  const renderForm2 = formIndex === 2 ? <Reason /> : ''
  const renderForm3 = formIndex === 3 ? <Tasks /> : ''
  const renderForm4 = formIndex === 4 ? <Timeframe /> : ''
  const renderForm5 = formIndex === 5 ? <Confirm /> : ''
  
  const tasksArr = []

  return (
    <form>
      {renderForm1 ||
       renderForm2 ||
       renderForm3 ||
       renderForm4 ||
       renderForm5}
    </form>
  )
  // each question is an item in an array
  // track the state by the index of each array question
}