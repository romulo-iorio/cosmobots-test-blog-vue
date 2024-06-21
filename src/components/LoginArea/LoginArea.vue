<script setup lang="ts">
import { useLogin } from './useLogin'

const { email, password, isLoading, onEmailChange, onPasswordChange, submit, isDisabled } =
  useLogin()
</script>

<template>
  <div class="flex flex-col w-full items-center justify-center h-full">
    <div class="flex flex-col w-1/2 items-center justify-center h-2/3 bg-gray-900 rounded-md p-10">
      <h1 class="text-white text-2xl font-bold text-center">Login</h1>
      <form
        class="flex flex-col gap-4 w-full p-10 overflow-y-auto flex-1 h-auto transition-height duration-200"
        @submit="submit"
      >
        <label for="email" class="text-white">E-mail</label>
        <input
          type="email"
          class="w-full p-2 bg-gray-800 border-2 border-gray-600 rounded-md text-white"
          placeholder="Digite seu e-mail"
          @input="onEmailChange"
          :value="email"
        />

        <label for="password" class="text-white">Senha</label>
        <input
          type="password"
          class="w-full p-2 bg-gray-800 border-2 border-gray-600 rounded-md text-white"
          placeholder="Digite sua senha"
          @input="onPasswordChange"
          :value="password"
        />

        <button
          class="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 active:bg-blue-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
          :disabled="isDisabled()"
          type="submit"
        >
          {{ isLoading ? 'Carregando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
