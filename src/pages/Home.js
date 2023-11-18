import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NavBar from "@components/NavBar";
import ButtonNavBar from "@components/ButtonNavBar";
import FormCitas from "@containers/FormCitas";
import ListadoCitas from "@containers/ListadoCitas";
import ModalFormCitas from "@containers/ModalFormCitas";
import useCitas from "@hooks/useCitas";
import "@styles/Home.scss";

const Home = () => {
  // ----------------- VARIABLES PARA EL MODAL -----------------
  const [show, setShow] = useState(false);
  const showModal = () => {
    if (windowSize < 768) {
      setShow(!show);
    } else {
      setShow(!show);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ----------------- OBTENER EL TAMAÑO DE LA PANTALLA -----------------
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
  const [cita, setCita] = useState({
    idCita: "",
    fecha: "",
    descripcion: "",
    idCliente: "",
    nombreCliente: "",
    apellidosCliente: "",
    idMascota: "",
    nombreMascota: "",
  });

  const formCita = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hanldeSubmit");
    const formData = new FormData(formCita.current);

    if (cita.idCita === "" || cita.idCita === undefined) {
      console.log("Es una nueva cita -> ");
      console.log(cita);

      const urlAdd = "http://srchicharron.com:8080/dancing-queen/citas/addcita";
      const newCita = {
        fecha: formData.get("fecha"),
        descripcion: formData.get("descripcion"),
        cliente: {
          id: formData.get("idCliente"),
        },
        mascota: {
          id: formData.get("idMascota"),
        },
      };
      console.log("Datos de la newCita");
      console.log(newCita);
      axios({
        method: "POST",
        url: urlAdd,
        data: JSON.stringify(newCita),
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
          getAllCitas();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Se tiene que editar esta cita -> " + cita.idCita);
      console.log(cita);

      const urlEdit = "http://srchicharron.com:8080/dancing-queen/citas/addcita";
      const newCita = {
        id: cita.idCita,
        fecha: formData.get("fecha"),
        descripcion: formData.get("descripcion"),
        cliente: {
          id: formData.get("idCliente"),
        },
        mascota: {
          id: formData.get("idMascota"),
        },
      };
      console.log("Datos de la newCita");
      console.log(newCita);
      axios({
        method: "POST",
        url: urlEdit,
        data: JSON.stringify(newCita),
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
          getAllCitas();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const formatearFormulario = () => {
    // LIMPIAR EL FORMULARIO
    setCita({
      idCita: "",
      fecha: "",
      descripcion: "",
      idCliente: "",
      nombreCliente: "",
      apellidosCliente: "",
      idMascota: "",
      nombreMascota: "",
    });
  };

  const handleChange = (event) => {
    setCita({ ...cita, [event.target.name]: event.target.value });
    console.log(cita);
  };

  // ----------------- LISTAR LAS CITAS -----------------
  const [citas, setCitas] = useState([]);
  const url = "http://srchicharron.com:8080/dancing-queen/citas/getallcitas";
  const getAllCitas = async () => {
    const req = await axios.get(url);
    setCitas(req.data);
  };
  useEffect(() => {
    getAllCitas();
  }, []);
  return (
    <div>
      <NavBar />
      {/* // Hacer una validación para cuando la pantalla sea menor a 768px mostrar el modal */}
      {windowSize < 768 && (
        <ModalFormCitas
          className="modalFormCitas"
          cita={cita}
          setCita={setCita}
          show={show}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formatearFormulario={formatearFormulario}
          formCita={formCita}
        />
      )}
      <div className="container__citas">
        <div className="content__titleCitas">
          <h3 className="title__citas">ADMINISTRADOR DE CITAS</h3>
        </div>

        <div className="body__content-home">
          <button className="button__citas button" onClick={handleShow}>
            AGREGAR CITA
          </button>
          <div className="content__formCitas">
            <FormCitas
              cita={cita}
              setCita={setCita}
              show={show}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              formatearFormulario={formatearFormulario}
              formCita={formCita}
              // citasDataInit={citaEdit}
            />
          </div>
          <div className="content__listCitas">
            <ListadoCitas
              citas={citas}
              setCitas={setCitas}
              citaEdit={cita}
              setCitaEdit={setCita}
              showModal={showModal}
              handleClose={handleClose}
              // citasDataInit={citaEdit}
              // setCitaEdit={setCitaEdit}
            />
          </div>
        </div>
      </div>
      <ButtonNavBar />
    </div>
  );
};

export default Home;
