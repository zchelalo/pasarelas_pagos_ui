import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext/useAuth'
import { useFetch } from '@/hooks/useFetch'
import { obtenerMes, formatCurrency } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

import { SimpleBarCharts } from '@/pages/Home/SimpleBarCharts'
import { StackedAreaCharts } from '@/pages/Home/StackedAreaCharts'
import { SimplePieCharts } from '@/pages/Home/SimplePieCharts'
import { ComboBox } from '@/components/ComboBox'

import { MdPayments } from 'react-icons/md'
import { FaMoneyBillWave } from 'react-icons/fa'

import './Home.css'

function Home() {
  const [filtro, setFiltro] = useState('semana')

  const { usuario } = useAuth()
  const { data: pagos, loading, error } = useFetch({
    url: '/v1/pagos',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`
    }
  })
  const { t } = useTranslation()

  const groupData = (payments) => {
    const dataGraficas = payments.reduce((result, currentItem) => {
      const { total, createdAt } = currentItem
      let mesMinusculas = obtenerMes(createdAt)
      let mes = mesMinusculas.charAt(0).toUpperCase() + mesMinusculas.slice(1)
    
      // Verificar si ya existe un grupo para el usuario
      const existingMonth = result ? result.find(group => group.name === mes) : false
    
      if (existingMonth) {
        // Si ya existe, sumar el total al grupo existente
        existingMonth.total += parseFloat(total)
        existingMonth.total = Number(parseFloat(existingMonth.total).toFixed(2))
      } else {
        // Si no existe, crear un nuevo grupo y agregarlo al resultado
        result.push({
          name: mes,
          total: Number(parseFloat(total).toFixed(2))
        })
      }
    
      return result
    }, [])

    return dataGraficas
  }

  const obtenerPagos = (payments, filtro) => {
    // Existiran tres filtros, los pagos de la ultima semana, ultimo mes y ultimo año

    const pagosFiltrados = payments.filter(pago => {
      const { createdAt } = pago

      const hoy = new Date()
      const fechaPago = new Date(createdAt)
      const diferencia = hoy.getTime() - fechaPago.getTime()
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))

      if (filtro === 'semana') {
        return dias <= 7
      }

      if (filtro === 'mes') {
        return dias <= 30
      }

      if (filtro === 'año') {
        return dias <= 365
      }
    })

    return pagosFiltrados
  }

  const obtenerTotalPagos = (payments) => {
    const total = payments.reduce((acumulador, pago) => {
      return Number(parseFloat(acumulador).toFixed(2)) + Number(parseFloat(pago.total).toFixed(2))
    }, 0)

    return total
  }

  const obtenerUsuarioDestacado = (payments) => {
    const paymentsGroupedByUsuario = payments.reduce((acumulador, pago) => {
      const { usuarioId, usuario, total } = pago
      const totalFormatted = Number(parseFloat(total).toFixed(2))

      const existeUsuario = acumulador && acumulador.find(usuario => usuario.usuarioId === usuarioId)

      if (existeUsuario) {
        existeUsuario.total += totalFormatted
      } else {
        acumulador.push({
          usuarioId,
          nombre: usuario.nombre,
          total: totalFormatted
        })
      }

      return acumulador
    }, [])

    const usuarioDestacado = paymentsGroupedByUsuario.reduce((acumulador, usuario) => {
      if (!acumulador || usuario.total > acumulador.total) {
        return usuario
      } else {
        return acumulador
      }
    }, null)

    return usuarioDestacado
  }

  const filtros = [
    {
      value: 'semana',
      label: 'Semana'
    },
    {
      value: 'mes',
      label: 'Mes'
    },
    {
      value: 'año',
      label: 'Año'
    }
  ]

  return (
    <>
      <div className='mb-4 mt-2 mx-2'>
        <h1 className='text-2xl'>{t('welcome')}, {usuario.nombre}</h1>
      </div>
      {loading && <p>Cargando...</p>}
      {(!loading && !error && pagos?.length > 0) ? (
        <>
          <ComboBox filtros={filtros} value={filtro} setValue={setFiltro} />
          <section className='w-full flex flex-wrap mb-4'>

            <article className='w-full mb-2 sm:w-1/3 sm:mb-0'>
              <div className='flex justify-start items-center h-full m-2 py-3 px-4 box-shadow rounded-lg dark:bg-zinc-900'>
                <p className='w-full text-center flex flex-col sm:flex-row sm:text-left items-center justify-center text-lg text-pretty'>
                  <MdPayments className='mr-3 text-4xl' />
                  {obtenerPagos(pagos, filtro) ? (
                    <span><span className='font-bold'>{obtenerPagos(pagos, filtro).length}</span> pagos en la última semana</span>
                  ) : (
                    <span>No hubo pagos en la última semana</span>
                  )}
                </p>
              </div>
            </article>

            <article className='w-full mb-2 sm:w-1/3 sm:mb-0'>
              <div className='flex justify-start items-center h-full m-2 py-3 px-4 box-shadow rounded-lg dark:bg-zinc-900'>
                <p className='w-full text-center flex flex-col sm:flex-row sm:text-left items-center justify-center text-lg text-pretty'>
                  <FaMoneyBillWave className='mr-3 text-4xl' />
                  {obtenerTotalPagos(obtenerPagos(pagos, filtro)) ? (
                    <span><span className='font-bold'>{formatCurrency(obtenerTotalPagos(obtenerPagos(pagos, filtro)))}</span> ganancias en la última semana</span>
                  ) : (
                    <span>No hubo ganancias en la última semana</span>
                  )}
                  
                </p>
              </div>
            </article>

            <article className='w-full mb-2 sm:w-1/3 sm:mb-0'>
              <div className='flex justify-start items-center h-full m-2 py-3 px-4 box-shadow rounded-lg dark:bg-zinc-900'>
                <p className='w-full text-center flex flex-col sm:flex-row sm:text-left items-center justify-center text-lg text-pretty'>
                  <FaMoneyBillWave className='mr-3 text-4xl' />
                  {obtenerUsuarioDestacado(obtenerPagos(pagos, filtro)) ? (
                    <span><span className='font-bold'>{obtenerUsuarioDestacado(obtenerPagos(pagos, filtro))?.nombre}</span> fue el usuario destacado</span>
                  ) : (
                    <span>No hay usuario destacado</span>
                  )}
                </p>
              </div>
            </article>

          </section>

          <section className='w-full flex flex-wrap'>

            <article className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3'>
              <div className='box-shadow py-6 rounded-lg dark:bg-zinc-900 m-2'>
                <SimpleBarCharts data={groupData(pagos)} />
              </div>
            </article>

            <article className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3'>
              <div className='box-shadow py-6 rounded-lg dark:bg-zinc-900 m-2'>
                <StackedAreaCharts data={groupData(pagos)} />
              </div>
            </article>

            <article className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3'>
              <div className='box-shadow py-6 rounded-lg dark:bg-zinc-900 m-2'>
                <SimplePieCharts data={groupData(pagos)} />
              </div>
            </article>

          </section>
        </>
      ) : 'No hay pagos registrados'}
    </>
  )
}

export { Home }