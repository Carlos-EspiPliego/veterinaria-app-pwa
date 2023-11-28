import React from "react";
import ItemListHistorial from '@components/ItemListHistorial'
import '@styles/ListadoCitas.scss'

const ListadoHistorial = ( { citas, setCitas, citaEdit, setCitaEdit, showModal, handleClose } ) => {
  

  return (
    <div>
      {citas.map((cita) => {
        return <ItemListHistorial
          key = {cita.id}
          idCita = {cita.id}
          cita = {cita}
          citaEdit = {citaEdit}
          setCitaEdit = {setCitaEdit}
          showModal = {showModal}
          handleClose={handleClose}
        />
      })}
    </div>
  )
}

export default ListadoHistorial