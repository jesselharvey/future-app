import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchGoal, selectGoal } from '../goals/goalSlice'
// import { Button } from 'antd'
import { Collapse, Card, Input, Statistic } from 'antd';
import { FormOutlined, EditOutlined } from '@ant-design/icons'
import { Accordian } from '../../UI/Accordian'


export function GoalPage() {
  const { goalId } = useParams()
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
      {
        id: 1,
        name: 'step 1',
        parent_id: null,
      },
      {
        id: 2,
        name: 'step 2',
        parent_id: null,
      },
      {
        id: 3,
        name: 'step 3',
        parent_id: null,
      },
      {
        id: 4,
        name: 'step 11',
        parent_id: null,
      }, 
      {
        id: 5,
        name: 'step 12',
        parent_id: 1,
      },
      {
        id: 6,
        name: 'sub 3',
        parent_id: 1,
      },
      {
        id: 7,
        name: 'sub step',
        parent_id: 1,
      },
      {
        id: 8,
        name: 'sub step 33',
        parent_id: 1,
      },
      {
        id: 9,
        name: 'sub step 23',
        parent_id: 1,
      },
      {
        id: 10,
        name: 'sub step 13',
        parent_id: 1,
      },
    ],
    entries: [
      {
        id: 1,
        date: '10-22-2020',
        content: 'This is my first entry!',
      },
      {
        id: 2,
        date: '10-31-2020',
        content: 'This is my Halloween entry!',
      },
      {
        id: 3,
        date: '11-3-2020',
        content: 'This is my last entry!',
      },
      {
        id: 4,
        date: '10-22-2020',
        content: 'This is my first entry!',
      },
      {
        id: 5,
        date: '10-31-2020',
        content: 'This is my Halloween entry!',
      },
      {
        id: 6,
        date: '11-3-2020',
        content: 'This is my last entry!',
      },
      {
        id: 7,
        date: '10-22-2020',
        content: 'This is my first entry!',
      },
      {
        id: 8,
        date: '10-31-2020',
        content: 'This is my Halloween entry!',
      },
      {
        id: 9,
        date: '11-3-2020',
        content: 'This is my last entry!',
      },
      {
        id: 10,
        date: '10-22-2020',
        content: 'This is my first entry!',
      },
      {
        id: 11,
        date: '10-22-2020',
        content: 'This is my first entry!',
      },
      {
        id: 12,
        date: '10-31-2020',
        content: 'This is my Halloween entry!',
      },
      {
        id: 13,
        date: '11-3-2020',
        content: 'This is my last entry!',
      },
    ],
    finish_date: new Date(2020, 10, 7),
  }

  const [entryText, setEntryText] = useState('')
  const [taskTest, setTaskTest] = useState('')

  const dispatch = useDispatch()
  const goal = useSelector(selectGoal)

  useEffect(() => {
    dispatch(fetchGoal(goalId))
  }, [dispatch])

  return (
    <div>
      <div id="goalHeader">
        <div>
          <h2>My goal is {goalObj.title}</h2>
          <h2>{goalObj.reason}</h2>
        </div>
        <Countdown title="Time left to accomplish your goal!" value={goalObj.finish_date} format="D HH:mm:ss" />
      </div>
      <br />
      <div id="entryContainer">
        <Card className="inputEntryCard" title={'Add new entry!'}   >
          {/* <Input prefix={<FormOutlined />} /> */}
          <TextArea autoSize={{minRows: 1, maxRows: 2}} />
        </Card>
        <div id="entries">
          {goalObj.entries.map(entry => (
            <Card className="inputEntryCard" title={entry.date}>
              <span>{entry.content}</span>
            </Card>
            // <span>{entry.content}</span>
          ))}
        </div>
      </div>
      <div id="goalFooterContent">
        <div id="accordianContainer">
            <Accordian goal={goalObj}></Accordian>
          {/* {goal.tasks.map(task => (
                    task.parent_id === null ? 
            <span>{task.name}</span>
            : ''
            ))} */}
        </div>
        <div /*onClick={modal for editor}> */>
          <EditOutlined />
          <span>Edit Steps...</span>
        </div>
        {/* <Card className="inputTaskCard" title={'Add new entry!'}   >
            <Input prefix={<FormOutlined />} />
            <TextArea autoSize={{minRows: 1, maxRows: 2}} />
          </Card> */}
      </div>
      {/* <Button type="primary">Test</Button> */}
    </div>
  )
}