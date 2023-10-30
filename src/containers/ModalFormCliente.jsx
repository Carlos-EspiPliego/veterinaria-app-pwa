import React,{useState,useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
const ModalFormCliente = ({show, handleClose, handleChange, client, setClient, handleSubmit, formCliente}) => {

    // VARIABLES PARA ALMACENAR LOS DATOS DEL FORMULARIO DE CITAS
  const handle2ndChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };
    
    return (
        <Modal keyboard={false} className='modalFormCliente' show={show} onHide={handleClose}>
                    <Modal.Header className='modalHeader'>
                        <Button variant="secondary" onClick={handleClose} className='buttonAbrirModal'>
                           X
                        </Button>
                    </Modal.Header>

                    <Modal.Body>
                    <form className='formularioCliente' onSubmit={handleSubmit} ref={formCliente}>
                    <label className='label'>Nombre(s)</label>
                    <input type='text' className='input' name='nombre' value={client.nombre} onChange={handleChange}/>

                    <label className='label'>Apellidos</label>
                    <input type='text' className='input' name='apellidos' value={client.apellidos} onChange={handleChange}/>

                    <label className='label'>Email</label>
                    <input type='text' className='input' name='email' value={client.email} onChange={handleChange}/>

                    <label className='label'>Celular</label>
                    <input type='tel' max='10' className='input' name='telefono' value={client.telefono} onChange={handleChange} maxLength="12" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='123-456-7890'/>

                    <Button variant="secondary" onClick={handleClose} className='botonCancelar'>
                        Cancelar
                    </Button>
                    <button type='submit' onClick={handleClose} className='botonAgregar'>
                        Guardar
                    </button>
                    </form>
                    </Modal.Body>

                    <Modal.Footer className='modalFooter'>
                    
                    </Modal.Footer>
                </Modal>
    );
}

export default ModalFormCliente;