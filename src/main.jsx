import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './config/lang/en.json'
import es from './config/lang/es.json'

i18next.use(initReactI18next).init({
  // lng: 'es',
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translation: en
    },
    es: {
      translation: es
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider >
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
