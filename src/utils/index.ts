import { tokenStorage } from '@/storage'

export const formatDate = (date: string) => new Date(date).toLocaleString('pt-BR')

export const getLoggedUserId = () => {
  const token = tokenStorage.get()
  if (!token) return null

  const [, payload] = token.split('.')
  const decodedPayload = atob(payload)
  const parsedPayload = JSON.parse(decodedPayload)
  return parsedPayload.sub
}
