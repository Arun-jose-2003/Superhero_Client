import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import About from './Pages/About'
import GrievanceSubmissionForm from './Pages/Grievance'
import { TokenAuthContext } from './contexts/AuthContext'
import { useContext, useEffect } from 'react'


function App() {
  const { isAuthorised } = useContext(TokenAuthContext)
  const navigate = useNavigate()

 

  return (
    <>
     
      {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grievance" element={isAuthorised ? <GrievanceSubmissionForm /> : <Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
