import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './global.css'
import { ProductsProvider } from '@/contexts/ProductsContext.tsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductsProvider>
      <Router>
    <App />
      </Router>
    </ProductsProvider>
  </React.StrictMode>,
)
