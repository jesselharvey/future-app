import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { IncrementFormButton, DecrementFormButton } from '../../UI/Buttons'
import { selectFormIndex,
  selectTitle,
  selectReason,
  selectTasks,
  selectDate,
  selectTime,
  setTitleState,
  setReasonState,
  setTasksState,
  setDateState,
  setTimeState,
  incrementIndex,
  decrementIndex,
  submitGoalForm,
  clearAllForms
} from './goalFormSlice'
import { useHistory } from 'react-router-dom'
import Navbar from '../../UI/Nav'
import { Dashboard }from '../dashboard/Dashboard'
import { DatePicker, TimePicker, Space, Input, Steps, Card, Spin } from 'antd';
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
      <button style={{backgroundColor: "#FFFFFF"}} onClick={(e) => handlePrevious(e)} >Previous</button>
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
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const dateState = useSelector(selectDate)
  const timeState = useSelector(selectTime)
  const { Step } = Steps

  useEffect(() => {
    setDate(dateState)
    setTime(timeState)
  }, [dateState, timeState])

  function onChangeDate(dateData, dateString) {
    const dateValue = dateString
    console.log(dateValue)
    dispatch(setDateState(dateValue))
  }

  function onChangeTime(timeData, timeString) {
    const timeValue = timeString
    console.log(timeValue)
    dispatch(setTimeState(timeValue))
  }

  function handleNext(e) {
    e.preventDefault()
    dispatch(incrementIndex())
  }
  
  function handlePrevious(e) {
    e.preventDefault()
    dispatch(decrementIndex())
  }

  const [checked, setChecked] = useState(false)
  const handleCheck = () => setChecked(!checked)  

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
            <DatePicker onChange={onChangeDate} disabled={checked == false ? false : true} size={100}/>
          </Space>
          </div>
          <h1 className="onboarding-questions" id="timeframe-question-time">Do we want to narrow it down to the time of the day?</h1>
          <div className="onboarding-time-picker">
          <TimePicker use12Hours format="h:mm a" onChange={onChangeTime} disabled={checked == false ? false : true} size="large"/>
          </div>
          <div>
            <h1 className="onboarding-questions" id="timeframe-question-forever">Or will this become a habit with no deadline?</h1>
          </div>
          <div className="input-frame">
            <input className="forever-checkbox" type="checkbox" onClick={handleCheck} checked={checked}/>
          </div>
          <div className="onboarding-buttons" id="timeframe-buttons">
          <button style={{backgroundColor: "#FFFFFF"}} onClick={(e) => handlePrevious(e)} >Previous</button>
          <button onClick={(e) => handleNext(e)} >Next</button>
      </div>
        </div>
      </div>
    </div>
  )
}

export function Confirm(props) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [reason, setReason] = useState('')
  const [tasks, setTasks] = useState([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const titleState = useSelector(selectTitle)
  const reasonState = useSelector(selectReason)
  const taskState = useSelector(selectTasks)
  const dateState = useSelector(selectDate)
  const timeState = useSelector(selectTime)
  const { Step } = Steps

  const [spin, setSpin] = useState(false)
  const handleSpin = () => setSpin(!spin)

useEffect(() => {
  setTitle(titleState)
  setReason(reasonState)
  setTasks(taskState)
  setDate(dateState)
  setTime(timeState)
}, [titleState, reasonState, taskState, dateState, timeState])


function handlePrevious(e) {
  e.preventDefault()
  dispatch(decrementIndex())
}



function handleSubmit(e) {
  e.preventDefault()
  handleSpin()
  dispatch(submitGoalForm(title, reason, date, time, tasks)).then((resp) => {
    setTimeout(() => {
    props.close()
    dispatch(clearAllForms())
    }, 750);
  })
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
    <div className="confirm-left-side">
    <div>
      <Card><span>The Goal: <i>{title}</i></span></Card>
    </div>
    <div>
      <Card><span>The Reason: <i>{reason}</i></span></Card>
    </div>
    <div>
      <Card><span>The Day: <i>{date == '' ? 'is not necessary' : date}</i></span></Card>
    </div>
    <div>
      <Card><span>The Time: <i>{time == '' ? 'is not necessary' : time}</i></span></Card>
    </div>
    </div>
    <div className="confirm-right-side">
    <div>
      <Card><span>Steps to accomplish my goal:</span>
      <ol>
      {tasks.map((task) => (
        <li key={tasks.indexOf(task)}><i>{task}</i></li>
      ))}
      </ol>
      </Card>
    </div>
    </div>
    </div>
    <div className="onboarding-buttons" id="confirm-buttons">
    <button style={{backgroundColor: "#FFFFFF"}} onClick={(e) => handlePrevious(e)}>Previous</button>
    <button onClick={(e) => handleSubmit(e)}>Confirm goal</button>
    <Spin size="large" spinning={spin}/>
    </div>
    </div>
  </div>
)
}

export function GoalForm(props) {
  const formIndex = useSelector(selectFormIndex)

  const renderForm1 = formIndex === 1 ? <Title /> : ''
  const renderForm2 = formIndex === 2 ? <Reason /> : ''
  const renderForm3 = formIndex === 3 ? <Tasks /> : ''
  const renderForm4 = formIndex === 4 ? <Timeframe /> : ''
  const renderForm5 = formIndex === 5 ? <Confirm close={props.close} /> : ''
  
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