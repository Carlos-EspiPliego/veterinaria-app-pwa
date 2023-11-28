import React from 'react'
import { BrowserRouter as Browser, Routes, Route, Navigate } from 'react-router-dom'
import Inicio from '@pages/Inicio'

const AuthNavigation = () => {
    return (
        <Browser>
          <Routes >
            <Route path="/Inicio" element={<Inicio />} />
          </Routes>
        </Browser>
      )
    }

export default AuthNavigation