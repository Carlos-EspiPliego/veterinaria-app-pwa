import React, {useState, useEffect} from 'react'
import NavBar from '../../components/NavBar'
import ButtonNavBar from '../../components/ButtonNavBar'
import { useDispatch, useSelector } from 'react-redux';
import {getHistorialesClienteAsync} from '../../features/admin/historiales/historialSlice'
import ListadoHistorialClientes from '../../containers/ListadoHistorialClientes'
import "@styles/Historial.scss";
const MiHistorial = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.user);
    console.log("Usuario =>", auth)
    const historialesRedux = useSelector((state) => state.historiales.historiales);
    const [historiales, setHistoriales] = useState([]);
    console.log(`Historiales del cliente ${auth.username} =>`, historiales)

    useEffect(() => {
      setHistoriales(historialesRedux);
    }, [historialesRedux]);

  const onGetHistoriales = () => {
    const historialData = {
      cliente : {
        username : auth.username
      }
      
    }
    dispatch(getHistorialesClienteAsync(historialData));
  }

  useEffect(() => {
    onGetHistoriales();
  }, []);
  return (
    <div>
      <NavBar />
        <div className='container__clientes main__container'>

            <div className='body__content'>

            <div className='content__formClientes'>

              <h2>Historiales médicos {auth.nombre} {auth.apellido}</h2>

            </div>
            <div className='content__listClientes'>


                <ListadoHistorialClientes
                    historiales={historiales}
                />
                
            </div>
            </div>
        </div>
      <ButtonNavBar />
    </div>
  )
}

export default MiHistorial