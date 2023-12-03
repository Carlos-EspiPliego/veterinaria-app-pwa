import React from 'react'
import ItemListPet from '@components/ItemListPet'
import useMascota from '@hooks/useMascotas'
import '@styles/ListadoPets.scss'

const ListadoPets = ( props ) => {
  const { mascotas, onDelete, setMascotaData, showModal } = props
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
          showModal = {showModal}
        />
      })}
    </div>
  )
}

export default ListadoPets