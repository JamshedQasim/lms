import React from 'react'
import { Outlet } from 'react-router-dom'
const Educator = () => {
  return (
    <div>
      <h1> Educator Page </h1>
      <div>
        <Outlet />
      </div>
      <p>Welcome to the Educator section. Here you can manage courses, view student progress, and more.</p>
    </div>
  )
}

export default Educator
