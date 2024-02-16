import { useAuth } from '@/contexts/AuthContext/useAuth'
import { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { useTranslation } from 'react-i18next'
import { DataTable } from '@/components/DataTable'
import { Modal } from '@/components/Modal'
import { Columns } from '@/pages/Usuarios/Columns'
import { EditForm } from '@/pages/Usuarios/EditForm'

function Usuarios() {
  const { usuario, logout } = useAuth()
  const { data: usuarios, setData: setUsuarios, loading, error } = useFetch({
    url: '/v1/usuarios',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`
    }
  })
  const { data: tiposUsuario } = useFetch({
    url: '/v1/tipos-usuarios',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`
    }
  })
  const { t } = useTranslation()

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAlertModal, setOpenAlertModal] = useState(false)
  const [infoUsuario, setInfoUsuario] = useState(null)

  return (
    <>
      <h1 className='text-4xl'>Usuarios</h1>
      {loading && <p>Cargando...</p>}
      {!loading && ((!error && usuarios.length > 0) ? (
        <DataTable
          data={usuarios}
          columns={Columns({
            t,
            setOpenEditModal,
            setOpenAlertModal,
            setInfoUsuario
          })}
        />
      ) : 'No hay usuarios registrados')}
      {(openEditModal && infoUsuario && tiposUsuario) && (
        <Modal>
          <EditForm
            t={t}
            usuario={infoUsuario}
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            tiposUsuario={tiposUsuario}
            setOpenEditModal={setOpenEditModal}
            auth={{ usuario, logout }}
          />
        </ Modal>
      )}
    </>
  )
}

export { Usuarios }