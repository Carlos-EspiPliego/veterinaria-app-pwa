import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea, Chip } from "@nextui-org/react";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddCitaModal = (props) => {
    const { isOpen, onOpenChange, citaData, handleInputChange, handleRegisterCita, clientes, handleEditarCita, setClienteSeleccionado, mascotas, mascotasFiltradas } = props;

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (citaData.id !== undefined) {
            setIsEditing(true);
            if (setClienteSeleccionado) {
                setClienteSeleccionado(citaData.cliente.username);
            }
        }
    }, [citaData.id, setClienteSeleccionado]);

    // console.log("CitaData: " + JSON.stringify(citaData, null, 2));
    // console.log("MascotasFiltradas: " + JSON.stringify(mascotasFiltradas, null, 2));
    
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agregar cita</ModalHeader>
                            <ModalBody >
                                <Select
                                    items={clientes}
                                    label="Cliente"
                                    className=""
                                    selectedKeys={[citaData.cliente.username]}
                                    onChange={(e) => {
                                        handleInputChange('clienteUsername', e.target.value)
                                        setClienteSeleccionado(e.target.value)
                                    }}
                                >
                                    {(cliente) => <SelectItem key={cliente.username} value={cliente.username}>{cliente.nombre}</SelectItem>}
                                </Select>
                                <Select
                                    items={mascotasFiltradas}
                                    labelPlacement="outside"
                                    label="Mascota"
                                    selectedKeys={[citaData.mascota.id]}
                                    classNames={{
                                        trigger: "min-h-unit-12 py-2",
                                    }}
                                    onChange={(e) => handleInputChange('mascotaId', e.target.value)}
                                >
                                    {(mascota) => <SelectItem key={mascota.id} value={mascota.id}>{mascota.nombre}</SelectItem>}
                                    {/* {mascotas.map((mascota) => (
                                        <SelectItem key={mascota.id} value={mascota.id}>
                                            {mascota.nombre}
                                        </SelectItem>
                                    ))} */}
                                </Select>
                                <Input
                                    label="Fecha y hora"
                                    type="datetime-local"
                                    placeholder="Ingrese la fecha y hora de la cita"
                                    variant="bordered"
                                    value={citaData.fecha}
                                    onChange={(e) => handleInputChange('fecha', e.target.value)}
                                />
                                <Textarea
                                    label="Motivo de la cita"
                                    placeholder="Ingrese una breve descripción del motivo de visita"
                                    className=""
                                    value={citaData.descripcion}
                                    onChange={(e) => handleInputChange('descripcion', e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose} >
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={() => {
                                    isEditing ? handleEditarCita() : handleRegisterCita()
                                    }}>
                                    { isEditing ? "Editar" : "Agregar"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddCitaModal