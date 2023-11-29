import React from 'react'
import ItemListPet from '@components/ItemListPet'
import useMascota from '@hooks/useMascotas'
import '@styles/ListadoPets.scss'

const ListadoPets = ( props ) => {
  const { mascotas, onDelete, setMascotaData } = props
  const mascotasInvertidas = [...mascotas].reverse();

  return (
    <div>
      {mascotasInvertidas.map((mascota) => {
        return <ItemListPet
          key = {mascota.id}
          idMascota = {mascota.id}
          mascota = {mascota}
          onDelete={onDelete}
          setMascotaData={setMascotaData}
          // mascotaEdit = {mascotaEdit}
          // setMascotaEdit = {setMascotaEdit}
          // showModal = {showModal}
          // handleClose={handleClose}
        />
      })}
    </div>
  )
}

export default ListadoPets