import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import type { HttpError } from '@/services/httpClient'
import { api } from '@/services/api/index'
import { useState } from '@/states'

interface ForgotPasswordError {
  errors: { email: string[] }
}

const errorsMapping: Partial<Record<keyof ForgotPasswordError['errors'], Record<string, string>>> =
  { email: { 'not found': 'E-mail não cadastrado' } }

export const useForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const submit = async (e: Event) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      await api.auth.forgotPassword(email.value)
      toast.success('E-mail enviado com sucesso, redirecionando para login...')

      setTimeout(() => {
        router.push({ name: 'login' })
      }, 1000)
    } catch (error) {
      console.error(error)
      const err = error as HttpError<ForgotPasswordError>
      const { errors: errorsData } = err.response.data
      const errorKey = Object.keys(errorsData)[0] as keyof ForgotPasswordError['errors']

      const message = errorsMapping[errorKey]?.[errorsData.email[0]] || 'Erro ao enviar e-mail'
      toast.error(message)
    }

    setIsLoading(false)
  }

  const onEmailChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    setEmail(target.value)
  }

  9
  const isDisabled = () => email.value === ''

  return { email, isLoading, submit, onEmailChange, isDisabled }
}
