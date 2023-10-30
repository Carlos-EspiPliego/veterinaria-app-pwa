import react, { useState, useEffect } from "react";
import axios from "axios";

export const useGetCitas = (url) => {
  // Uso de useState para guardar los datos de la API
  const [citas, setCitas] = useState([]);

  // Uso de useEffect para consumir la API
  useEffect ( () => {
      const getCitas = async () => {
        const response = await axios(url);
        setCitas(response.data);
      };
      getCitas();
    }, [url]);
  return citas;
}

// FUNCIÓN PARA DAR DE ALTA CITAS
export const useAddCita = (url, newCita) => {
  // Uso de useState para guardar los datos de la API
  const [cita, setCita] = useState([]);

  // Uso de useEffect para consumir la API
  useEffect(() => {
    const crearCita = async () => {
      const response = await axios.post(url, newCita);
      setCita(response.data);
    };
    crearCita();
  }, [url, newCita]);
  return cita;
};

// FUNCIÓN PARA EDITAR CITAS
export const useEditCita = (url, citas) => {
  const [cita, setCita] = useState([]);

  useEffect(() => {
    const editarCita = async () => {
      const response = await axios.put(url, citas);
      setCita(response.data);
    };
    editarCita();
  }, [url, citas]);
  return cita;
};

// FUNCIÓN PARA ELIMINAR CITAS
export const useDeleteCita = (url, idCita) => {
  const [cita, setCita] = useState({
    idCita: "",
  });
  setCita({
    idCita: idCita,
  });
  const urlDelete = "http://srchicharron.com:8080/dancing-queen/citas/deletecita";

  useEffect(() => {
    const eliminarCita = async () => {
      const response = await axios.delete(urlDelete, cita);
      setCita(response.data);
    };
    eliminarCita();
  }, [url, idCita]);
  return cita;
};

const citas = {
  useGetCitas,
  useAddCita,
  useEditCita,
  useDeleteCita,
};

export default citas;
