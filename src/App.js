import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from '@pages/Inicio';
import Home from '@pages/Admin/Home';
import Clientes from '@pages/Admin/Clientes';
import Mascotas from '@pages/Admin/Mascotas';

const App = () => {
  const authState = useSelector((state) => state.auth);

  const renderNavigation = () => {
    if (authState.user.rol === 'ADMINISTRADOR') {
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Clientes" element={<Clientes />} />
          <Route path="/Mascotas" element={<Mascotas />} />
          <Route path="*" element={<Home />} />
        </Routes>
      );
    } else if (authState.user.rol === 'CLIENTE') {
      return (
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
        </Routes>
      );
    } else {
      // Assuming 'AuthNavigation' for other roles
      return (
        <Routes>
          <Route path="/" element={<Inicio />} />
          {/* //Agregar una ruta por si no encuentra alguna otra */}
          <Route path="*" element={<Inicio />} />
        </Routes>
      );
    }
  };

  return <Router>{renderNavigation()}</Router>;
};

export default App;
