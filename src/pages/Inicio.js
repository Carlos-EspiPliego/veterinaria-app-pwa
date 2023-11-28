import '@styles/Inicio.scss'
import LoginForm from '@containers/auth/LoginForm';

import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '@features/auth/authSlice'
import { useState } from 'react';

const Inicio = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })

  const handleLogin = () => {
    console.log("HandleLogin: => " + JSON.stringify(userData, null, 2));
    const response = dispatch(loginAsync(userData))
    console.log("Response: => " + JSON.stringify(response, null, 2));
  }

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value })
  }

  const user = useSelector(state => state.auth)

  return (
    <div className='background'>
      <div className='flex justify-center items-center h-screen px-4'>
        <LoginForm
          userData={userData}
          handleInputChange={handleInputChange}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  )
}

export default Inicio