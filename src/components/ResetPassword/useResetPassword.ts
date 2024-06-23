import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import { api } from '@/services/api/index'
import { useState } from '@/states'

export const useResetPassword = () => {
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [password, setPassword] = useState('')
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
      const { reset_password_token } = router.currentRoute.value.query

      await api.auth.resetPassword({
        reset_password_token: reset_password_token as string,
        password_confirmation: passwordConfirmation.value,
        password: password.value
      })
      toast.success('Nova senha salva, redirecionando para login...')
      setTimeout(() => {
        router.push({ name: 'login' })
      }, 1000)
    } catch (err) {
      toast.error('Erro ao alterar senha')
    }

    setIsLoading(false)
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
  const isDisabled = () => password.value === '' || passwordConfirmation.value === ''

  return {
    password,
    isLoading,
    submit,
    onPasswordChange,
    isDisabled,
    passwordConfirmation,
    onPasswordConfirmationChange
  }
}
