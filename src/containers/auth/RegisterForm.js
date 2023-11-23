import { useState } from 'react';
import { Button, Image, Input, Card, CardHeader, CardBody, CardFooter, Select, SelectItem } from "@nextui-org/react";

import { IconEye, IconEyeClosed, IconLogin2 } from '@tabler/icons-react';

import { Link } from 'react-router-dom';

const RegisterForm = (props) => {
    const { userData, handleInputChange, handleRegister } = props;
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Card isBlurred shadow="md" className="border-none bg-background/60 dark:bg-default-100/50 max-w-[410px] w-[100%]">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col w-[100%]">
                    <h1 className='text-2xl font-bold'>Bienvenido a PetCare</h1>
                    <p className='text-gray-600'>Inicia sesión y descubre un mundo de gestión perfecta</p>
                </div>
            </CardHeader>
            <CardBody className='p-3'>
                <Input
                    type="text"
                    label="Name"
                    variant="bordered"
                    placeholder="Enter your name"
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="mb-3"
                />
                <Input
                    type="text"
                    label="Last Name"
                    variant="bordered"
                    placeholder="Enter your Last name"
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                    className="mb-3"
                />
                <Input
                    type="tel"
                    label="Cellphone Number"
                    variant="bordered"
                    placeholder="Enter your cellphone number"
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className="mb-3"
                />
                <Input
                    type="text"
                    label="Nombre de tu veterinaria"
                    variant="bordered"
                    placeholder="Ingresa el nombre de tu veterinaria"
                    onChange={(e) => handleInputChange('veterinariaName', e.target.value)}
                    className="mb-3"
                />
                
                <Select
                    label="Select a role"
                    className="mb-3"
                    onChange={(e) => handleInputChange('rol', e.target.value)}
                >
                    <SelectItem key={"ADMINISTRADOR"} value="ADMINISTRADOR">Administrador</SelectItem>
                    <SelectItem key={"CLIENTE"} value="CLIENTE">Cliente</SelectItem>

                </Select>
                <Input
                    isClearable
                    type="username"
                    label="Username"
                    variant="bordered"
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
                <Input
                    label="Repeat Password"
                    variant="bordered"
                    placeholder="Enter your password again"
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
                />
            </CardBody>
            <CardFooter className='flex flex-col'>
                <Button color="primary" radius='full' auto endContent={<IconLogin2 />} className='w-[100%] mb-3' onPress={handleRegister}>
                    Registrarse
                </Button>
                <span className=''>¿Ya tienes cuenta? <Link to="/" className="text-primary">Iniciar Sesión</Link></span>
            </CardFooter>
        </Card>
    )
}

export default RegisterForm