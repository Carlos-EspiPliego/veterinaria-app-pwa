import React, { useEffect, useState } from "react";
import "@styles/FormPets.scss";
import "@styles/FormCitas.scss";

import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";

import { IconEye, IconEyeClosed, IconLogin2 } from '@tabler/icons-react';

import { useSelector } from "react-redux";

const FormPets = (props) => {
  const { handleInputChange, handleRegisterMascota, clientes, mascotaData, onActualizarMascota } = props;
  // console.log("MascotaData: " + JSON.stringify(mascotaData, null, 2));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (mascotaData.id !== undefined) {
      setIsEditing(true);
    }
  }, [mascotaData.id]);

  const sexos = [
    { value: 'Macho', label: 'Macho' },
    { value: 'Hembra', label: 'Hembra' },
  ]
  const especies = [
    { value: 'Perro', label: 'Perro' },
    { value: 'Gato', label: 'Gato' },
  ]

  return (
    <div className='formularioCliente'>
      <Input
        type="text"
        label="Nombre de la mascota"
        variant="bordered"
        value={mascotaData.nombre}
        placeholder="Nombre de la mascota"
        onChange={(e) => handleInputChange('nombre', e.target.value)}
        className="mb-3"
      />
      <Input
        label="Fecha de naciemiento"
        type="datetime-local"
        placeholder="Ingrese la fecha y hora estimada"
        variant="bordered"
        className="mb-3"
        value={mascotaData.fechaNacimiento}
        onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
      />
      <Input
        label="Peso"
        type="number"
        placeholder="Peso en kg"
        variant="bordered"
        className="mb-3"
        value={mascotaData.peso}
        onChange={(e) => handleInputChange('peso', e.target.value)}
      />
      <Input
        type="text"
        label="Raza"
        variant="bordered"
        value={mascotaData.raza}
        placeholder="Raza de la mascota"
        onChange={(e) => handleInputChange('raza', e.target.value)}
        className="mb-3"
      />
      <Select
        items={sexos}
        variant={'bordered'}
        label="Sexo"
        className="mb-3"
        selectedKeys={[mascotaData.sexo]}
        onChange={(e) => {
          handleInputChange('sexo', e.target.value)
        }}
      >
          {(sexo) => <SelectItem key={sexo.value} value={sexo.value}>{sexo.value}</SelectItem>}
      </Select>
      <Select
        items={especies}
        variant={'bordered'}
        label="Especie"
        className="mb-3"
        selectedKeys={[mascotaData.especie]}
        onChange={(e) => {
          handleInputChange('especie', e.target.value)
        }}
      >
          {(especie) => <SelectItem key={especie.value} value={especie.value}>{especie.value}</SelectItem>}
      </Select>
      <Select
        items={clientes}
        variant={'bordered'}
        label="Cliente"
        className="mb-3"
        selectedKeys={[mascotaData.cliente.username]}
        onChange={(e) => {
          handleInputChange('username', e.target.value)
        }}
      >
          {(cliente) => <SelectItem key={cliente.username} value={cliente.username}>{cliente.username}</SelectItem>}
      </Select>
      
      <Textarea
        variant={'bordered'}
        label="Notas extras"
        placeholder="Ingrese una breve nota de la mascota"
        className="mb-3"
        value={mascotaData.notas}
        onChange={(e) => handleInputChange('notas', e.target.value)}
      />
      <Button color="primary" radius='full' auto className='w-[100%] mb-3' onClick={() => {
          isEditing ? onActualizarMascota() : handleRegisterMascota()
        }}>
        {isEditing ? 'Editar mascota' : 'Registrar mascota'}
      </Button>
    </div>
  );
};

export default FormPets;
