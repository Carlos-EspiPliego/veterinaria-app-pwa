import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'
import Home from '../pages/Admin/Home'
import Clientes from '@pages/Admin/Clientes'
import Mascotas from '@pages/Admin/Mascotas'

const AdminNavigation = () => {
  return (
    <Browser>
      <Routes>
        <Route path="/HomeAdmin" element={<Home />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Mascotas" element={<Mascotas />} />
      </Routes>
    </Browser>
  )
}

export default AdminNavigation