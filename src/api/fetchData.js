export const BASE_URL = import.meta.env.VITE_API_URL
const APP_ENV = import.meta.env.VITE_APP_ENV
import Keycloak from '../keycloak'



// Función general para hacer peticiones autenticadas al backend
export async function fetchData(endpoint, options = {}) {
  let token = null
  if (Keycloak?.authenticated) {
    try {
      await Keycloak.updateToken(30)
      token = Keycloak.token
    } catch {
      // si falla el refresh, puedes forzar login
      // Keycloak.login()
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let errorBody = null
    try {
      errorBody = await response.json()
    } catch {
      errorBody = await response.text()
    }

    const error = new Error(`HTTP ${response.status}`)
    error.status = response.status
    error.body = errorBody
    throw error
  }

  // 204 No Content
  if (response.status === 204) return null

  return response.json()
}


export async function fetchDataPost(endpoint, body = null, options = {}) {
  let token = null

  if (Keycloak?.authenticated) {
    try {
      await Keycloak.updateToken(30)
      token = Keycloak.token
    } catch {
      // opcional: Keycloak.login()
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  }

  const config = {
    method: 'POST',
    headers,
    ...options,
  }

  // Solo agregamos body si existe
  if (body !== null) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    let errorBody = null
    try {
      errorBody = await response.json()
    } catch {
      errorBody = await response.text()
    }

    const error = new Error(`HTTP ${response.status}`)
    error.status = response.status
    error.body = errorBody
    throw error
  }

  if (response.status === 204) return null

  return response.json()
}

export async function fetchDataFile(endpoint, formData, method = "POST", options = {}) {
  let token = null

  if (Keycloak?.authenticated) {
    try {
      await Keycloak.updateToken(30)
      token = Keycloak.token
    } catch {
      // opcional: Keycloak.login()
    }
  }

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  }

  const config = {
    method: method,
    body: formData,
    headers,
    ...options,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    let errorBody = null
    try {
      errorBody = await response.json()
    } catch {
      errorBody = await response.text()
    }

    const error = new Error(`HTTP ${response.status}`)
    error.status = response.status
    error.body = errorBody
    throw error
  }

  if (response.status === 204) return null

  return response.json()
}


export async function fetchDataPut(endpoint, body = null, options = {}) {
  let token = null

  if (Keycloak?.authenticated) {
    try {
      await Keycloak.updateToken(30)
      token = Keycloak.token
    } catch {
      // opcional: Keycloak.login()
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  }

  const config = {
    method: 'PUT',
    headers,
    ...options,
  }

  if (body !== null) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    let errorBody = null
    try {
      errorBody = await response.json()
    } catch {
      errorBody = await response.text()
    }

    const error = new Error(`HTTP ${response.status}`)
    error.status = response.status
    error.body = errorBody
    throw error
  }

  if (response.status === 204) return null

  return response.json()
}