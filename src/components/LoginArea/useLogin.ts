import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import { tokenStorage } from '@/storage'
import { useState } from '@/states'
import { api } from '@/services/api/index'

export const useLogin = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const validateForm = () => {
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
      const token = await api.auth.signIn({ email: email.value, password: password.value })
      tokenStorage.set(token)
      router.push({ name: 'home' })
    } catch (error) {
      console.error(error)
      toast.error('E-mail ou senha inválidos')
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
  9
  const isDisabled = () => email.value === '' || password.value === ''

  return { email, password, isLoading, submit, onEmailChange, onPasswordChange, isDisabled }
}
