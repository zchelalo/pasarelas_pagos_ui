import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

function AuthRoute({ children }) {
  const auth = useAuth()

  if (!auth.usuarioVerificado) {
    // Esperar hasta que el usuario haya sido verificado antes de tomar una decisión
    return null // o algún indicador de carga si es necesario
  }

  if (!auth.usuario) {
    return <Navigate to='/login' />
  }

  return children
}

export { AuthRoute }