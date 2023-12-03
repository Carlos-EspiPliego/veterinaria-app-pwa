import React from 'react'

import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'
import Home from '../pages/User/Home'
import Historial from '../pages/User/Historial'

const UserNavigation = () => {
  console.log("Entró a UserNavigation")
  return (
    <Browser>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Historial" element={<Historial />} />
      </Routes>
    </Browser>
  )
}

export default UserNavigation