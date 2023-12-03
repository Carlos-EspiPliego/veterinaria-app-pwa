import React from "react";
import ItemListHistorialCliente from '../components/ItemListHistorialCliente'

const ListadoHistorialClientes = ( props ) => {
    const { historiales } = props;
    const historialesArray = Array.isArray(historiales) ? historiales : [];

    const historialesinvertidos = [...historialesArray].reverse();
  return (
    <div>
      {historialesinvertidos.length > 0 ? (
        historialesinvertidos.map((historial) => (
          <ItemListHistorialCliente
            
            key={historial.id}
            idHistorial={historial.id}
            historial={historial}
          />
        ))
      ) : (
        <h2>No hay historiales registrados</h2>
      )}
    </div>
  )
}

export default ListadoHistorialClientes