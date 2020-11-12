import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { 
  fetchUser,
  fetchGoal,
  fetchTasks,
  fetchTask,
  fetchPosts,
  fetchPost,
  selectUser,
  selectGoal,
  selectTasks,
  selectTask,
  selectPosts,
  selectPost,
  addPost,
  deletePost,
  editPost,
  addTask,
  deleteTask,
} from './goalSlice'  
// import { Button } from 'antd'
import { Collapse, Card, Input, Statistic, Button, Modal, Popover, Form } from 'antd';
import { FormOutlined, EditOutlined, CloseCircleOutlined, ArrowsAltOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Accordian } from '../../UI/Accordian'
import { EntryModal } from '../../UI/AppModal'
import TaskEditModal from './TaskEditModal'
const { TextArea } = Input

export function GoalPage() {

  const { goalId } = useParams()
  const { taskId } = useParams()
  const { postId } = useParams()
  const { Panel } = Collapse
  const { Countdown } = Statistic
  function callback(key) {
    console.log(key)
  }

  const [postText, setPostText] = useState('')
  const [taskText, setTaskText] = useState('')

  const dispatch = useDispatch()
  const goal = useSelector(selectGoal)
  const tasks = useSelector(selectTasks)
  const posts = useSelector(selectPosts)
  const incomingPost = useSelector(selectPost)
  const post = incomingPost[0]

  useEffect(() => {
    dispatch(fetchGoal(goalId))
    dispatch(fetchTasks(goalId))
    dispatch(fetchPosts(goalId))
    // dispatch(fetchPost())
  }, [dispatch])
  // console.log(goal)
  // console.log(tasks)
  // console.log(posts)

  function handlePostAdd(e) {
    dispatch(addPost(goalId, new Date(), postText))
    setPostText('')
    dispatch(fetchPosts(goalId))
    setEntryInputModalState(false)
  }

  function handlePostDelete(id) {
    dispatch(deletePost(id, goalId))
    dispatch(fetchPosts(goalId))
    setEntryModalState(false)
  }
  
  // const [postStatus, setPostStatus] = useState(false)
  // let toggleId = 0

  // function togglePostStatus(id) {
  //   setPostStatus(!postStatus)
  //   toggleId = id
  //   console.log(toggleId)
  // }
  const [editPostText, setEditPostText] = useState(post == undefined ? '' : post.description)
  function handlePostEdit(e, id) {
    e.preventDefault()
    dispatch(editPost(id, editPostText, goalId))
    dispatch(fetchPosts(goalId))
    setEditPostText('')
    setEntryModalState(false)
    // setPostStatus(!postStatus)
  }

  const [entryInputModalState, setEntryInputModalState] = useState(false)
  function toggleEntryInputModal() {
    setEntryInputModalState(!entryInputModalState)
  }

  const [entryModalState, setEntryModalState] = useState(false)
  // let post_description = ''
  // function toggleEntryModal(post) {
  //   console.log(post)
  //   // dispatch(fetchPost(id))
  //   // setEntryModalState(!entryModalState)
  //   // return post == undefined ? '' : setEditPostText(post.description)
    
  // }
  // console.log(editPostText)

  function handleTaskAdd(e) {
    // e.preventDefault()
    dispatch(addTask(goalId, taskText))
    setTaskText('')
    dispatch(fetchTasks(goalId))
  }

  const [activeModal, setActiveModal] = useState(null)
  const [taskModalVisibility, setTaskModalVisibility] = useState(false)
  function toggleEntryModal(post) {
    setEntryModalState(true)
    setActiveModal(post)
    console.log(post)
    
    // dispatch(fetchPost(id))
    // setEntryModalState(!entryModalState)
    // return post == undefined ? '' : setEditPostText(post.description)
    
  }


  return (
    <div className="fade-in">
      <div id="goalHeader">
        <div>
          <h2>My goal is {goal.title}</h2>
          <h2>{goal.reason}</h2>
        </div>
        {goal.finish_line_date == null ?
        "" : 
        <Countdown title="Time left to accomplish your goal!" value={goal.finish_line_date} format="D HH:mm:ss" />}
      </div>
      <br />
      {/* <div id="entryContainer"> */}
          <div style={{marginLeft: '140px'}}>
            <Button onClick={() => toggleEntryInputModal()} className="addEntryButton" shape="round" icon={<PlusOutlined />}>
              New Entry
            </Button>
          </div>
          <Modal
          title="New Entry"
          visible={entryInputModalState}
          footer={null}
          onCancel={() => setEntryInputModalState(false) && setEditPostText('')}>
            <Form onFinish={handlePostAdd}>
              <TextArea value={postText} onChange={(e) => setPostText(e.target.value)} />
              <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
                <Button htmlType="submit">Submit Entry</Button>
              </div>
            </Form>
          </Modal>
        
        <div id="entries">
          {posts.map(post => (
            // postStatus == false && toggleId !== post.id ?
            <>
            <Card className="entryCard override" title={[moment(post.date_time).format('MMMM Do YYYY'),  "     ", <ArrowsAltOutlined onClick={() => toggleEntryModal(post)} />]}>
              {/* <div className="entryIcons">
                <CloseCircleOutlined onClick={() => handlePostDelete(post.id)} />
                <EditOutlined onClick={() => togglePostStatus(post.id)} />
              </div><br /> */}
              <span>{post.description}</span> 
            </Card>
            </>
          ))}
        </div>
        {activeModal && (
        <EntryModal 
          disableModal={() => setActiveModal(null)}
          // modalState={entryModalState}
          post={activeModal}
          ></EntryModal>
        )}
        {/* {post == undefined ? '' :
        <Modal
          className="entryModal"
          title={moment(post.date_time).format('MMMM Do YYYY')}
          visible={entryModalState}
          footer={<div className="entryIcons">
          <span>Delete entry</span><CloseCircleOutlined onClick={() => handlePostDelete(post.id)} />
          </div>}
          onCancel={() => setEntryModalState(false)}>
          <form onSubmit={(e) => handlePostEdit(e, post.id)}>
            <Input defaultValue={post.description} onChange={(e) => setEditPostText(e.target.value)}></Input>
            <button type="submit">Edit entry</button>
          </form>
        </Modal>
        } */}

      {/* </div> */}

      {taskModalVisibility && <TaskEditModal goalId={goalId} tasks={tasks} onClose={() => setTaskModalVisibility(false)} />}

      <div id="goalFooterContent">
        <div style={{display: 'flex', alignItems: 'flex-end', marginBottom: '1rem'}}>
          <Button onClick={() => setTaskModalVisibility(true)}><EditOutlined />Edit your goal</Button>
        </div>
        <Form className="taskInput" onFinish={(e) => handleTaskAdd(e)}>
        <Input.Group compact style={{display: 'flex'}}>
          <Input placeholder="Enter your task..." value={taskText} onChange={(e) => setTaskText(e.target.value)} />
          <Button htmlType="submit"><PlusOutlined /></Button>
          </Input.Group>
          {/* <Input value={taskText} onChange={(e) => setTaskText(e.target.value)}></Input>
          <button style={{width: '50%'}} type="submit">Add new task</button> */}
        </Form>
        <div id="accordianContainer">
          <Accordian goalId={goalId} goal={goal} tasks={tasks}></Accordian>
        </div>
      </div>
    </div>
  )
}