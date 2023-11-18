import React from 'react'

import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'
import Home from '../pages/User/Home'

const UserNavigation = () => {
  return (
    <Browser>
      <Routes>
      <Route path="/HomeUser" element={<Home />} />
      </Routes>
    </Browser>
  )
}

export default UserNavigation