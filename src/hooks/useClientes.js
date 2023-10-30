import react, { useState, useEffect } from "react";
import axios from "axios";

export const useGetClientes = (url) => {
    // Uso de useState para guardar los datos de la API
    const [cliente, setClientes] = useState([]);

    // Uso de useEffect para consumir la API
    useEffect (() => {
        const getClientes = async () => {
          const response = await axios(url);
          setClientes(response.data);
        };
        getClientes();
      }, [url]);
    return cliente;
}

const clientes = {
    useGetClientes,
};

export default clientes;