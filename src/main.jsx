import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css"
import './index.css'
import { PrimeReactProvider } from 'primereact/api'
import Tailwind from 'primereact/passthrough/tailwind';

import 'rsuite/dist/rsuite.min.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider  value={{ unstyled: true}}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
)
