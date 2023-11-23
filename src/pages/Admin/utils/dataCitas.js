const columns = [
  { name: "ID", uid: "idCita", sortable: true },
  { name: "CLIENTE", uid: "cliente.name", sortable: true },
  { name: "EMAIL", uid: "cliente.email", sortable: true },
  { name: "MASCOTAS", uid: "mascotas", sortable: false },
  { name: "FECHA Y HORA", uid: "fechaHora", sortable: true },
  { name: "ESTATUS", uid: "estatus", sortable: true },
    { name: "ACCIONES", uid: "actions" },
];

const statusOptions = [
  { name: "PENDIENTE", uid: "pendiente" },
  { name: "COMPLETADA", uid: "completada" },
  { name: "CANCELADA", uid: "cancelada" },
  // Agrega más opciones de estatus según tus necesidades
];

const citas = [
    {
      idCita: 1,
      fechaHora: "2021-10-01T12:00",
      motivo: "Revisión general ya que no ha estado muy bien en estos días",
      estatus: "PENDIENTE",
      cliente: {
        id: 1,
        name: "Tony Reichert",
        email: "tony@gmail.com",
        cellphone: "1234567890",
        role: "ROLE_USER",
      },
      mascotas: [
        {
          id: 1,
          name: "Pugberto",
          fechaNacimiento: "2019-10-01",
          edad: "2 años",
          raza: "Pug",
          especie: "PERRO",
        },
        {
          id: 2,
          name: "Miauricio",
          fechaNacimiento: "2019-10-01",
          edad: "2 años",
          raza: "De le calle",
          especie: "PERRO",
        },
      ],
    },
    {
      idCita: 2,
      fechaHora: "2021-10-03T15:30",
      motivo: "Vacunación anual",
      estatus: "PENDIENTE",
      cliente: {
        id: 2,
        name: "Maria Rodriguez",
        email: "maria@gmail.com",
        cellphone: "9876543210",
        role: "ROLE_USER",
      },
      mascotas: [
        {
          id: 3,
          name: "Whiskers",
          fechaNacimiento: "2020-05-15",
          edad: "1 año",
          raza: "Siamés",
          especie: "GATO",
        },
      ],
    },
    {
      idCita: 3,
      fechaHora: "2021-11-05T10:45",
      motivo: "Corte de pelo y baño",
      estatus: "COMPLETADA",
      cliente: {
        id: 3,
        name: "Juan Pérez",
        email: "juan@gmail.com",
        cellphone: "5556667777",
        role: "ROLE_USER",
      },
      mascotas: [
        {
          id: 4,
          name: "Rocky",
          fechaNacimiento: "2018-03-20",
          edad: "4 años",
          raza: "Labrador",
          especie: "PERRO",
        },
      ],
    },
    {
      idCita: 4,
      fechaHora: "2021-12-10T09:00",
      motivo: "Control de peso",
      estatus: "PENDIENTE",
      cliente: {
        id: 4,
        name: "Ana Gutiérrez",
        email: "ana@gmail.com",
        cellphone: "1112223333",
        role: "ROLE_USER",
      },
      mascotas: [
        {
          id: 5,
          name: "Fluffy",
          fechaNacimiento: "2020-02-14",
          edad: "3 años",
          raza: "Persa",
          especie: "GATO",
        },
      ],
    },
    {
      idCita: 5,
      fechaHora: "2022-01-15T14:15",
      motivo: "Extracción de garras",
      estatus: "PENDIENTE",
      cliente: {
        id: 5,
        name: "Carlos Méndez",
        email: "carlos@gmail.com",
        cellphone: "9998887777",
        role: "ROLE_USER",
      },
      mascotas: [
        {
          id: 6,
          name: "Tiger",
          fechaNacimiento: "2019-08-10",
          edad: "2 años",
          raza: "Bengalí",
          especie: "GATO",
        },
      ],
    },
    {
      idCita: 6,
      fechaHora: "2022-02-20T11:30",
      motivo: "Desparasitación",
      estatus: "PENDIENTE",
      cliente: {
        id: 6,
        name: "Elena Torres",
        email: "elena@gmail.com",
        cellphone: "7776665555",
        role: "ROLE_USER",
      },
      mascotas: [
        {
          id: 7,
          name: "Max",
          fechaNacimiento: "2021-04-05",
          edad: "1 año",
          raza: "Golden Retriever",
          especie: "PERRO",
        },
      ],
    },
    {
      idCita: 7,
      fechaHora: "2022-03-25T16:45",
      motivo: "Chequeo dental",
      estatus: "PENDIENTE",
      cliente: {
        id: 7,
        name: "Laura Fernández",
        email: "laura@gmail.com",
        cellphone: "8889994444",
        role: "ROLE_USER",
      },
      mascotas: [
        {
          id: 8,
          name: "Snowball",
          fechaNacimiento: "2017-12-01",
          edad: "4 años",
          raza: "Persa",
          especie: "GATO",
        },
      ],
    },
    {
      idCita: 8,
      fechaHora: "2022-04-30T13:00",
      motivo: "Consulta general",
      estatus: "PENDIENTE",
      cliente: {
        id: 8,
        name: "Roberto Sánchez",
        email: "roberto@gmail.com",
        cellphone: "3334445555",
        role: "ROLE_USER",
      },
      mascotas: [
        {
          id: 9,
          name: "Bella",
          fechaNacimiento: "2016-06-20",
          edad: "5 años",
          raza: "Labrador",
          especie: "PERRO",
        },
      ],
    },
    {
      idCita: 9,
      fechaHora: "2022-05-15T10:00",
      motivo: "Vacunación y revisión",
      estatus: "PENDIENTE",
      cliente: {
        id: 9,
        name: "Isabel Martínez",
        email: "isabel@gmail.com",
        cellphone: "6667778888",
        role: "ROLE_USER",
      },
      mascotas: [
        {
          id: 10,
          name: "Luna",
          fechaNacimiento: "2020-09-15",
          edad: "1 año",
          raza: "Siamesa",
          especie: "GATO",
        },
        {
          id: 11,
          name: "Buddy",
          fechaNacimiento: "2019-05-10",
          edad: "2 años",
          raza: "Beagle",
          especie: "PERRO",
        },
      ],
    },
    {
      idCita: 10,
      fechaHora: "2022-06-28T09:30",
      motivo: "Esterilización",
      estatus: "PENDIENTE",
      cliente: {
        id: 10,
        name: "Alejandro Ramos",
        email: "alejandro@gmail.com",
        cellphone: "2223334444",
        role: "ROLE_USER",
      },
      mascotas: [
        {
          id: 12,
          name: "Coco",
          fechaNacimiento: "2018-11-12",
          edad: "3 años",
          raza: "Chihuahua",
          especie: "PERRO",
        },
      ],
    },
  ];

  export {columns, citas, statusOptions};