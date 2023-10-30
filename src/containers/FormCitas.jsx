import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import useClientes from "@hooks/useClientes";
import useCitas from "@hooks/useCitas";
import useMascotas from "@hooks/useMascotas";
import "@styles/FormCitas.scss";

const FormCitas = ({ cita, setCita, handleSubmit, handleChange, formatearFormulario, formCita }) => {

  const [mascotas, setMascotas] = useState([]);
  const [idCliente, setIdCliente]=useState(0);
  const url ="http://srchicharron.com:8080/dancing-queen/clientes/getallclientes";
  const urlMascotas="http://srchicharron.com:8080/dancing-queen/mascotas/getmascotasbyclienteid?idCliente=";
  const clientes = useClientes.useGetClientes(url);

  const fetchMascotas = async () =>{
    const req = await axios.get(urlMascotas+idCliente);
    setMascotas(req.data);
  };

  const handleChange2nd = (event) => {
    setCita({ ...cita, [event.target.name]: event.target.value });
    setIdCliente(event.target.selectedIndex);
    console.log("id cliente "+idCliente);
    console.log(cita);
  };

  useEffect(() => {
    fetchMascotas();
  }, [idCliente]);

  return (
    <>
      <form className="form__citas" onSubmit={handleSubmit} ref={formCita}>
        <div className="container__inputs">
          <label htmlFor="idCliente" className="label__citas labels">
            Cliente
          </label>
          <select
            name="idCliente"
            className="input__citas inputs"
            onChange={handleChange2nd}
          >
            <option value={cita.idCliente}>
              {cita.nombreCliente + " " + cita.apellidosCliente}
            </option>
            {clientes.map((cliente, indice) => (
              <option key={indice} value={cliente.id}>
                {cliente.nombre + " " + cliente.apellidos}
              </option>
            ))}
          </select>
        </div>
        {/* SELECT CON EL LISTADO DE MASCOTAS */}
        <div className="container__inputs">
          <label htmlFor="idMascota" className="label__citas labels">
            Mascota
          </label>
          <select
            name="idMascota"
            className="input__citas inputs"
            onChange={handleChange}
          >
            <option value={cita.idMascota}>{cita.nombreMascota}</option>
            {mascotas.map((mascota, indice) => (
              <option key={indice} value={mascota.id}>
                {mascota.nombre}
              </option>
            ))}
          </select>
        </div>
        {/* INPUT DE FECHA Y HORA DE LA CITA */}
        <div className="container__inputs">
          <label htmlFor="fecha" className="label__citas labels">
            Fecha y hora
          </label>
          <input
            name="fecha"
            className="input__citas inputs"
            type="datetime-local"
            onChange={handleChange}
            value={cita.fecha}
          />
        </div>
        {/* DESCRIPCIÓN DE LA CITA */}
        <div className="container__inputs">
          <label htmlFor="descripcion" className="label__citas labels">
            Descripción
          </label>
          <textarea
            className="input__citas inputs"
            type="text"
            placeholder="Descripción"
            name="descripcion"
            onChange={handleChange}
            value={cita.descripcion}
          />
        </div>
        {/* BOTÓN PARA GUARDAR LA CITA */}
        <div className="container__inputs">
          <button type="submit" className="button__citasForm button">
            AGREGAR CITA
          </button>
        </div>
      </form>
    </>
  );
};

export default FormCitas;
