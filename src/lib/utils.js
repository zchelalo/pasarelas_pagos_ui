import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from 'js-cookie'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const obtenerUsuarioDesdeCookies = () => {
  const usuarioCookie = Cookies.get('usuario')
  return usuarioCookie ? JSON.parse(usuarioCookie) : null
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Hermosillo'
  }

  // Ajusta manualmente la hora según la zona horaria de Hermosillo (GMT-7)
  date.setHours(date.getHours() - 7)

  const formattedDate = new Intl.DateTimeFormat('es-MX', options).format(date)
  return formattedDate
}

export const obtenerMes = (dateString) => {
  const date = new Date(dateString)
  const options = {
    month: 'long'
  }

  // Ajusta manualmente la hora según la zona horaria de Hermosillo (GMT-7)
  date.setHours(date.getHours() - 7)

  const formattedDate = new Intl.DateTimeFormat('es-MX', options).format(date)
  return formattedDate
}

export const formatCurrency = (amount) => {
  const options = {
    style: 'currency',
    currency: 'MXN'
  }

  const formattedAmount = new Intl.NumberFormat('es-MX', options).format(amount)
  return formattedAmount
}