import react, { useState, useEffect } from "react";
import axios from "axios";

export const useGetMascotas = (url) => {
    // Uso de useState para guardar los datos de la API
    const [mascota, setMascota] = useState([]);

    // Uso de useEffect para consumir la API
    useEffect ( () => {
        const getMascotas = async () => {
          const response = await axios(url);
          setMascota(response.data);
        };
        getMascotas();
      }, [url]);
    return mascota;
}

export const useGetMascotasByCliente = (url, idCliente) => {
  // Uso de useState para guardar los datos de la API
  const [mascota, setMascota] = useState([]);

  // Uso de useEffect para consumir la API
  useEffect ( () => {
      const getMascotas = async () => {
        const response = await axios(url+idCliente);
        setMascota(response.data);
      };
      getMascotas();
    }, [url]);
  return mascota;
}

// FUNCIÓN PARA DAR DE ALTA MASCOTAS
export const useAddMascota = (url, mascotas) => {
    // Uso de useState para guardar los datos de la API
    const [mascota, setMascota] = useState([]);

    // Uso de useEffect para consumir la API
    useEffect(() => {
        const crearMascota = async () => {
          const response = await axios.post(url, mascotas);
          setMascota(response.data);
        };
        crearMascota();
      }, [url, mascotas]);
    return mascota;
}

// FUNCIÓN PARA EDITAR CITAS
export const useEditMascota = (url, citas) => {
    const [mascota, setMascota] = useState([]);

    useEffect(() => {
        const editarMascota = async () => {
          const response = await axios.put(url, mascotas);
          setMascota(response.data);
        };
        editarMascota();
      }, [url, mascotas]);
    return mascota;
}


// FUNCIÓN PARA ELIMINAR CITAS
export const useDeleteMascota = (url, mascotas) => {
    const [mascota, setMascota] = useState([]);

    useEffect(() => {
        const eliminarMascota = async () => {
          const response = await axios.delete(url, mascotas);
          setMascota(response.data);
        };
        eliminarMascota();
      }, [url, mascotas]);
    return mascota;
}



const mascotas = {
    useGetMascotas,
    useGetMascotasByCliente,
    useAddMascota,
    useEditMascota,
    useDeleteMascota
};

export default mascotas;