import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { editPost } from '../components/goals/goalSlice'
import { Modal, Input } from 'antd'

export function AppModal(props) {
  // console.log(props.post)

  const [title, setTitle] = useState('')
  const [DT, setDT] = useState('')
  const [id, setId] = useState('')
  const [goalId, setGoalId] = useState('')
  // const [modalState, setModalState] = useState(null)
  useEffect(() => {
    const title = props.post.description
    const DT = props.post.date_time
    const id = props.post.id
    const goal_id = props.post.goal_id
    // const modalState = props.modalState
    // setModalState(modalState)
    setDT(DT)
    setTitle(title)
    setId(id)
    setGoalId(goal_id)
  }, [props.post])
  // console.log(modalState)
  console.log(props.post)


  function handleSubmit(e) {
    e.preventDefault()
    //patch request for the entry
    editPost(id, title, goalId)
  }
    // props.disableModal()

  return (
    <>
    <Modal
    className="entryModal"
    title={moment(DT).format('MMMM Do YYYY')}
    visible={props.post}>
      <form onSubmit={(e) => handleSubmit(e)} >
        <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
        <button type="submit">Edit Entry</button>
      </form> 
    </Modal>
    {/* <form>
      <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      <button type="submit">Edit Entry</button>
    </form> */}
    </>
  )
}