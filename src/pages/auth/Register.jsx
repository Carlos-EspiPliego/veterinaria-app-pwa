import React from 'react'
import '../../styles/Inicio.scss'
import RegisterForm from '../../containers/auth/RegisterForm'

const Register = () => {
  return (
    <div className='background'>
      <div className='flex justify-center items-center h-screen px-4'>
        <RegisterForm/>
      </div>
    </div>
  )
}

export default Register