import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

function RolesPermitidos({ children, roles = ['admin']}) {
  const auth = useAuth()

  if (!auth.usuarioVerificado) {
    // Esperar hasta que el usuario haya sido verificado antes de tomar una decisión
    return null // o algún indicador de carga si es necesario
  }

  if (!roles.includes(auth.usuario.rol)) {
    return <Navigate to='/' />
  }

  return children
}

export { RolesPermitidos }