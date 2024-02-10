import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext/useAuth'
import { useFetch } from '@/hooks/useFetch'
import { dentroDelRangoDeFechas, obtenerSemanasMes, formatCurrency } from '@/lib/utils'
import moment from 'moment'

import { SimpleBarCharts } from '@/pages/Home/SimpleBarCharts'
import { StackedAreaCharts } from '@/pages/Home/StackedAreaCharts'
import { SimplePieCharts } from '@/pages/Home/SimplePieCharts'
import { Loading } from '@/pages/Home/Loading'
import { NoPayments } from '@/pages/Home/NoPayments'
import { ComboBox } from '@/components/ComboBox'

import { MdPayments } from 'react-icons/md'
import { FaMoneyBillWave } from 'react-icons/fa'
import { PiUserGearBold } from 'react-icons/pi'

import './Home.css'

function ViewAdmin({ t }) {
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

  const groupData = (payments, filter) => {
    if (filter === '') return []

    const dataGraficas = payments.reduce((result, currentItem) => {
      const { total, createdAt } = currentItem
      let name = ''

      const fechaUTC = moment(createdAt).utc(true)
      const fechaLocal = fechaUTC.clone().local()

      const hoyLocal = moment.utc().local()

      if (filter === 'semana') {

        const diaSemana = `${t(fechaLocal.format('dddd').toLowerCase())} ${fechaLocal.format('DD/MM/YYYY')}`
        name = diaSemana

      } else if (filter === 'mes') {

        const semanas = obtenerSemanasMes(hoyLocal)
        const semana = semanas.filter(week => {
          const inicio = moment(week.inicio, 'DD-MM-YYYY').format('YYYY-MM-DD')
          const fin = moment(week.fin, 'DD-MM-YYYY').format('YYYY-MM-DD')
          return dentroDelRangoDeFechas(fechaLocal.format('YYYY-MM-DD'), inicio, fin)
        })
        name = `${moment(semana[0].inicio, 'DD-MM-YYYY').format('DD/MM/YYYY')} - ${moment(semana[0].fin, 'DD-MM-YYYY').format('DD/MM/YYYY')}`

      } else if (filter === 'año') {

        const mes = fechaLocal.format('MMMM YYYY')
        name = mes

      }
    
      // Verificar si ya existe un grupo para el usuario
      const existsResult = result ? result.find(group => group.name === name) : false
    
      if (existsResult) {
        // Si ya existe, sumar el total al grupo existente
        existsResult.total += parseFloat(total)
        existsResult.total = Number(parseFloat(existsResult.total).toFixed(2))
      } else {
        // Si no existe, crear un nuevo grupo y agregarlo al resultado
        result.push({
          name: name,
          total: Number(parseFloat(total).toFixed(2))
        })
      }
    
      return result
    }, [])

    if (filter === 'semana') {
      dataGraficas.sort((a, b) => {
        const fechaA = moment(a.name.split(' ')[1], 'DD/MM/YYYY').format('YYYY-MM-DD')
        const fechaB = moment(b.name.split(' ')[1], 'DD/MM/YYYY').format('YYYY-MM-DD')
        return moment(fechaA).diff(moment(fechaB))
      })
    } else if (filter === 'mes') {
      dataGraficas.sort((a, b) => {
        const fechaA = moment(a.name.split(' ')[0], 'DD/MM/YYYY').format('YYYY-MM-DD')
        const fechaB = moment(b.name.split(' ')[0], 'DD/MM/YYYY').format('YYYY-MM-DD')
        return moment(fechaA).diff(moment(fechaB))
      })
    } else if (filter === 'año') {
      dataGraficas.sort((a, b) => {
        const fechaA = moment(a.name, 'MMMM YYYY').format('YYYY-MM')
        const fechaB = moment(b.name, 'MMMM YYYY').format('YYYY-MM')
        return moment(fechaA).diff(moment(fechaB))
      })
    }

    return dataGraficas
  }

  const obtenerPagos = (payments, filter) => {
    // Existiran tres filtros, los pagos de la ultima semana, ultimo mes y ultimo año

    const pagosFiltrados = payments.filter(pago => {
      const { createdAt } = pago

      const fechaUTC = moment.utc(createdAt).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
      const hoy = moment.utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')

      if (filter === 'semana') {
        const inicio = moment.utc(hoy).subtract(6, 'days').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
        return dentroDelRangoDeFechas(fechaUTC, inicio, hoy)
      }

      if (filter === 'mes') {
        const inicio = moment.utc(hoy).subtract(1, 'month').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
        return dentroDelRangoDeFechas(fechaUTC, inicio, hoy)
      }

      if (filter === 'año') {
        const inicio = moment.utc(hoy).subtract(1, 'year').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
        return dentroDelRangoDeFechas(fechaUTC, inicio, hoy)
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

  const obtenerFrasePorFiltro = (filter) => {
    if (filter === 'semana') {
      return t('last_week')
    }

    if (filter === 'mes') {
      return t('last_month')
    }

    if (filter === 'año') {
      return t('last_year')
    }
  }

  const filtros = [
    {
      value: 'semana',
      label: t('week')
    },
    {
      value: 'mes',
      label: t('month')
    },
    {
      value: 'año',
      label: t('year')
    }
  ]

  return (
    <>
      {loading && <Loading />}
      {!loading && ((!error && pagos?.length > 0) ? (
        <>
          <div className='w-full mb-2 flex justify-center'>
            <div className='w-full mb-2 sm:w-1/3 sm:mb-0 px-2'>
              <ComboBox filtros={filtros} value={filtro} setValue={setFiltro} />
            </div>
          </div>
          
          <section className='w-full flex flex-wrap mb-4'>

            <article className='w-full mb-2 sm:w-1/3 sm:mb-0'>
              <div className='flex justify-start items-center h-full m-2 py-3 px-4 box-shadow rounded-lg dark:bg-zinc-900'>
                <p className='w-full text-center flex flex-col sm:flex-row sm:text-left items-center justify-center text-lg text-pretty'>
                  <MdPayments className='mr-3 text-4xl' />
                  {filtro === '' ? (
                    <span>{t('select_a_filter')}</span>
                  ) : ((obtenerPagos(pagos, filtro) && obtenerPagos(pagos, filtro).length > 0) ? (
                    <span><span className='font-bold'>{obtenerPagos(pagos, filtro).length}</span> {t('payments_in')} {obtenerFrasePorFiltro(filtro)}</span>
                  ) : (
                    <span>{t('there_were_no_payments_in')} {obtenerFrasePorFiltro(filtro)}</span>
                  ))}
                </p>
              </div>
            </article>

            <article className='w-full mb-2 sm:w-1/3 sm:mb-0'>
              <div className='flex justify-start items-center h-full m-2 py-3 px-4 box-shadow rounded-lg dark:bg-zinc-900'>
                <p className='w-full text-center flex flex-col sm:flex-row sm:text-left items-center justify-center text-lg text-pretty'>
                  <FaMoneyBillWave className='mr-3 text-4xl' />
                  {filtro === '' ? (
                    <span>{t('select_a_filter')}</span>
                  ) : (obtenerTotalPagos(obtenerPagos(pagos, filtro)) ? (
                    <span><span className='font-bold'>{formatCurrency(obtenerTotalPagos(obtenerPagos(pagos, filtro)))}</span> {t('earnings_in')} {obtenerFrasePorFiltro(filtro)}</span>
                  ) : (
                    <span>{t('there_were_no_profits_in')} {obtenerFrasePorFiltro(filtro)}</span>
                  ))}
                  
                </p>
              </div>
            </article>

            <article className='w-full mb-2 sm:w-1/3 sm:mb-0'>
              <div className='flex justify-start items-center h-full m-2 py-3 px-4 box-shadow rounded-lg dark:bg-zinc-900'>
                <p className='w-full text-center flex flex-col sm:flex-row sm:text-left items-center justify-center text-lg text-pretty'>
                  <PiUserGearBold className='mr-3 text-4xl' />
                  {filtro === '' ? (
                    <span>{t('select_a_filter')}</span>
                  ) : (obtenerUsuarioDestacado(obtenerPagos(pagos, filtro)) ? (
                    <span><span className='font-bold'>{obtenerUsuarioDestacado(obtenerPagos(pagos, filtro))?.nombre}</span> {t('was_the_featured_user')} {obtenerFrasePorFiltro(filtro)}</span>
                  ) : (
                    <span>{t('there_was_no_featured_user_in')} {obtenerFrasePorFiltro(filtro)}</span>
                  ))}
                </p>
              </div>
            </article>

          </section>

          <section className='w-full flex flex-wrap'>

            <article className='w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/3'>
              <div className='box-shadow p-2 sm:p-4 md:p-6 rounded-lg dark:bg-zinc-900 m-2'>
                <SimpleBarCharts data={groupData(obtenerPagos(pagos, filtro), filtro)} t={t} />
              </div>
            </article>

            <article className='w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/3'>
              <div className='box-shadow p-2 sm:p-4 md:p-6 rounded-lg dark:bg-zinc-900 m-2'>
                <StackedAreaCharts data={groupData(obtenerPagos(pagos, filtro), filtro)} />
              </div>
            </article>

            <article className='w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/3'>
              <div className='box-shadow p-2 sm:p-4 md:p-6 rounded-lg dark:bg-zinc-900 m-2'>
                <SimplePieCharts data={groupData(obtenerPagos(pagos, filtro), filtro)} />
              </div>
            </article>

          </section>
        </>
      ) : <NoPayments t={t} />)}
    </>
  )
}

export { ViewAdmin }