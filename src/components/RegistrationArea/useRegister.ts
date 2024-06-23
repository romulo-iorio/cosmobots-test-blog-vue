import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import type { HttpError } from '@/services/httpClient'
import { api } from '@/services/api/index'
import { tokenStorage } from '@/storage'
import { useState } from '@/states'

interface RegistrationError {
  errors: {
    password_confirmation: string[]
    password: string[]
    email: string[]
  }
}

const errorsMapping: Partial<Record<keyof RegistrationError['errors'], Record<string, string>>> = {
  email: { 'has already been taken': 'Email já cadastrado' }
}

export const useRegister = () => {
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const validateForm = () => {
    if (password.value !== passwordConfirmation.value) {
      toast.error('As senhas não coincidem')
      return false
    }

    if (password.value.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres')
      return false
    }

    return true
  }

  const submit = async (e: Event) => {
    e.preventDefault()

    const isValid = validateForm()
    if (!isValid) return

    setIsLoading(true)

    try {
      const token = await api.auth.signUp({
        password_confirmation: passwordConfirmation.value,
        password: password.value,
        email: email.value
      })
      tokenStorage.set(token)
      router.push({ name: 'home' })
    } catch (err) {
      const error = err as HttpError<RegistrationError>

      const { errors: errorData } = error.response.data
      const errorKey = Object.keys(errorData)[0] as keyof RegistrationError['errors']

      const errorMessage =
        errorsMapping[errorKey]?.[errorData[errorKey][0]] || 'Erro ao registrar usuário'

      toast.error(errorMessage)
    }

    setIsLoading(false)
  }

  const onEmailChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    setEmail(target.value)
  }

  const onPasswordChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    setPassword(target.value)
  }

  const onPasswordConfirmationChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    setPasswordConfirmation(target.value)
  }
  9
  const isDisabled = () =>
    email.value === '' || password.value === '' || passwordConfirmation.value === ''

  return {
    email,
    password,
    isLoading,
    submit,
    onEmailChange,
    onPasswordChange,
    isDisabled,
    passwordConfirmation,
    onPasswordConfirmationChange
  }
}
