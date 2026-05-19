import { fetchData } from './fetchData'

export function me() {
  return fetchData('/me')
}