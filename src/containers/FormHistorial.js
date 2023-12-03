import { Button, Input, Select, SelectItem} from "@nextui-org/react";
import React, { useEffect, useState, useRef } from "react";
import "@styles/FormCliente.scss";

const FormHistorial = (props) => {
  const { historialData ,handleInputChange, handleRegisterHistorial, clientes, setClienteSeleccionado, mascotas, mascotasFiltradas, onActualizarHistorial } = props;
  const [isEditing, setIsEditing] = useState(false);
  console.log("historialData info:",historialData)
  useEffect(() => {
    if (historialData.id !== undefined) {
      setIsEditing(true);
    }
  }, [historialData.id]);
    return (
      <div className='formularioCliente'>
      {/* Campo de Fecha */}
      <Input
        label="Fecha y hora"
        type="datetime-local"
        className="mb-3"
        placeholder="Ingrese la fecha y hora del historial"
        variant="bordered"
        value={historialData.fecha}
        onChange={(e) => handleInputChange('fecha', e.target.value)}
      />

      {/* Campo de Malestar */}
      <Input
        label="Malestar"
        className="mb-3"
        value={historialData.malestar}
        onChange={(e) => handleInputChange('malestar', e.target.value)}
      />

      {/* Campo de Tratamiento */}
      <Input
        label="Tratamiento"
        className="mb-3"
        value={historialData.tratamiento}
        onChange={(e) => handleInputChange('tratamiento', e.target.value)}
      />

      {/* Campo de Selección de Cliente */}
      <Select
        items={clientes}
        label="Seleccionar Cliente"
        className="mb-3"
        value={historialData.cliente.username}
        onChange={(e) => {
          handleInputChange('clienteUsername', e.target.value)
          setClienteSeleccionado(e.target.value)
      }}
      >
        {clientes && clientes.map((cliente) => (
          <SelectItem key={cliente.username} value={cliente.username}>
            {cliente.username}
          </SelectItem>
        ))}
      </Select>

      {/* Campo de Selección de Mascota */}
      <Select
        items={mascotasFiltradas}
        label="Seleccionar Mascota"
        className="mb-3"
        value={historialData.mascota.nombre}
        onChange={(e) => handleInputChange('mascotaId', e.target.value)}
      >
        {(mascota) => <SelectItem key={mascota.id} value={mascota.nombre}>{mascota.nombre}</SelectItem>}
      </Select>

      {/* Botón de Envío */}
      <Button color="primary" radius='full' auto className='w-[100%] mb-3' onClick={() => {
          isEditing ? onActualizarHistorial() : handleRegisterHistorial()
        }}>
        {isEditing ? 'Editar historial' : 'Registrar historial'}
      </Button>
    </div>

      );
}

export default FormHistorial;
