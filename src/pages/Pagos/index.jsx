import { useAuth } from '@/contexts/AuthContext/useAuth'
import { useFetch } from '@/hooks/useFetch'
import { useTranslation } from 'react-i18next'
import { DataTable } from '@/components/DataTable'
import { Columns } from '@/pages/Pagos/Columns'

function Pagos() {
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
      <h1 className='text-4xl'>{t('payments')}</h1>
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

export { Pagos }