import { useAuth } from '@/contexts/AuthContext/useAuth'
import { useTranslation } from 'react-i18next'
import { AdminView } from '@/contexts/AuthContext/AdminView'
import { ClientView } from '@/contexts/AuthContext/ClientView'
import { ViewAdmin } from '@/pages/Home/ViewAdmin'

import './Home.css'

function Home() {
  const { t } = useTranslation()
  const { usuario } = useAuth()

  return (
    <>
      <div className='mb-4 mt-2 mx-2'>
        <h1 className='text-2xl'>{t('welcome')}, {usuario.nombre}</h1>
      </div>
      <hr className='mb-4' />
      <AdminView>
        <ViewAdmin t={t} />
      </AdminView>
      <ClientView>
        <div className='mb-4 mt-2 mx-2'>
          <h1 className='text-2xl'>En mantenimiento !!!</h1>
        </div>
      </ClientView>
    </>
  )
}

export { Home }