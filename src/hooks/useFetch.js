import { useState, useEffect } from 'react'
import { back_url } from '@/config/const'
import { useToast } from '@/components/ui/use-toast'

function useFetch({ url, method = 'GET', body = null, headers = {}}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return { data, loading, error }
}

export { useFetch }