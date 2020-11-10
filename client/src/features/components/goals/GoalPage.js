import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { 
  fetchUser,
  fetchGoal,
  fetchTasks,
  fetchPosts,
  fetchPost,
  selectUser,
  selectGoal,
  selectTasks,
  selectPosts,
  selectPost,
  addPost,
  deletePost,
  editPost,
  addTask,
  deleteTask,
} from './goalSlice'  
// import { Button } from 'antd'
import { Collapse, Card, Input, Statistic, Button, Modal } from 'antd';
import { FormOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Accordian } from '../../UI/Accordian'

export function GoalPage() {

  const { goalId } = useParams()
  const { taskId } = useParams()
  const { postId } = useParams()
  const { Panel } = Collapse
  const { Countdown } = Statistic
  const { TextArea } = Input
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
    dispatch(fetchPost())
  }, [dispatch])
  // console.log(goal)
  // console.log(tasks)
  // console.log(posts)

  function handlePostAdd(e) {
    e.preventDefault()
    dispatch(addPost(goalId, new Date(), postText))
    setPostText('')
    dispatch(fetchPosts(goalId))
    setEntryInputModalState(false)
  }

  function handlePostDelete(id) {
    dispatch(deletePost(id, goalId))
    dispatch(fetchPosts(goalId))
  }
  
  const [postStatus, setPostStatus] = useState(false)
  let toggleId = 0

  function togglePostStatus(id) {
    setPostStatus(!postStatus)
    toggleId = id
    console.log(toggleId)
  }
  const [editPostText, setEditPostText] = useState('')
  function handlePostEdit(e, id) {
    e.preventDefault()
    dispatch(editPost(id, editPost))
    setEditPostText('')
    setPostStatus(!postStatus)
    //use some type of filter to edit a single one
  }
  function handleTaskAdd(e) {
    e.preventDefault()
    dispatch(addTask(goalId, taskText))
    setTaskText('')
    dispatch(fetchTasks(goalId))
  }

  const [entryInputModalState, setEntryInputModalState] = useState(false)
  function toggleEntryInputModal() {
    setEntryInputModalState(!entryInputModalState)
  }

  const [entryModalState, setEntryModalState] = useState(false)
  function toggleEntryModal(id) {
    dispatch(fetchPost(id))
    setEntryModalState(!entryModalState)
    console.log(post)
    
  }

  return (
    <div>
      <div id="goalHeader">
        <div>
          <h2>My goal is {goal.title}</h2>
          <h2>{goal.reason}</h2>
        </div>
        {goal.finish_line_date == null ?
        "Time goes here" : 
        <Countdown title="Time left to accomplish your goal!" value={goal.finish_line_date} format="D HH:mm:ss" />}
      </div>
      <br />
      {/* <div id="entryContainer"> */}
          <Button onClick={() => toggleEntryInputModal()} className="addEntryButton" shape="round" icon={<FormOutlined />}>
            New Entry
          </Button>
          <Modal
          title="New Entry"
          visible={entryInputModalState}
          footer={null}
          onCancel={() => setEntryInputModalState(false)}>
            <form onSubmit={(e) => handlePostAdd(e)}>
              <Input value={postText} onChange={(e) => setPostText(e.target.value)} />
              <button type="submit">Submit post</button>
            </form>
          </Modal>
          {/* <Card className="inputEntryCard" title={'Add new entry!'}   >
            <form onSubmit={(e) => handlePostAdd(e)}>
            <TextArea value={postText} onChange={(e) => setPostText(e.target.value)} autoSize={{minRows: 1, maxRows: 2}} />
            <button type="submit">Submit post</button>
            </form>
          </Card> */}
        
        <div id="entries">
          {posts.map(post => (
            // postStatus == false && toggleId !== post.id ?
            
            //have to fix the normalization of the date data
            <>
            <Card onClick={() => toggleEntryModal(post.id)} className="entryCard override" title={post.date_time}>
              <div className="entryIcons">
                <CloseCircleOutlined onClick={() => handlePostDelete(post.id)} />
                <EditOutlined onClick={() => togglePostStatus(post.id)} />
              </div><br />
              <span>{post.description}</span> 
            </Card>
            
            {/* <Modal
            title={post.date_time}
            visible={entryModalState && post.id}
            footer={null}
            onCancel={() => setEntryModalState(false)}>
              <p>{post.description}</p>
            </Modal> */}
            </>
            // : 
            // <Card className="inputEntryCard" title={post.date}>
            //   <div className="entryIcons">
            //     <CloseCircleOutlined onClick={() => handlePostDelete(post.id)} />
            //     <EditOutlined onClick={() => togglePostStatus(post.id)} />
            //   </div><br />
            //   <form onSubmit={(e) => handlePostEdit(e, post.id)}>
            //     <Input value={editPostText} onChange={(e) => setEditPostText(e.target.value)} defaultValue={post.description}></Input>
            //     <button type="submit">Edit post</button>
            //   </form>
            // </Card> 
              // {postStatus == false && toggleId !== post.id ? 
              // <span>{post.description}</span> :
              // <form onSubmit={(e) => handlePostEdit(e, post.id)}>
              //   <Input value={editPostText} onChange={(e) => setEditPostText(e.target.value)} defaultValue={post.description}></Input>
              //   <button type="submit">Edit post</button>
              // </form>
              // }
          ))}
        </div>
        {/* <Modal
          title={"date_time"}
          visible={entryModalState}
          footer={null}
          onCancel={() => setEntryModalState(false)}>
            <p>{post.description}</p>
        </Modal> */}
      {/* </div> */}
      <div id="goalFooterContent">
        {/* <Card className="inputEntryCard" title={'Add new task!'}   >
          <form onSubmit={(e) => handleTaskAdd(e)}>
            <TextArea value={taskText} onChange={(e) => setTaskText(e.target.value)} autoSize={{minRows: 1, maxRows: 2}} />
            <button type="submit">Submit task</button>
          </form>
        </Card> */}
        <form className="taskInput" onSubmit={(e) => handleTaskAdd(e)}>
          <Input value={taskText} onChange={(e) => setTaskText(e.target.value)}></Input>
          <button style={{width: '50%'}} type="submit">Add new task</button>
        </form>
        <div id="accordianContainer">
          <Accordian goalI={goalId} goal={goal} tasks={tasks}></Accordian>
        </div>
      </div>
      {/* <Button type="primary">Test</Button> */}
    </div>
  )
}