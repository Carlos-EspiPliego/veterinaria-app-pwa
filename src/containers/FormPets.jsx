import React, { useEffect, useState } from "react";
import useClientes from "@hooks/useClientes";
import useMascota from "@hooks/useMascotas";
import "@styles/FormPets.scss";
import "@styles/FormCitas.scss";

const FormPets = ({ pet, setPet,idCliente, setIdCliente, handleSubmit, handleChange,formMascota }) => {
  const url =
    "http://srchicharron.com:8080/dancing-queen/clientes/getallclientes";
  const clientes = useClientes.useGetClientes(url);
  console.log(pet);

  // VARIABLES PARA ALMACENAR LOS DATOS DEL FORMULARIO DE CITAS
  const handle2ndChange = (event) => {
    setPet({ ...pet, [event.target.name]: event.target.value });
    setIdCliente(event.target.selectedIndex);
    console.log(idCliente);
  };

  return (
    <>
      <form className="form__pets" onSubmit={handleSubmit} ref={formMascota}>
        <div className="container__inputs">
          <label htmlFor="idCliente" className="label__citas labels">
            Dueño
          </label>
          <select
            name="idCliente"
            className="input__citas inputs"
            onChange={handle2ndChange}
          >
            <option value={pet.idCliente}>
            {pet.nombreCliente + " " + pet.apellidoCliente}
            </option> 
            {clientes.map((cliente, indice) => (
              <option key={indice} value={cliente.id}>
                {cliente.nombre + " " + cliente.apellidos}
              </option>
            ))}
          </select>
        </div>
        <div className="container__inputs">
          <label htmlFor="nombreMascota" className=" labels">
            Nombre
          </label>
          <input
            name="nombreMascota"
            className=" inputs"
            type="text"
            placeholder="Nombre"
            onChange={handleChange}
            value={pet.nombreMascota}
          />
        </div>
        <div className="container__inputs">
          <label htmlFor="especie" className=" labels">
          Especie
          </label>
          <input
            name="especie"
            className=" inputs"
            type="text"
            placeholder="Especie"
            onChange={handleChange}
            value={pet.especie}
          />
        </div>
        <div className="container__inputs">
          <label htmlFor="raza" className=" labels">
            Raza
          </label>
          <input
            name="raza"
            className=" inputs"
            type="text"
            placeholder="Raza"
            onChange={handleChange}
            value={pet.raza}
          />
        </div>
        <div className="container__inputs">
          <label htmlFor="fechaNacimiento" className="label__citas labels">
            Fecha de Nacimiento
          </label>
          <input
            name="fechaNacimiento"
            className="input__citas inputs"
            type="datetime-local"
            onChange={handleChange}
            value={pet.fechaNacimiento}
          />
        </div>
        <div className="container__inputs">
          <label htmlFor="edad" className=" labels">
            Edad
          </label>
          <input
            name="edad"
            className=" inputs"
            type="number"
            placeholder="Edad"
            onChange={handleChange}
            value={pet.edad}
          />
        </div>
        <div className="container__inputs">
          <label htmlFor="peso" className=" labels">
            Peso
          </label>
          <input
            name="peso"
            className=" inputs"
            type="number"
            placeholder="Peso en kg"
            onChange={handleChange}
            value={pet.peso}
          />
        </div>
        <div className="container__inputs">
          <label htmlFor="sexo" className=" labels">
            Sexo
          </label>
          <input
            name="sexo"
            className=" inputs"
            type="text"
            placeholder="H o M"
            onChange={handleChange}
            value={pet.sexo}
          />
        </div>
        <div className="container__inputs">
          <label htmlFor="notas" className=" labels">
            Descripción General
          </label>
          <textarea
            className=" inputs textAreaPets"
            type="text"
            placeholder="Descripción general"
            name="notas"
            onChange={handleChange}
            value={pet.notas}
          />
        </div>
        {/* BOTÓN PARA GUARDAR LA CITA */}
        <div className="container__inputs">
          <button type="submit" className="button__citasPets button">
            AGREGAR MASCOTA
          </button>
        </div>
      </form>
    </>
  );
};

export default FormPets;
