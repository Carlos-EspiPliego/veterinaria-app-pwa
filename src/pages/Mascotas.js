import React, { useState, useEffect, useRef } from "react";
import NavBar from "@components/NavBar";
import ButtonNavBar from "@components/ButtonNavBar";
import FormPets from "@containers/FormPets";
import ListadoPets from "@containers/ListadoPets";
import ModalFormPets from "../containers/ModalFormPets";
import axios from "axios";
import "@styles/Mascotas.scss";

const Mascotas = () => {
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
  const [pet, setPet] = useState({
    idMascota: "",
    nombre: "",
    fechaNacimiento: "",
    peso: "",
    notas: "",
    idCliente: "",
    nombreCliente: "",
    apellidoCliente: "",
    sexo: "",
    especie: "",
    raza: "",
    edad: "",
  });

  const formMascota = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hanldeSubmit");
    const formData = new FormData(formMascota.current);

    if (pet.idMascota === "" || pet.idMascota === undefined) {
      console.log("Es una nueva cita -> ");
      console.log(pet);

      const urlAdd =
        "http://srchicharron.com:8080/dancing-queen/mascotas/addmascota";
      //const urlAdd = "http://localhost:2813/mascotas/addmascota";
      const newPet = {
        nombre: formData.get("nombreMascota"),
        fechaNacimiento: formData.get("fechaNacimiento"),
        peso: formData.get("peso"),
        notas: formData.get("notas"),
        sexo: formData.get("sexo"),
        especie: formData.get("especie"),
        raza: formData.get("raza"),
        cliente: {
          id: formData.get("idCliente"),
        },
      };
      console.log("Datos de la newPet");
      console.log(newPet);
      axios({
        method: "POST",
        url: urlAdd,
        data: JSON.stringify(newPet),
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
          fetchMascotas();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Se tiene que editar esta cita -> " + pet.idMascota);
      console.log(pet);

      const urlEdit =
        "http://srchicharron.com:8080/dancing-queen/mascotas/updatemascota";
      //const urlEdit = "http://localhost:2813/mascotas/updatemascota";
      const newPet = {
        id: pet.idMascota,
        nombre: formData.get("nombreMascota"),
        fechaNacimiento: formData.get("fechaNacimiento"),
        peso: formData.get("peso"),
        notas: formData.get("notas"),
        sexo: formData.get("sexo"),
        especie: formData.get("especie"),
        raza: formData.get("raza"),
        cliente: {
          id: formData.get("idCliente"),
        },
      };
      console.log("Datos de la newCita");
      console.log(newPet);
      axios({
        method: "POST",
        url: urlEdit,
        data: JSON.stringify(newPet),
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
          fetchMascotas();
          formatearFormulario();
        })
        .catch((error) => {
          formatearFormulario();
          console.error(error);
        });
    }
  };

  const onDelete = () => {
    console.log("onDeleteOrigin");
    formatearFormulario();
    fetchMascotas();
  };

  const formatearFormulario = () => {
    // LIMPIAR EL FORMULARIO
    setPet({
      idMascota: "",
      nombre: "",
      fechaNacimiento: "",
      peso: "",
      notas: "",
      idCliente: "",
      nombreCliente: "",
      apellidosCliente: "",
      sexo: "",
      especie: "",
      raza: "",
      edad: "",
    });
  };

  const handleChange = (event) => {
    setPet({ ...pet, [event.target.name]: event.target.value });
    console.log(pet);
  };

  // ----------------- LISTAR LAS MASCOTAS -----------------
  const urlGetPets =
    "http://srchicharron.com:8080/dancing-queen/mascotas/getmascotasbyclienteid?idCliente=";
  const [idCliente, setIdCliente] = useState(0);
  const [pets, setPets] = useState([]);
  const fetchMascotas = async () => {
    const req = await axios.get(urlGetPets + idCliente);
    setPets(req.data);
  };
  useEffect(() => {
    fetchMascotas();
  }, [idCliente]);
  return (
    <div>
      <NavBar />
      {windowSize < 768 && (
        <ModalFormPets
          className="modalFormCitas"
          pet={pet}
          setPet={setPet}
          show={show}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formatearFormulario={formatearFormulario}
          formMascota={formMascota}
          idCliente={idCliente}
          setIdCliente={setIdCliente}
        />
      )}
      <div className="container__pets main__container">
        <div className="content__titlePets">
          <h3 className="title__pets">ADMINISTRADOR DE MASCOTAS</h3>
        </div>

        <div className="body__content-pets">
          <button className="button__pets button" onClick={handleShow}>
            AGREGAR MASCOTA
          </button>
          <div className="content__formPets">
            <FormPets
              pet={pet}
              setPet={setPet}
              show={show}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              formatearFormulario={formatearFormulario}
              formMascota={formMascota}
              idCliente={idCliente}
              setIdCliente={setIdCliente}
            />
          </div>
          <div className="content__listPets">
            <ListadoPets
              pets={pets}
              mascotaEdit={pet}
              setMascotaEdit={setPet}
              showModal={showModal}
              handleClose={handleClose}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
      <ButtonNavBar />
    </div>
  );
};

export default Mascotas;
