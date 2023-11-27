import React from 'react'
import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'
import Inicio from '@pages/Inicio'
import Register from '@pages/auth/Register'

const AuthNavigation = () => {
    return (
        <Browser>
          <Routes>
            <Route path="/" element={<Inicio />} />
          </Routes>
        </Browser>
      )
    }

export default AuthNavigation