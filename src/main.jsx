import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='card'>
      <div className='card-header'>Blog Platform</div>
      <div className='card-body'>
      <App />
      </div>
    </div>
  </StrictMode>,
)
