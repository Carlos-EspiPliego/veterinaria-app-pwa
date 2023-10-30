import React, { useEffect, useState} from "react";
import axios from "axios";
import useCitas from "@hooks/useCitas";
import ItemListCitas from '@components/ItemListCita'
import '@styles/ListadoCitas.scss'

const ListadoCitas = ( { citas, setCitas, citaEdit, setCitaEdit, showModal, handleClose } ) => {
  

  return (
    <div>
      {citas.map((cita) => {
        return <ItemListCitas
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

export default ListadoCitas