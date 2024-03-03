import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/AuthContext/useAuth'
import { useFetch } from '@/hooks/useFetch'

import { CardPasarela } from '@/pages/Pasarelas/CardPasarela'
import { Loading } from '@/pages/Pasarelas/Loading'

function Pasarelas() {
  const { usuario, logout } = useAuth()
  const { data: pasarelas, loading, error } = useFetch({
    url: '/v1/pasarelas',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`
    }
  })

  const { t } = useTranslation()

  return (
    <>
      <div className='flex flex-wrap'>
        <h1 className='text-4xl'>{t('payment_gateways')}</h1>
      </div>
      {loading && <Loading />}
      {!loading && ((!error && pasarelas.length > 0) ? (
        <div className='flex flex-wrap mt-3'>
          {pasarelas.map(pasarela => (
            <CardPasarela
              key={pasarela.id}
              t={t}
              pasarela={pasarela}
              auth={{ usuario, logout }}
            />
          ))}
        </div>
      ) : 'No hay pasarelas registrados')}
    </>
  )
}

export { Pasarelas }