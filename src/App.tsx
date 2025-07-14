import { Routes,Route } from 'react-router-dom'
import Login from './components/pages/login/Login.tsx'
import './App.css'
import Clients from './components/pages/clients/Clients'
import Header from './components/organisms/navbar/header'
import Vehicles from './components/pages/vehicles/Vehicles.tsx'
import Transactions from './components/pages/transactions/Transactions.tsx'
import Home from './components/pages/home/home.tsx'
import ProtectedRoute from './components/organisms/protected-route/ProtectedRoute'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Login />} />

          <Route path="/clientes" element={<Clients/>} />
          <Route path='/vehiculos' element={<Vehicles/>}/>
          <Route path="/transacciones" element={<Transactions />} />
          <Route path="/home" element={<Home />} />

      </Routes>
  )
}

export default App
