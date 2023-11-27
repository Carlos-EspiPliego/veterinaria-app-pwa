import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddCitaModal = (props) => {
    const { isOpen, onOpenChange, cita, handleInputChange, handleRegisterCita, clientes, setClienteSeleccionado, mascotas, mascotasFiltradas } = props;

    // console.log("Esto es lo que trae mascotas: " + JSON.stringify(mascotas, null, 2));
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
                                    classNames={{
                                        trigger: "min-h-unit-12 py-2",
                                    }}
                                    onChange={(e) => handleInputChange('mascotaId', e.target.value)}
                                >
                                    {(mascota) => <SelectItem key={mascota.id}>{mascota.nombre}</SelectItem>}
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
                                    // value={formData.fechaHora}
                                    onChange={(e) => handleInputChange('fecha', e.target.value)}
                                />
                                <Textarea
                                    label="Motivo de la cita"
                                    placeholder="Ingrese una breve descripción del motivo de visita"
                                    className=""
                                    // value={formData.motivo}
                                    onChange={(e) => handleInputChange('descripcion', e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose} >
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={handleRegisterCita}>
                                    Agregar cita
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