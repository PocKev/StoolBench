import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CustomProvider } from 'rsuite';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomProvider theme='dark'>
      <App />
    </CustomProvider>
  </StrictMode>,
)
