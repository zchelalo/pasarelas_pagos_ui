import { useState, useEffect } from 'react'
import { back_url } from '@/config/const'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/contexts/AuthContext/useAuth'

function useFetch({ url, method = 'GET', body = null, headers = {} }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const auth = useAuth()

  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    const obtenerData = async () => {
      try {
        const response = await fetch(`${back_url}${url}`, {
          method: method,
          headers: headers,
          body: body
        })

        if (!response.ok) {
          // Si la respuesta no es exitosa, lanzar un error con el mensaje del servidor
          toast({
            title: 'Error',
            description: response.statusText,
            status: 'error'
          })

          if (response.status === 401) {
            auth.logout()
          }

          throw { error: response.statusText }
        }

        const data = await response.json()
        setData(data)
        setError(null)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    obtenerData()
  }, [])

  return { data, setData, loading, error }
}

export { useFetch }