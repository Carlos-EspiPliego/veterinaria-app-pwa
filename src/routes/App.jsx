import React from 'react'
import Inicio from '@pages/Inicio'
import Home from '@pages/Home'
import Mascotas from '@pages/Mascotas'
import Clientes from '@pages/Clientes'
import NotFound from '@pages/NotFound404'
import AppContext from '../context/AppContext'
import Layout from '@containers/Layout'
import '@styles/global.css'
import '@styles/_vars.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <AppContext.Provider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path='/' element={<Inicio/>}/>
                        <Route path='/Home' element={<Home/>}/>
                        <Route path='/Clientes' element={<Clientes/>}/>
                        <Route path='/Mascotas' element={<Mascotas/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default App