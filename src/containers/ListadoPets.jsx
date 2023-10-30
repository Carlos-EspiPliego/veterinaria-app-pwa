import React from 'react'
import ItemListPet from '@components/ItemListPet'
import useMascota from '@hooks/useMascotas'
import '@styles/ListadoPets.scss'

const ListadoPets = ( { pets, mascotaEdit, setMascotaEdit, showModal, handleClose, onDelete } ) => {

  return (
    <div>
      {pets.map((mascota) => {
        return <ItemListPet
          key = {mascota.id}
          idMascota = {mascota.id}
          mascota = {mascota}
          mascotaEdit = {mascotaEdit}
          setMascotaEdit = {setMascotaEdit}
          showModal = {showModal}
          handleClose={handleClose}
          onDelete={onDelete}
        />
      })}
    </div>
  )
}

export default ListadoPets