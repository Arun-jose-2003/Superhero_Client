import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import TokenAuth from './contexts/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <TokenAuth>
     <BrowserRouter>
     <App />
     </BrowserRouter>
     </TokenAuth>
    
  </StrictMode>,
)
