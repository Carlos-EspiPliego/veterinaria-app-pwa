import React from 'react';
import ItemListCliente from '@components/ItemListCliente';
import '@styles/ItemListCliente.scss';
const ListadoClientes = ({ clientes, clienteEdit, setClienteEdit, showModal, handleClose, onDelete }) => {

    return (
        <div>
            {clientes.map(cliente=>{
                return <ItemListCliente 
                key = {cliente.id}
                idCliente = {cliente.id}
                cliente = {cliente}
                clienteEdit = {clienteEdit}
                setClienteEdit = {setClienteEdit}
                showModal = {showModal}
                handleClose={handleClose}
                onDelete={onDelete}
                />
            })}
        </div>
    );
}

export default ListadoClientes;