import { useAuth } from '@/contexts/AuthContext/useAuth'
import { useFetch } from '@/hooks/useFetch'
import { DataTable } from '@/components/DataTable'
import { Columns } from '@/pages/Home/Columns'
import { useTranslation } from 'react-i18next'

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

  return (
    <>
      <div className='mb-2'>
        <h1 className='text-2xl'>Bienvenido, {usuario.nombre}</h1>
      </div>
      {loading && <p>Cargando...</p>}
      {(!loading && !error && pagos.length > 0) ? (
        <DataTable
          data={pagos}
          columns={Columns({ t })}
        />
      ) : 'No hay pagos registrados'}
    </>
  )
}

export { Home }