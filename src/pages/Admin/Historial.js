import React, { useState, useEffect, useRef } from "react";
import NavBar from "@components/NavBar";
import ButtonNavBar from "@components/ButtonNavBar";
import FormHistorial from "../../containers/FormHistorial";
import ListadoHistorial from "@containers/ListadoHistorial";
import "@styles/Historial.scss";

import { useDispatch, useSelector } from 'react-redux';
import { registrarHistorial, eliminarHistorial, actualizarHistorial } from "../../services/admin/historiales/historialesApi";
import { getHistorialesAsync } from "@features/admin/historiales/historialSlice";
import { getClientesAsync } from "@features/admin/clientes/clientesSlice";
import { getMascotasAsync } from "@features/admin/mascotas/mascotasSlice";

function Historial() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.user);
    const historialesRedux = useSelector((state) => state.historiales.historiales);
    const [historiales, setHistoriales] = useState([]);
    const [historialData, setHistorialData] = useState({
        fecha: "",
        malestar: "",
        tratamiento: "",
        cliente: {
            username: "",
        },
        mascota: {
            id: ""
        },
    });

    ////////////////////////////////////////////////////////////////////
    // Modal y filtrado
    const [clienteSeleccionado, setClienteSeleccionado] = useState('')
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState('')

    const [clientes, setClientes] = useState(useSelector(state => state.clientes.clientes))

    const [mascotas, setMascotas] = useState(useSelector(state => state.mascotas.mascotas))
    const [mascotasFiltradas, setMascotasFiltradas] = useState([])

    useEffect(() => {
        const mascotasFiltradas = mascotas.filter(mascota => mascota.cliente.username === clienteSeleccionado)
        setMascotasFiltradas(mascotasFiltradas)
      }, [clienteSeleccionado, mascotas])
    
      useEffect(() => {
        const fetchData = async () => {
          const clienteData = {
            rol: "CLIENTE",
            veterinaria: {
              id: auth.veterinaria.id,
            },
          };
          const mascotaData = {
            veterinaria: {
              id: auth.veterinaria.id,
            },
          };
    
          try {
            const clientesResponse = await dispatch(getClientesAsync(clienteData));
            setClientes(clientesResponse.payload); // Suponiendo que el resultado está en el campo "payload"
    
            const mascotasResponse = await dispatch(getMascotasAsync(mascotaData));
            setMascotas(mascotasResponse.payload); // Suponiendo que el resultado está en el campo "payload"
          } catch (error) {
            // Manejar errores si es necesario
            console.error("Error al obtener clientes o mascotas:", error);
          }
        };
    
        fetchData();
      }, [dispatch, auth.veterinaria.id]);


      useEffect(() => {
        setHistoriales(historialesRedux);
      }, [historialesRedux]);

      const onGetHistoriales = () => {
        const historialData = {
          cliente : {
            veterinaria: {
              id: auth.veterinaria.id,
            }
          }
          
        }
        dispatch(getHistorialesAsync(historialData));
      }

      useEffect(() => {
        onGetHistoriales();
      }, []);

    const handleInputChange = (name, value) => {
        if (name === 'clienteUsername') {
          // Si estás modificando el nombre de la veterinaria
          setHistorialData({
            ...historialData,
            cliente: {
              ...historialData.cliente,
              username: value
            }
          });
        } else if (name === 'mascotaId') {
          setHistorialData({
            ...historialData,
            mascota: {
              ...historialData.mascota,
              id: value
            }
          });
        }
        else {
          setHistorialData({ ...historialData, [name]: value });
        }
    };

    //   FUNCION PARA REGISTRAR UN HISTORIAL
      const handleRegisterHistorial = () => {
        // console.log("entro a handleRegisterCita: " + CircularJSON.stringify(citaData, null, 2));
        registrarHistorial(historialData).then((response) => {
          // console.log(response);

          formatearFormulario();
          onGetHistoriales();
        });
      }

      const onDeleteHistorial = (id) => {
        const dataHistorial = {
          id: id
        }
        eliminarHistorial(dataHistorial).then((r) => {
          onGetHistoriales();
        })
        
      };
    
      const onActualizarHistorial = () => {
        actualizarHistorial(historialData).then((r) => {
          formatearFormulario();
          onGetHistoriales();
        })
        
      }

      const formatearFormulario = () => {
        setHistorialData({
            fecha: "",
            malestar: "",
            tratamiento: "",
            cliente: {
                username: "",
            },
            mascota: {
                id: ""
            },
        });
      }
  return (
    <div>
        <NavBar/>

        <div className='container__clientes main__container'>
            <div className='content__titleClientes'>
            <h3 className='title__citas'>ADMINISTRADOR DE HISTORIALES</h3>
            </div>

            <div className='body__content'>

            <div className='content__formClientes'>

            <FormHistorial
                historialData={historialData}
                handleRegisterHistorial={handleRegisterHistorial}
                handleInputChange={handleInputChange}
                clientes={clientes}
                clienteSeleccionado={clienteSeleccionado}  // Check if handleInputChange supports 'clienteUsername'
                setClienteSeleccionado={setClienteSeleccionado}
                mascotas={mascotas}
                mascotasFiltradas={mascotasFiltradas}
                mascotaSeleccionada={mascotaSeleccionada}
                setMascotaSeleccionada={setMascotaSeleccionada}
                onActualizarHistorial={onActualizarHistorial}
            />

            </div>
            <div className='content__listClientes'>

                <ListadoHistorial
                  historiales={historiales}
                  onDeleteHistorial={onDeleteHistorial}
                  setHistorialData={setHistorialData}
                />
            </div>
            </div>
        </div>

        <ButtonNavBar/>
    </div>
  )
}

export default Historial;
