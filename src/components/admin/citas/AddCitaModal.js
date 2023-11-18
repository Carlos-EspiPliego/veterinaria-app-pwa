import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea, Chip } from "@nextui-org/react";
import { useState } from "react";

const AddCitaModal = (props) => {
    const { isOpen, onOpenChange } = props;

    const [formData, setFormData] = useState({
        cliente: '',
        mascota: '',
        fechaHora: '',
        motivo: '',
    });

    const onChangeText = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const onFormatForm = () => {
        // Puedes realizar cualquier formato adicional del formulario aquí si es necesario
        return formData;
    };

    const onSubmit = () => {
        const formattedFormData = onFormatForm();
        // Aquí puedes realizar acciones como enviar los datos a un servidor, etc.
        console.log('Formulario enviado:', formattedFormData);

        // Cierra el modal después de enviar el formulario
        onOpenChange(false);
    };


    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agregar cita</ModalHeader>
                            <ModalBody >
                                <Select
                                    label="Cliente"
                                    className=""
                                    // value={formData.cliente}
                                    onChange={(value) => onChangeText('cliente', value)}
                                >
                                    {/* {clientes.map((cliente) => (
                                            <SelectItem key={cliente.id} value={cliente.name}>
                                                {cliente.name}
                                            </SelectItem>
                                        ))} */}
                                    <SelectItem value="">Vitor</SelectItem>
                                    <SelectItem value="">Albertano</SelectItem>
                                    <SelectItem value="">María</SelectItem>
                                    <SelectItem value="">Bartolo</SelectItem>
                                </Select>
                                <Select
                                    // items={}
                                    isMultiline={true}
                                    selectionMode="multiple"
                                    labelPlacement="outside"
                                    label="Mascota"
                                    classNames={{
                                        trigger: "min-h-unit-12 py-2",
                                    }}
                                    // value={formData.mascota}
                                    onChange={(value) => onChangeText('mascota', value)}
                                >
                                    {/* {clientes.map((cliente) => (
                                            <SelectItem key={cliente.id} value={cliente.name}>
                                                {cliente.name}
                                            </SelectItem>
                                        ))} */}
                                    <SelectItem value="">Pugberto</SelectItem>
                                    <SelectItem value="">Miauricio</SelectItem>
                                    <SelectItem value="">Mila</SelectItem>
                                    <SelectItem value="">Moli</SelectItem>
                                </Select>
                                <Input
                                    label="Fecha y hora"
                                    type="datetime-local"
                                    placeholder="Ingrese la fecha y hora de la cita"
                                    variant="bordered"
                                    // value={formData.fechaHora}
                                    onChange={(e) => onChangeText('fechaHora', e.target.value)}
                                />
                                <Textarea
                                    label="Motivo de la cita"
                                    placeholder="Ingrese una breve descripción del motivo de visita"
                                    className=""
                                    // value={formData.motivo}
                                    onChange={(e) => onChangeText('motivo', e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose} >
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={onClose}>
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