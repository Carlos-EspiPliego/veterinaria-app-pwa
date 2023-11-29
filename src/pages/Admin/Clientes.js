import { Button } from "@nextui-org/react";
import { useState, useEffect } from 'react'
import NavBar from '@components/NavBar'
import FormClientes from "@containers/FormClientes"
import ListadoClientes from "@containers/ListadoClientes"
import ModalFormCliente from '@containers/ModalFormCliente'

import { registrarCliente, eliminarCliente, actualizarCliente } from '../../services/admin/clientes/clientesApi'
import { getClientesAsync } from '@features/admin/clientes/clientesSlice'

import { useDispatch, useSelector } from 'react-redux';

import '@styles/Clientes.scss'


const Clientes = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  const [clientes, setClientes] = useState([]);
  const clientesRedux = useSelector((state) => state.clientes.users);
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
    veterinaria: {
      id: auth.veterinaria.id
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const clienteData = {
        rol: "CLIENTE",
        veterinaria: {
          id: auth.veterinaria.id,
        },
      };

      try {
        const clientesResponse = await dispatch(getClientesAsync(clienteData));
        // console.log("ClientesResponse clientes: " + JSON.stringify(clientesResponse.payload, null, 2));
        setClientes(clientesResponse.payload);
      } catch (error) {
        // Manejar errores si es necesario
        console.error("Error al obtener clientes:", error);
      }
    };

    fetchData();
  }, [dispatch, auth.veterinaria.id]);

  useEffect(() => {
    onGetClientes();
  }, []);

  const onGetClientes = () => {
    const clienteData = {
      rol: "CLIENTE",
      veterinaria: {
        id: auth.veterinaria.id,
      },
    };
    dispatch(getClientesAsync(clienteData));
  }

  const handleRegisterSubmit = () => {
    console.log("entro a handleRegisterSubmit");
    registrarCliente(client).then((response) => {
      console.log(response);
      formatearFormulario();
      onGetClientes();
      //CErrar modal
    });
    handleClose();
  };

  const handleDeleteCliente = (usernameCliente) => {
    const dataUser = {
      username: usernameCliente,
    }
    console.log("Entro a handleDeleteCliente xd : => " + JSON.stringify(dataUser, null, 2));
    eliminarCliente(dataUser).then((response) => {
      console.log(response);
      onGetClientes();
    });
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
      veterinaria: {
        id: auth.veterinaria.id
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
          <div className="md:hidden">
            <Button color="primary" radius='full' auto className='w-[100%] mb-3' onPress={handleShow} >
              Agregar cliente
            </Button>

          </div>
          <div className='content__formClientes'>
            {windowSize < 768 && (<ModalFormCliente
              client={client}
              show={show}
              handleClose={handleClose}
              handleSubmit={handleRegisterSubmit}
              handleInputChange={handleInputChange}
            />)}
            <FormClientes
              client={client}
              handleSubmit={handleRegisterSubmit}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className='content__listClientes'>

            <ListadoClientes
              clientes={clientes}
              // clienteEdit={client}
              // setClienteEdit={setClient}
              // showModal={showModal}
              // handleClose={handleClose}
              onDelete={handleDeleteCliente}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clientes