import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterAppProvider } from './router/app-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterAppProvider />
  </StrictMode>,
)
