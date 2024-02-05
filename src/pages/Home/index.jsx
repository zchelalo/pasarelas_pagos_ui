import { useAuth } from '@/contexts/AuthContext/useAuth'
import { useFetch } from '@/hooks/useFetch'
import { obtenerMes } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { SimpleBarCharts } from '@/pages/Home/SimpleBarCharts'
import { StackedAreaCharts } from '@/pages/Home/StackedAreaCharts'
import { SimplePieCharts } from '@/pages/Home/SimplePieCharts'
import './Home.css'

function Home() {
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

  return (
    <>
      <div className='mb-4 mt-2 mx-2'>
        <h1 className='text-2xl'>Bienvenido, {usuario.nombre}</h1>
      </div>
      {loading && <p>Cargando...</p>}
      {(!loading && !error && pagos?.length > 0) ? (
        <>
          <section className='w-full flex flex-wrap'>
            <div className='box-shadow p-4 rounded-lg dark:bg-zinc-900 m-2'>
              <h2 className='text-xl'>Resumen de pagos</h2>
            </div>
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