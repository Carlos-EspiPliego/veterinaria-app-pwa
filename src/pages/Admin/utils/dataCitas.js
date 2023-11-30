const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "CLIENTE", uid: "cliente.nombre", sortable: true },
  { name: "EMAIL", uid: "cliente.email", sortable: true },
  { name: "MASCOTA", uid: "mascota", sortable: false },
  { name: "FECHA Y HORA", uid: "fecha", sortable: true },
  { name: "DESCRIPCIÓN", uid: "descripcion", sortable: false },
  { name: "ACCIONES", uid: "actions" },
];

export { columns };