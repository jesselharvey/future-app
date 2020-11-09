import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { 
  fetchUser,
  fetchGoal,
  fetchTasks,
  fetchPosts,
  selectUser,
  selectGoal,
  selectTasks,
  selectPosts,
  addPost,
  deletePost,
  editPost,
  addTask,
} from './goalSlice'  
// import { Button } from 'antd'
import { Collapse, Card, Input, Statistic, Button } from 'antd';
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

  const goalObj = {
    id: 1,
    title: 'To do this',
    reason: 'Because of x and y',
    tasks: [
      // {
      //   id: 1,
      //   name: 'step 1',
      //   parent_id: null,
      // },
      // {
      //   id: 2,
      //   name: 'step 2',
      //   parent_id: null,
      // },
      // {
      //   id: 3,
      //   name: 'step 3',
      //   parent_id: null,
      // },
      // {
      //   id: 4,
      //   name: 'step 11',
      //   parent_id: null,
      // }, 
      // {
      //   id: 5,
      //   name: 'step 12',
      //   parent_id: 1,
      // },
      // {
      //   id: 6,
      //   name: 'sub 3',
      //   parent_id: 1,
      // },
      // {
      //   id: 7,
      //   name: 'sub step',
      //   parent_id: 1,
      // },
      // {
      //   id: 8,
      //   name: 'sub step 33',
      //   parent_id: 1,
      // },
      // {
      //   id: 9,
      //   name: 'sub step 23',
      //   parent_id: 1,
      // },
      // {
      //   id: 10,
      //   name: 'sub step 13',
      //   parent_id: 1,
      // },
    ],
    entries: [
      // {
      //   id: 1,
      //   date: '10-22-2020',
      //   content: 'This is my first entry!',
      // },
      // {
      //   id: 2,
      //   date: '10-31-2020',
      //   content: 'This is my Halloween entry!',
      // },
      // {
      //   id: 3,
      //   date: '11-3-2020',
      //   content: 'This is my last entry!',
      // },
      // {
      //   id: 4,
      //   date: '10-22-2020',
      //   content: 'This is my first entry!',
      // },
      // {
      //   id: 5,
      //   date: '10-31-2020',
      //   content: 'This is my Halloween entry!',
      // },
      // {
      //   id: 6,
      //   date: '11-3-2020',
      //   content: 'This is my last entry!',
      // },
      // {
      //   id: 7,
      //   date: '10-22-2020',
      //   content: 'This is my first entry!',
      // },
      // {
      //   id: 8,
      //   date: '10-31-2020',
      //   content: 'This is my Halloween entry!',
      // },
      // {
      //   id: 9,
      //   date: '11-3-2020',
      //   content: 'This is my last entry!',
      // },
      // {
      //   id: 10,
      //   date: '10-22-2020',
      //   content: 'This is my first entry!',
      // },
      // {
      //   id: 11,
      //   date: '10-22-2020',
      //   content: 'This is my first entry!',
      // },
      // {
      //   id: 12,
      //   date: '10-31-2020',
      //   content: 'This is my Halloween entry!',
      // },
      // {
      //   id: 13,
      //   date: '11-3-2020',
      //   content: 'This is my last entry!',
      // },
    ],
    finish_date: new Date(2020, 10, 7),
  }

  const [postText, setPostText] = useState('')
  const [taskText, setTaskText] = useState('')

  const dispatch = useDispatch()
  const goal = useSelector(selectGoal)
  const tasks = useSelector(selectTasks)
  const posts = useSelector(selectPosts)

  useEffect(() => {
    dispatch(fetchGoal(goalId))
    dispatch(fetchTasks(goalId))
    dispatch(fetchPosts(goalId))
  }, [dispatch])
  // console.log(goal)
  // console.log(tasks)
  // console.log(posts)

  function handlePostAdd(e) {
    e.preventDefault()
    dispatch(addPost(goalId, postText))
    setPostText('')
    dispatch(fetchPosts(goalId))
  }

  function handlePostDelete(id) {
    dispatch(deletePost(id))
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
      <div id="entryContainer">

          <Card className="inputEntryCard" title={'Add new entry!'}   >
            {/* <Input prefix={<FormOutlined />} /> */}
            <form onSubmit={(e) => handlePostAdd(e)}>
            <TextArea value={postText} onChange={(e) => setPostText(e.target.value)} autoSize={{minRows: 1, maxRows: 2}} />
            <button type="submit">Submit post</button>
            </form>
          </Card>
        
        <div id="entries">
          {posts.map(post => (
            //have to fix the normalization of the date data
            <Card className="inputEntryCard" title={post.date}>
              <div className="entryIcons">
                <CloseCircleOutlined onClick={() => handlePostDelete(post.id)} />
                <EditOutlined onClick={() => togglePostStatus(post.id)} />
              </div><br />
              {postStatus == false && toggleId !== post.id ? 
              <span>{post.description}</span> :
              <form onSubmit={(e) => handlePostEdit(e, post.id)}>
                <Input value={editPostText} onChange={(e) => setEditPostText(e.target.value)} defaultValue={post.description}></Input>
                <button type="submit">Edit post</button>
              </form>
              }
            </Card>
          ))}
        </div>
      </div>
      <div id="goalFooterContent">
        <Card className="inputEntryCard" title={'Add new task!'}   >
          {/* <Input prefix={<FormOutlined />} /> */}
          <form onSubmit={(e) => handleTaskAdd(e)}>
            <TextArea value={taskText} onChange={(e) => setTaskText(e.target.value)} autoSize={{minRows: 1, maxRows: 2}} />
            <button type="submit">Submit task</button>
          </form>
        </Card>
        <div id="accordianContainer">
          <Accordian tasks={tasks}></Accordian>
        </div>
        <div /*onClick={modal for editor}> */>
          <EditOutlined />
          <span>Edit Steps...</span>
        </div>
      </div>
      {/* <Button type="primary">Test</Button> */}
    </div>
  )
}