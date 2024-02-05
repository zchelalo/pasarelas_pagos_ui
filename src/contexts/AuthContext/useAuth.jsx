import { useContext } from 'react'
import { AuthContext } from './index'

function useAuth() {
  const auth = useContext(AuthContext)
  return auth
}

export { useAuth }