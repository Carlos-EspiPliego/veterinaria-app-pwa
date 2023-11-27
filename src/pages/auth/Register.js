import React from 'react'
import '../../styles/Inicio.scss'
import RegisterForm from '../../containers/auth/RegisterForm'

import { useDispatch, useSelector } from 'react-redux'
import { registerAsync } from '@features/auth/authSlice'
import { useState } from 'react';

const Register = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    nombre: "",
    apellido: "",
    telefono: "",
    rol: "",
    veterinaria: {
      id: 1
    }
  })

  const handleInputChange = (name, value) => {
    if (name === 'veterinariaName') {
      // Si estás modificando el nombre de la veterinaria
      setUserData({
        ...userData,
        veterinaria: {
          ...userData.veterinaria,
          nombre: value
        }
      });
    } else {
      // Para otros campos en el estado userData
      setUserData({ ...userData, [name]: value });
    }
    console.log("HandleInputChange: => " + userData);
  }

  const handleRegister = () => {
    console.log("HandleRegister: => " + JSON.stringify(userData, null, 2));
    const response = dispatch(registerAsync(userData))
    console.log("Response: => " + JSON.stringify(response, null, 2));
  }

  return (
    <div className='background'>
      <div className='flex justify-center items-center h-screen px-4'>
        <RegisterForm
          userData={userData}
          handleInputChange={handleInputChange}
          handleRegister={handleRegister}
        />
      </div>
    </div>
  )
}

export default Register