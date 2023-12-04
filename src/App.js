import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from '@pages/Inicio';
import Home from '@pages/Admin/Home';
import Clientes from '@pages/Admin/Clientes';
import Mascotas from '@pages/Admin/Mascotas';
import MiHistorial from './pages/User/MiHistorial'
import Historial from '@pages/Admin/Historial'
import NotFound from './pages/NotFound';

const App = () => {
  const authState = useSelector((state) => state.auth);

  const renderNavigation = () => {
    if (authState.user.rol === 'ADMINISTRADOR') {
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Clientes" element={<Clientes />} />
          <Route path="/Mascotas" element={<Mascotas />} />
          <Route path="/Historial" element={<Historial />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      );
    } else if (authState.user.rol === 'CLIENTE') {
      return (
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/MiHistorial" element={<MiHistorial />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      );
    }
  };

  return <Router>{renderNavigation()}</Router>;
};

export default App;
