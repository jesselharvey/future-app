import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import {
  editPost,
  deletePost,
  fetchPosts,
  deleteTask,
  fetchTasks } from '../components/goals/goalSlice'
import { Modal, Input, Popover, Form, Button } from 'antd'
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
const { TextArea } = Input

export function EntryModal(props) {
  const dispatch = useDispatch()
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


  function handleSubmit() {
    // e.preventDefault()
    //patch request for the entry
    dispatch(editPost(id, title, goalId))
    props.disableModal()
  }

  function handlePostDelete(id) {
    dispatch(deletePost(id, goalId))
    dispatch(fetchPosts(goalId))
    props.disableModal()
  }

  
  return (
    <>
    <Modal
    className="entryModal"
    title={moment(DT).format('MMMM Do YYYY')}
    visible={props.post}
    onCancel={() => props.disableModal()}>
      <Form onFinish={(e) => handleSubmit()}>
        <TextArea value={title} onChange={(e) => setTitle(e.target.value)}></TextArea>
        <div className="buttonGroup">
          <Button onClick={() => handlePostDelete(id)}><DeleteOutlined/> Delete Entry</Button>
          <Button htmlType="submit" style={{marginTop: '1rem'}}><EditOutlined/>Edit Entry</Button>
        </div>
      </Form>
    </Modal>
    {/* <form>
      <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      <button type="submit">Edit Entry</button>
    </form> */}
    </>
  )
}

// export function TaskModal(props) {
//   const dispatch = useDispatch()
//   console.log(props.task)
//   const [description, setDescription] = useState('')
//   const [id, setId] = useState('')
  
//   useEffect(() => {
//     setDescription(props.task.description)
//     setId(props.task.id)
//   }, [props.task])

//   function handleSubmit(e) {
//     e.preventDefault()
//     //patch request for the entry
//     // dispatch(editPost(id, title, goalId))
//     props.disableModal()
//   }

//   function handleTaskDelete(id) {
//     // dispatch(deleteTask(id, goalId))
//     // dispatch(fetchTasks(goalId))
//     // props.disableModal()
//   }

//   return (
//     <>
//     <Modal
//     className="entryModal"
//     title={[
//     <Popover content={<span>Delete task.</span>} >
//       <DeleteOutlined onClick={() => handleTaskDelete(id)} />
//     </Popover>]}
//     visible={props.task}
//     onCancel={() => props.disableModal()}>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <Input value={description} onChange={(e) => setDescription(e.target.value)}></Input>
//         <button type="submit">Edit Entry</button>
//       </form>
//     </Modal>
//     </>
//   )
// }