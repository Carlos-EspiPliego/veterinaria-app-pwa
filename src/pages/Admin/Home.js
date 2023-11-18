import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import NavBar from "@components/NavBar";
import ButtonNavBar from "@components/ButtonNavBar";
import "@styles/Home.scss";

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

import { IconPlus, IconSearch, IconChevronDown, IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
// import { columns, users, statusOptions } from "./utils/data";
import { columns, citas, statusOptions } from "./utils/dataCitas";
import { capitalize } from "./utils/utils";

import AddCitaModal from "@components/admin/citas/AddCitaModal";
import { IconCalendarCancel } from "@tabler/icons-react";

const statusColorMap = {
  COMPLETADA: "success",
  CANCELADA: "danger",
  PENDIENTE: "warning",
}

const INITIAL_VISIBLE_COLUMNS = ["idCita", "cliente.name", "mascotas", "fechaHora", "estatus", "actions"];


const Home = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "fechaHora",
    direction: "descending",
  });
  const [page, setPage] = useState(1);

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
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredCitas = filteredCitas.filter((cita) =>
        Array.from(statusFilter).includes(cita.estatus),
      );
    }

    return filteredCitas;
  }, [citas, filterValue, statusFilter]);

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
      case "cliente.name":
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
      case "estatus":
        return (
          <div className="w-[100%] text-start">
            <Chip className="capitalize " color={statusColorMap[cita.estatus]} size="sm" variant="flat">
              {cellValue}
            </Chip>
          </div>
        );
      case "mascotas":
        // Handle the case when cellValue is an array of mascotas
        return Array.isArray(cellValue) ? (
          <div>
            {cellValue.map((mascota) => (
              <div key={mascota.id}>
                {mascota.name} - {mascota.raza}
              </div>
            ))}
          </div>
        ) : (
          // Fallback if cellValue is not an array
          cellValue
        );
      case "actions":
        return (
          <div className="relative flex justify-center align-self-center items-center gap-2">
            <div className="relative flex items-center gap-2">
              <Tooltip content="Ver más">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconEye onClick={onOpen} />
                </span>
              </Tooltip>
              <Tooltip content="Editar cita">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconEdit onClick={onOpen} />
                </span>
              </Tooltip>
              <Tooltip color="warning" content="Cancelar cita">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <IconCalendarCancel />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar cita">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <IconTrash />
                </span>
              </Tooltip>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
                  Estatus
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    citas.length,
    onSearchChange,
    hasSearchFilter,
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
                <TableRow key={item.idCita}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddCitaModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default Home;
