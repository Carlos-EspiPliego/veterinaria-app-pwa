import { BrowserRouter as Browser, Routes, Route, Navigate } from 'react-router-dom'
import Home from '@pages/Admin/Home'
import Clientes from '@pages/Admin/Clientes'
import Mascotas from '@pages/Admin/Mascotas'
import Historial from '@pages/Historial'
const AdminNavigation = () => {
  
  return (
    <Browser>
      <Routes>
        <Route path="/Citas" element={<Home />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Mascotas" element={<Mascotas />} />
        <Route path='/Historial' element={<Historial />}/>
      </Routes>
    </Browser>
  )
}

export default AdminNavigation