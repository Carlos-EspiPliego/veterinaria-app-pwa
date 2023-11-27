import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'
import Home from '@pages/Admin/Home'
import Clientes from '@pages/Admin/Clientes'
import Mascotas from '@pages/Admin/Mascotas'
import Historial from '@pages/Historial'
const AdminNavigation = () => {
  console.log("Entró a AdminNavigation")
  return (
    <Browser>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Mascotas" element={<Mascotas />} />
        <Route path='/Historial' element={<Historial />}/>
      </Routes>
    </Browser>
  )
}

export default AdminNavigation