import { useState } from 'react'

import { DataTable } from '@/components/DataTable'
import { Columns } from '@/pages/Keys/Columns'

import { useAuth } from '@/contexts/AuthContext/useAuth'
import { useFetch } from '@/hooks/useFetch'
import { useTranslation } from 'react-i18next'

function Keys() {
  const { t } = useTranslation()
  const { usuario, logout } = useAuth()
  const { data: keys, setData: setKeys, loading, error } = useFetch({
    url: usuario.rol === 'admin' ? '/v1/keys' : `/v1/keys?usuarioId=${usuario.id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`
    }
  })

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAlertModal, setOpenAlertModal] = useState(false)
  const [infoKey, setInfoKey] = useState(null)

  console.log(keys)

  return (
    <>
      <div className='flex flex-wrap'>
        <h1 className='text-4xl'>{t('keys')}</h1>
      </div>
      {loading && 'Cargando...'}
      {!loading && ((!error && keys.length > 0) ? (
        <DataTable
          data={keys}
          columns={Columns({
            t,
            setOpenEditModal,
            setOpenAlertModal,
            setInfoKey
          })}
        />
      ) : 'No hay usuarios registrados')}
    </>
  )
}

export { Keys }