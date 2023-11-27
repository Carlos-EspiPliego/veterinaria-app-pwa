import {useState, useEffect } from 'react'
import NavBar from '@components/NavBar'
import FormClientes from "@containers/FormClientes"
import ListadoClientes from "@containers/ListadoClientes"
import ModalFormCliente from '@containers/ModalFormCliente'

import { registrarCliente } from '../../services/admin/clientes/clientesApi'

import { useSelector } from 'react-redux';

import '@styles/Clientes.scss'


const Clientes = () => {
  const authState = useSelector(state => state.auth.user);
  // ----------------- VARIABLES PARA EL MODAL -----------------
  const [show, setShow] = useState(false);
  const showModal = () => {
    if (windowSize < 768) {
      setShow(!show);
    } else {
      setShow(!show);
    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // FUNCIÓN PARA OBTENER EL TAMAÑO DE LA PANTALLA
  const [windowSize, setWindowSize] = useState(window.innerWidth);

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

  // ----------------- VARIABLES PARA EL FORMULARIO -----------------
  const [client, setClient] = useState({
    username: "",
    password: "",
    email: "",
    nombre: "",
    apellido: "",
    telefono: "",
    rol: "CLIENTE",
    veterinaria:{
        id: authState.veterinaria.id
    }
  });

  const handleRegisterSubmit = () => {
    console.log("entro a handleRegisterSubmit");
    registrarCliente(client).then((response) => {
      console.log(response);
      formatearFormulario();
    });
  };

  const handleDelete = () => {
    
    
  };

  const formatearFormulario = () => {
    // LIMPIAR EL FORMULARIO
    setClient({
      username: "",
      password: "",
      email: "",
      nombre: "",
      apellido: "",
      telefono: "",
      rol: "CLIENTE",
      veterinaria:{
          id: authState.veterinaria.id
      }
    });
  };

  const handleInputChange = (name, value) => {
    setClient({ ...client, [name]: value });
    console.log(client);
  };

  return (
    <div>
      <NavBar />
      <div className='container__clientes main__container'>
        <div className='content__titleClientes'>
          <h3 className='title__citas'>ADMINISTRADOR DE CLIENTES</h3>
        </div>

        <div className='body__content'>
        <button className="button__citas button btn__addCliente" onClick={handleShow}>
            AGREGAR CLIENTE
          </button>
          <div className='content__formClientes'>
            {windowSize<768&&(<ModalFormCliente 
            client={client} 
            setCliente={setClient} 
            show={show} 
            handleClose={handleClose} 
            handleSubmit={handleRegisterSubmit}
            handleInputChange={handleInputChange} 
            // formCliente={formCliente}
            />)}
            <FormClientes 
              client={client}
              handleSubmit={handleRegisterSubmit}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className='content__listClientes'>
            
            {/* <ListadoClientes 
              // clientes={clientes}
              clienteEdit={client}
              setClienteEdit={setClient}
              showModal={showModal}
              handleClose={handleClose}
              onDelete={onDelete}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clientes