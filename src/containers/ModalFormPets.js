import React, { useState } from "react";
import useClientes from "@hooks/useClientes";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/ModalFormCitas.scss";
import { Button, Input } from "@nextui-org/react";

import FormPets from "./FormPets";

const ModalFormPets = (props) => {
  const { show, handleClose, handleInputChange, handleRegisterMascota, clientes, mascotaData, onActualizarMascota } = props;
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className="modal__citas"
    >
      <Modal.Header className="modal__header" closeButton>
        <Button variant="secondary" onClick={handleClose} className='buttonAbrirModal'>
          X
        </Button>
        <Modal.Title>
          {/* condicional si esta editando cambiar texto */}
          {mascotaData ? "Editar Mascota" : "Registrar Mascota"}
          </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">
        <FormPets
          clientes={clientes}
          handleRegisterMascota={handleRegisterMascota}
          handleInputChange={handleInputChange}
          mascotaData={mascotaData}
          onActualizarMascota={onActualizarMascota}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalFormPets;
