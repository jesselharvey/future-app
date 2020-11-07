import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Breadcrumb } from 'antd'

export default function Navbar () {
  const dispatch = useDispatch()
  
  function signout() {
    dispatch(localStorage.clear())
  }

  return (
    <div className="header">
      <Breadcrumb id="nav-bar">
        <button className="fake-logo">
          <h1 className="name-logo">AppName</h1>
        </button>
        <Breadcrumb.Item><a href="">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="">Archives</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="">Settings</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="" onClick={() => signout()} >Logout</a></Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}