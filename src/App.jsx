import './App.css'

import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'

import Inicio from './pages/Inicio'
import Register from './pages/auth/Register'
import HomeAdmin from './pages/Admin/Home'
import HomeUser from './pages/User/Home'
import Clientes from '@pages/Admin/Clientes'
import Mascotas from '@pages/Admin/Mascotas'

function App() {

  return (
    <Browser>
      <Routes>
        <Route path="/PetCare" element={<Inicio/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/HomeAdmin" element={<HomeAdmin/>} />
        <Route path="/HomeUser" element={<HomeUser/>} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Mascotas" element={<Mascotas />} />
      </Routes>
    </Browser>
  )
}

export default App
