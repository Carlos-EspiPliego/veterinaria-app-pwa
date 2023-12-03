import React, { useState, useEffect, useRef } from "react";
import NavBar from "@components/NavBar";
import ButtonNavBar from "@components/ButtonNavBar";
import FormPets from "@containers/FormPets";
import ListadoPets from "@containers/ListadoPets";
import ModalFormPets from "@containers/ModalFormPets";
import "@styles/Mascotas.scss";

import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@nextui-org/react";
import SuccessAlert from "@components/alerts/Alerts";

import { getMascotasAsync, registrarMascotaAsync, eliminarMascotaAsync, editarMascotaAsync } from "@features/admin/mascotas/mascotasSlice";
import { getClientesAsync } from "@features/admin/clientes/clientesSlice";

const Mascotas = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  const clientes = useSelector((state) => state.clientes.users);
  const mascotas = useSelector((state) => state.mascotas.mascotas);
  const [show, setShow] = useState(false);
  const showModal = () => {
    if (windowSize < 768) {
      setShow(!show);
    } else {
      setShow(!show);
    }
  };
  const handleClose = () => {
    setShow(false)
    formatearFormulario()
  };
  const handleShow = () => setShow(true);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [mascotaData, setMascotaData] = useState({
    nombre: "",
    fechaNacimiento: "",
    peso: "",
    raza: "",
    sexo: "",
    especie: "",
    notas: "",
    cliente: {
      username: "",
    }
  })

  useEffect(() => {
    // Función que se ejecuta cada vez que cambia el tamaño de la ventana
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    // Añadir un event listener para el evento "resize"
    window.addEventListener("resize", handleResize);
    // Llamar a la función handleResize al inicio para comprobar el tamaño inicial de la pantalla
    handleResize();
    // Limpiar el event listener al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (mascotas.length === 0) {
    const mascotaData = {
      veterinaria: {
        id: auth.veterinaria.id
      }
    }
    dispatch(getMascotasAsync(mascotaData));
  }

  if (clientes.length === 0) {
    const clienteData = {
      rol: "CLIENTE",
      veterinaria: {
        id: auth.veterinaria.id,
      },
    };
    dispatch(getClientesAsync(clienteData));
  }

  const handleRegisterMascota = () => {
    dispatch(registrarMascotaAsync(mascotaData));
    handleClose();
    formatearFormulario();
    SuccessAlert("Mascota registrada correctamente");
  };

  const onDelete = (id) => {
    const dataMascota = {
      id: id
    }
    dispatch(eliminarMascotaAsync(dataMascota));
    SuccessAlert("Mascota eliminada correctamente");
  };

  const onActualizarMascota = () => {
    dispatch(editarMascotaAsync(mascotaData));
    handleClose();
    formatearFormulario();
    SuccessAlert("Mascota actualizada correctamente");
  }

  const formatearFormulario = () => {
    setMascotaData({
      nombre: "",
      fechaNacimiento: "",
      peso: "",
      raza: "",
      sexo: "",
      especie: "",
      notas: "",
      cliente: {
        username: "",
      }
    })

  };

  const handleInputChange = (name, value) => {
    if (name === 'username') {
      setMascotaData({
        ...mascotaData,
        cliente: {
          ...mascotaData.cliente,
          username: value
        }
      })
    } else {
      setMascotaData({
        ...mascotaData,
        [name]: value
      })
    }
    console.log("MascotaInputChange: " + JSON.stringify(mascotaData, null, 2));
  };

  return (
    <div>
      <NavBar />
      {windowSize < 768 && (
        <ModalFormPets
          show={show}
          handleClose={handleClose}
          clientes={clientes}
          handleRegisterMascota={handleRegisterMascota}
          handleInputChange={handleInputChange}
          mascotaData={mascotaData}
          onActualizarMascota={onActualizarMascota}
        />
      )}
      <div className="container__pets main__container">
        <div className="content__titlePets">
          <h3 className="title__pets">ADMINISTRADOR DE MASCOTAS</h3>
        </div>

        <div className="body__content-pets">
          <Button color="primary" radius='full' auto className='w-[100%] mb-3' onPress={handleShow} >
            AGREGAR MASCOTA
          </Button>
          <div className="content__formPets">
            <FormPets
              show={show}
              handleClose={handleClose}
              clientes={clientes}
              handleRegisterMascota={handleRegisterMascota}
              handleInputChange={handleInputChange}
              mascotaData={mascotaData}
              onActualizarMascota={onActualizarMascota}
            />
          </div>
          <div className="content__listPets">
            <ListadoPets
              mascotas={mascotas}
              onDelete={onDelete}
              setMascotaData={setMascotaData}
              showModal={showModal}
            // handleClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mascotas;
