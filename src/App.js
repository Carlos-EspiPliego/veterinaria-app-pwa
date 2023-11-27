import './App.css'
import React from 'react'

import { useSelector } from 'react-redux';

import AuthNavigation from '@navigation/AuthNavigation';
import AdminNavigation from '@navigation/AdminNavigation';
import UserNavigation from '@navigation/UserNavigation';

function App() {
  const authState = useSelector(state => state.auth);

  return (
    <>
      {authState.status === 'success' && authState.currentUser && authState.currentUser.rol === 'ADMINISTRADOR' ? (
        <AdminNavigation />
      ) : authState.status === 'success' && authState.currentUser && authState.currentUser.rol === 'CLIENTE' ? (
        <UserNavigation />
      ) : (
        <AuthNavigation />
      )}
    </>
  )
}

export default App
