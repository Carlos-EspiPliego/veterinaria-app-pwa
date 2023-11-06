import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'
import Home from '../pages/Admin/Home'

const AdminNavigation = () => {
  return (
    <Browser>
      <Routes>
        <Route path="/HomeAdmin" element={<Home />} />
      </Routes>
    </Browser>
  )
}

export default AdminNavigation