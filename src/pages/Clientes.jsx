import React,{useState, useEffect, useRef} from 'react'
import NavBar from '@components/NavBar'
import ButtonNavBar from '@components/ButtonNavBar'
import FormClientes from "@containers/FormClientes"
import ListadoClientes from "@containers/ListadoClientes"
import ModalFormCliente from '@containers/ModalFormCliente'
import axios from "axios";
import '@styles/Clientes.scss'


const Clientes = () => {
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
    idCliente: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
  });

  const formCliente = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hanldeSubmit");
    const formData = new FormData(formCliente.current);

    if (client.idCliente === "" || client.idCliente === undefined) {
      console.log("Es una nueva cita -> ");
      console.log(client);

      const urlAdd = "http://srchicharron.com:8080/dancing-queen/clientes/addcliente";
      //const urlAdd = "http://localhost:2813/mascotas/addmascota";
      const newCliente = {
            nombre:formData.get('nombre'),
            apellidos:formData.get('apellidos'),
            telefono:formData.get('telefono'),
            email:formData.get('email')
      };
      console.log("Datos del nuevo cliente");
      console.log(newCliente);
      axios({
        method: "POST",
        url: urlAdd,
        data: JSON.stringify(newCliente),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      })
        .then((response) => {
          console.log(response);
          formatearFormulario();
          fetchClientes();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Se tiene que editar este cliente -> " + client.idCliente);
      console.log(client);

      const urlEdit = "http://srchicharron.com:8080/dancing-queen/clientes/updatecliente";
      //const urlEdit = "http://localhost:2813/mascotas/updatemascota";
      const newCliente = {
            id: client.idCliente,
            nombre:formData.get('nombre'),
            apellidos:formData.get('apellidos'),
            telefono:formData.get('telefono'),
            email:formData.get('email')
      };
      console.log("Datos del newCliente");
      console.log(newCliente);
      axios({
        method: "POST",
        url: urlEdit,
        data: JSON.stringify(newCliente),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      })
        .then((response) => {
          console.log(response);
          fetchClientes();
          formatearFormulario();
        })
        .catch((error) => {
          formatearFormulario();
          console.error(error);
        });
    }
    formatearFormulario();
  };

  const onDelete = () => {
    
    console.log("onDeleteOrigin");
    formatearFormulario();
    fetchClientes();
  };

  const formatearFormulario = () => {
    // LIMPIAR EL FORMULARIO
    setClient({
      idCliente: "",
      nombre: "",
      apellidos: "",
      telefono: "",
      email: "",
    });
  };

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
    console.log(client);
  };

  // ----------------- LISTAR LOS CLIENTES -----------------
  const urlGetClientes = 'http://srchicharron.com:8080/dancing-queen/clientes/getallclientes';
  
  const [clientes, setClientes] = useState([]);
  const fetchClientes = async () =>{
    const req = await axios.get(urlGetClientes);
    setClientes(req.data);
  };
  useEffect(()=>{
		fetchClientes();
	}, [])

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
            handleSubmit={handleSubmit} 
            handleChange={handleChange} 
            formatearFormulario={formatearFormulario}
            formCliente={formCliente}
            />)}
            <FormClientes 
              client={client}
              setClient={setClient}
              show={show}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              formatearFormulario={formatearFormulario}
              formCliente={formCliente}
            />
          </div>
          <div className='content__listClientes'>
            
            <ListadoClientes 
              clientes={clientes}
              clienteEdit={client}
              setClienteEdit={setClient}
              showModal={showModal}
              handleClose={handleClose}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
      <ButtonNavBar />
    </div>
  )
}

export default Clientes