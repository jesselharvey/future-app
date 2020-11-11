import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Modal, Input } from 'antd'

export function AppModal(props) {
  console.log(props.post)

  const [title, setTitle] = useState('')
  const [DT, setDT] = useState('')
  useEffect(() => {
    const title = props.post.description
    const DT = props.post.date_time
    setDT(DT)
    setTitle(title)
    
  }, [props.post])


  function handleSubmit(e) {
    e.preventDefault()
    //patch request for the entry
    props.onClose()
  }

  return (
    <>
    <Modal
    className="entryModal"
    title={moment(DT).format('MMMM Do YYYY')}
    visible={props.post}>
      <form onSubmit={(e) => handleSubmit(e)} type="submit">
        <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
        <button>Edit Entry</button>
      </form> 
    </Modal>
    {/* <form>
      <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      <button type="submit">Edit Entry</button>
    </form> */}
    </>
  )
}