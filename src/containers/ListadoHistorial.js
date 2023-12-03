import React from "react";
import ItemListHistorial from '@components/ItemListHistorial'

const ListadoHistorial = ( props ) => {
    const { historiales, onDeleteHistorial, setHistorialData } = props;
    // Asegúrate de que historiales sea un array
  const historialesArray = Array.isArray(historiales) ? historiales : [];

  // Invierte el array
  const historialesinvertidos = [...historialesArray].reverse();
  return (
    <div>
      {historialesinvertidos.length > 0 ? (
        historialesinvertidos.map((historial) => (
          <ItemListHistorial
            key={historial.id}
            idHistorial={historial.id}
            historial={historial}
            onDeleteHistorial={onDeleteHistorial}
            setHistorialData={setHistorialData}
          />
        ))
      ) : (
        <h2>No hay historiales registrados</h2>
      )}
    </div>
  )
}

export default ListadoHistorial