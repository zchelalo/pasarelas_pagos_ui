import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from 'js-cookie'
import moment from 'moment'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const obtenerUsuarioDesdeCookies = () => {
  const usuarioCookie = Cookies.get('usuario')
  return usuarioCookie ? JSON.parse(usuarioCookie) : null
}

export const formatCurrency = (amount) => {
  const options = {
    style: 'currency',
    currency: 'MXN'
  }

  const formattedAmount = new Intl.NumberFormat('es-MX', options).format(amount)
  return formattedAmount
}

export const dentroDelRangoDeFechas = (fecha, inicio, fin) => {
  return moment(fecha).isBetween(inicio, fin, null, '[]')
  // [] Inclusive
  // () Exclusive
}

export const obtenerSemanasMes = (fecha) => {
  const inicio = fecha.clone().subtract(1, 'months')
  const final = fecha.clone()

  // Array para almacenar la información de las semanas
  const semanasUltimoMes = []

  while (inicio.isBefore(final)) {
    const finSemana = inicio.clone().endOf('isoWeek')

    if (fecha.subtract(1, 'months').format('DD-MM-YYYY') === inicio.endOf('isoWeek').format('DD-MM-YYYY')) {
      semanasUltimoMes.push({
        inicio: inicio.format('DD-MM-YYYY'),
        fin: finSemana.format('DD-MM-YYYY')
      })
      inicio.add(1, 'week')
      continue
    }

    semanasUltimoMes.push({
      inicio: inicio.format('DD-MM-YYYY') === inicio.startOf('isoWeek').format('DD-MM-YYYY') ? inicio.format('DD-MM-YYYY') : inicio.startOf('isoWeek').format('DD-MM-YYYY'),
      fin: final.isBetween(inicio, finSemana, null, '()') ? final.format('DD-MM-YYYY') : finSemana.format('DD-MM-YYYY')
    })
    inicio.add(1, 'week')
  }

  return semanasUltimoMes
}