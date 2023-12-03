import { useState, useEffect, useMemo, useCallback } from "react";
import CircularJSON from 'circular-json';
import NavBar from "@components/NavBar";
import "@styles/Home.scss";
import { format } from 'date-fns';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";

import { IconPlus, IconSearch, IconChevronDown, IconEdit, IconTrash } from '@tabler/icons-react';
// import { columns, users, statusOptions } from "./utils/data";
import { columns } from "./utils/dataCitas";
import { capitalize } from "./utils/utils";

import AddCitaModal from "@components/admin/citas/AddCitaModal";

import { useSelector, useDispatch } from "react-redux";
import { getCitasAsync, registrarCitaAsync, deleteCitaAsync, editarCitaAsync } from "@features/admin/citas/citasSlice";
import { getClientesAsync } from "@features/admin/clientes/clientesSlice";
import { getMascotasAsync } from "@features/admin/mascotas/mascotasSlice";
import SuccessAlert from "@components/alerts/Alerts";

const INITIAL_VISIBLE_COLUMNS = ["id", "cliente.nombre", "mascota", "fecha", "descripcion", "actions"];

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  const citas = useSelector((state) => state.citas.citas);
  const [citaData, setCitaData] = useState({
    fecha: "",
    descripcion: "",
    veterinaria: {
      id: auth.veterinaria.id
    },
    cliente: {
      username: "",
    },
    mascota: {
      id: ""
    }
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "fecha",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  // Modal y filtrado
  const [clienteSeleccionado, setClienteSeleccionado] = useState('')
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState('')

  const [clientes, setClientes] = useState(useSelector(state => state.clientes.clientes))

  const [mascotas, setMascotas] = useState(useSelector(state => state.mascotas.mascotas))
  const [mascotasFiltradas, setMascotasFiltradas] = useState([])

  useEffect(() => {
    const mascotasFiltradas = mascotas.filter(mascota => mascota.cliente.username === clienteSeleccionado)
    setMascotasFiltradas(mascotasFiltradas)
  }, [clienteSeleccionado, mascotas])

  useEffect(() => {
    const fetchData = async () => {
      const clienteData = {
        rol: "CLIENTE",
        veterinaria: {
          id: auth.veterinaria.id,
        },
      };
      const mascotaData = {
        veterinaria: {
          id: auth.veterinaria.id,
        },
      };

      try {
        const clientesResponse = await dispatch(getClientesAsync(clienteData));
        setClientes(clientesResponse.payload); // Suponiendo que el resultado está en el campo "payload"

        const mascotasResponse = await dispatch(getMascotasAsync(mascotaData));
        setMascotas(mascotasResponse.payload); // Suponiendo que el resultado está en el campo "payload"
      } catch (error) {
        // Manejar errores si es necesario
        console.error("Error al obtener clientes o mascotas:", error);
      }
    };

    fetchData();
  }, [dispatch, auth.veterinaria.id]);

  useEffect(() => {
    onGetCitas();
  }, []);

  const onGetCitas = async () => {
    // console.log("Entro a OnGetCitas ")
    const citaData = {
      fecha: onCurrentDate(),
      veterinaria: {
        id: auth.veterinaria.id,
      }
    }
    await dispatch(getCitasAsync(citaData));
  }

  const onCurrentDate = () => {
    const fechaHoraActual = new Date();
    const fechaHoraFormateada = format(fechaHoraActual, 'yyyy-MM-dd HH:mm:ss');
    return fechaHoraFormateada;
  }

  const handleInputChange = (name, value) => {
    if (name === 'clienteUsername') {
      // Si estás modificando el nombre de la veterinaria
      setCitaData({
        ...citaData,
        cliente: {
          ...citaData.cliente,
          username: value
        }
      });
    } else if (name === 'mascotaId') {
      setCitaData({
        ...citaData,
        mascota: {
          ...citaData.mascota,
          id: value
        }
      });
    }
    else {
      setCitaData({ ...citaData, [name]: value });
    }
    console.log("HandleInputChange: => " + CircularJSON.stringify(citaData, null, 2));
  };

  const handleRegisterCita = async () => {
    // console.log("HandleRegisterCita: => " + CircularJSON.stringify(citaData, null, 2));
    await dispatch(registrarCitaAsync(citaData));
    formatearFormulario();
    onOpenChange();
    SuccessAlert("Cita registrada correctamente");
    await onGetCitas();
  }

  const handleEliminarCita = (id) => {
    const dataCita = {
      id: id
    }
    dispatch(deleteCitaAsync(dataCita));
    SuccessAlert("Cita eliminada correctamente");
  }

  const onEditCita = (cita) => {
    setCitaData({
      id: cita.id,
      fecha: cita.fecha,
      descripcion: cita.descripcion,
      veterinaria: {
        id: cita.veterinaria.id
      },
      cliente: {
        username: cita.cliente.username,
      },
      mascota: {
        id: cita.mascota.id,
      }
    });
  }

  const handleEditarCita = async () => {
    await dispatch(editarCitaAsync(citaData));
    formatearFormulario();
    onOpenChange();
    SuccessAlert("Cita editada correctamente");
  }

  const formatearFormulario = async () => {
    await setCitaData({
      fecha: "",
      descripcion: "",
      veterinaria: {
        id: auth.veterinaria.id
      },
      cliente: {
        username: "",
      },
      mascota: {
        id: "",
      }
    });
  }

  // Metodos para renderizar la tabla

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredCitas = [...citas];

    if (hasSearchFilter) {
      filteredCitas = filteredCitas.filter((cita) =>
        cita.cliente.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredCitas;
  }, [citas, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((cita, columnKey) => {
    const cellValue = cita[columnKey];

    switch (columnKey) {
      case "cliente.nombre":
        return (
          <User
            avatarProps={{ radius: "lg" }}
            description={cita.cliente.email}
            name={cita.cliente.name}
          >
            {cellValue}
          </User>
        );
      case "cliente.email":
        return (
          <div className="w-[100%] text-start"
          >
            {cita.cliente.email}
          </div>
        );
      case "mascota":
        // Handle the case when cellValue is an array of mascotas
        return (
          <div>
            <div>
              {cellValue.nombre}
            </div>
            <div>
              {cellValue.raza}
            </div>
            {/* Agrega aquí otras propiedades de la mascota que deseas mostrar */}
          </div>
        );
      case "descipcion":
        return (
          <div className="w-[100%] text-start">
            {cellValue.descripcion}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-center align-self-center items-center gap-2">
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar cita">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconEdit onClick={() => {
                    onOpen()
                    onEditCita(cita)
                  }} />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar cita">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <IconTrash onClick={() => handleEliminarCita(cita.id)} />
                </span>
              </Tooltip>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, [handleEliminarCita, onEditCita, onOpen]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre de cliente..."
            startContent={<IconSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<IconChevronDown className="text-small" />} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<IconPlus />} onPress={onOpen}>
              Añadir cita
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {citas.length} citas</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    citas.length,
    onSearchChange,
    hasSearchFilter,
    onClear,
    onOpen
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
      <NavBar />
      <div className="container__citas">

        <div className="body__content-home">
          <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[382px]",
            }}
            className="text-start"
            selectedKeys={selectedKeys}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
            selectionMode="single"
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No citas found"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddCitaModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        citaData={citaData} handleInputChange={handleInputChange}
        handleRegisterCita={handleRegisterCita}
        handleEditarCita={handleEditarCita}
        clientes={clientes} clienteSeleccionado={clienteSeleccionado} setClienteSeleccionado={setClienteSeleccionado}
        mascotas={mascotas} mascotasFiltradas={mascotasFiltradas} mascotaSeleccionada={mascotaSeleccionada}
        setMascotaSeleccionada={setMascotaSeleccionada}
      />
    </div>
  );
}

export default Home;
