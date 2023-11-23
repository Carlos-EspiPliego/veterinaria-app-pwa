import { useState } from 'react';
import { Button, Input, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

import { IconEye, IconEyeClosed, IconLogin2 } from '@tabler/icons-react';

import { Link } from 'react-router-dom';

const LoginForm = (props) => {
    const { userData, handleInputChange, handleLogin } = props;
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Card isBlurred shadow="md" className="border-none bg-background/30 dark:bg-default-100/50 max-w-[410px] w-[100%] mb-40">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col w-[100%]">
                    <h1 className='text-2xl font-bold'>Bienvenido a PetCare</h1>
                    <p className='text-gray-600'>Inicia sesión y descubre un mundo de gestión perfecta</p>
                </div>
            </CardHeader>
            <CardBody className='p-3'>
                <Input
                    isClearable
                    type="email"
                    label="Username"
                    variant="bordered"
                    placeholder="Enter your username"
                    defaultValue=""
                    onClear={() => console.log("input cleared")}
                    className="mb-3 w-[100%]"
                    onChange={(e) => handleInputChange('username', e.target.value)}
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
                    className='w-[100%]'
                    onChange={(e) => handleInputChange('password', e.target.value)}
                />
            </CardBody>
            <CardFooter className='flex flex-col'>
                <Button color="primary" radius='full' endContent={<IconLogin2 />} className='w-[100%] mb-3' onPress={handleLogin}>
                    Iniciar Sesión
                </Button>
            </CardFooter>
        </Card>
    )
}

export default LoginForm