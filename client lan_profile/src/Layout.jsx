import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './componemts/Navbar'

export function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
