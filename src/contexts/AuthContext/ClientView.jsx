import { useAuth } from './useAuth'

function ClientView({ children }) {
  const auth = useAuth()

  if (!auth.usuarioVerificado) {
    // Esperar hasta que el usuario haya sido verificado antes de tomar una decisión
    return null // o algún indicador de carga si es necesario
  }

  if (auth.usuario.rol !== 'cliente') {
    return undefined
  }

  return children
}

export { ClientView }