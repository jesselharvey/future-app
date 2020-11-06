import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGoal, selectGoal } from '../goals/goalSlice'
// import { Button } from 'antd'
import { Collapse, Card, Input } from 'antd';
import { FormOutlined } from '@ant-design/icons'
import { Accordian } from '../../UI/Accordian'


export function GoalPage() {
  const { Panel } = Collapse

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
        name: 'sub step 1',
        parent_id: null,
      }, 
      {
        id: 5,
        name: 'sub step 2',
        parent_id: null,
      },
      {
        id: 6,
        name: 'sub step 3',
        parent_id: null,
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
    ]
  }

  const dispatch = useDispatch()
  const goal = useSelector(selectGoal)

  useEffect(() => {
    dispatch(fetchGoal())
  }, [dispatch])

  console.log(goal)

  return (
    <div>
      <div id="goalHeader">
        <h2>My goal is {goalObj.title}</h2>
        <h2>{goalObj.reason}</h2>
      </div>
      <br />
      <div id="entryContainer">
        <Card className="inputEntryCard" title={'Add new entry!'}   >
          <TextArea autoSize={{minRows: 1, maxRows: 2}} />
        </Card>
        <div id="entries">
          {goalObj.entries.map(entry => (
            <Card className="entryCard" title={entry.date}>
              <span>{entry.content}</span>
            </Card>
            // <span>{entry.content}</span>
          ))}
        </div>
      </div>
      <div id="accordianContainer">
          <Accordian goal={goalObj}></Accordian>
        {/* {goal.tasks.map(task => (
                  task.parent_id === null ? 
          <span>{task.name}</span>
          : ''
          ))} */}
      </div>
    {/* <Button type="primary">Test</Button> */}
    </div>
  )
}