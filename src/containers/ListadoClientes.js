import React from 'react';
import ItemListCliente from '@components/ItemListCliente';
import '@styles/ItemListCliente.scss';

const ListadoClientes = ( props ) => {
    const {clientes, onDelete} = props;
    // console.log("Esto es lo que trae clientes: " + JSON.stringify(clientes, null, 2));
    // Invertir los clientes para que se muestren primero los más recientes
    const newCliente = [...clientes].reverse();

    return (
        <div>
            {newCliente.map(cliente=>{
                return <ItemListCliente 
                key = {cliente.id}
                idCliente = {cliente.id}
                cliente = {cliente}
                // clienteEdit = {clienteEdit}
                // setClienteEdit = {setClienteEdit}
                // showModal = {showModal}
                // handleClose={handleClose}
                onDelete={onDelete}
                />
            })}
        </div>
    );
}

export default ListadoClientes;