import { back_url } from '@/config/const'

async function login(correo, password) {
  const response = await fetch(`${back_url}/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password }),
  })

  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    throw { statusCode: data.statusCode, error: data.error, message: data.message }
  }
}

export { login }