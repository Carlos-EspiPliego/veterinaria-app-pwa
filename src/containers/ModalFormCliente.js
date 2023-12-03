import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Button, Input } from "@nextui-org/react";

import { IconEye, IconEyeClosed, IconLogin2 } from '@tabler/icons-react';


const ModalFormCliente = ({ show, handleClose, client, handleSubmit, handleInputChange }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Modal keyboard={false} className='modalFormCliente' show={show} onHide={handleClose}>
            <Modal.Header className='modalHeader'>
                <Button variant="secondary" onClick={handleClose} className='buttonAbrirModal'>
                    X
                </Button>
            </Modal.Header>

            <Modal.Body>
                <Input
                    type="text"
                    label="Name"
                    variant="bordered"
                    value={client.nombre}
                    placeholder="Enter your name"
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="mb-3"
                />
                <Input
                    type="text"
                    label="Last Name"
                    variant="bordered"
                    value={client.apellido}
                    placeholder="Enter your Last name"
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                    className="mb-3"
                />
                <Input
                    type="tel"
                    label="Cellphone Number"
                    variant="bordered"
                    value={client.telefono}
                    placeholder="Enter your cellphone number"
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className="mb-3"
                />
                <Input
                    isClearable
                    type="username"
                    label="Username"
                    variant="bordered"
                    value={client.username}
                    placeholder="Enter your username"
                    defaultValue=""
                    onClear={() => console.log("input cleared")}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="mb-3"
                />
                <Input
                    isClearable
                    type="email"
                    label="Email"
                    variant="bordered"
                    value={client.email}
                    placeholder="Enter your email"
                    defaultValue=""
                    onClear={() => console.log("input cleared")}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mb-3"
                />
                <Input
                    label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    value={client.password}
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <IconEye className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <IconEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="mb-3"
                    onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <Button color="primary" radius='full' auto className='w-[100%] mb-3' onPress={handleSubmit} >
                    Agregar cliente
                </Button>
            </Modal.Body>

            <Modal.Footer className='modalFooter'>

            </Modal.Footer>
        </Modal>
    );
}

export default ModalFormCliente;