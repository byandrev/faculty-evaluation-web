import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ResultsProvider } from './context/ResultsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResultsProvider>
      <App />
    </ResultsProvider>
  </StrictMode>,
)
