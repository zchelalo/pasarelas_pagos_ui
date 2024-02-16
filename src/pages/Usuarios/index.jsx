import { useAuth } from '@/contexts/AuthContext/useAuth'
import { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { useTranslation } from 'react-i18next'

import { DataTable } from '@/components/DataTable'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/ui/button'

import { Columns } from '@/pages/Usuarios/Columns'
import { EditForm } from '@/pages/Usuarios/EditForm'
import { CreateForm } from '@/pages/Usuarios/CreateForm'

import { IoIosAdd } from 'react-icons/io'

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

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAlertModal, setOpenAlertModal] = useState(false)
  const [infoUsuario, setInfoUsuario] = useState(null)

  return (
    <>
      <div className='flex flex-wrap'>
        <h1 className='text-4xl mr-4'>Usuarios</h1>
        <Button 
          className='rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-gray-200 dark:text-gray-800 dark:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200'
          onClick={() => setOpenCreateModal(true)}
        >
          Agregar usuario <IoIosAdd className='text-2xl' />
        </Button>
      </div>
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
      {(openCreateModal && tiposUsuario) && (
        <Modal>
          <CreateForm
            t={t}
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            tiposUsuario={tiposUsuario}
            setOpenCreateModal={setOpenCreateModal}
            auth={{ usuario, logout }}
          />
        </ Modal>
      )}
    </>
  )
}

export { Usuarios }