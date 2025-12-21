import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterAppProvider } from './router/app-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterAppProvider />
  </StrictMode>,
)
