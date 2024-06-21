import type { Ref } from 'vue'
import { ref } from 'vue'

export type Dispatch<T> = (value: T | ((prevValue: T) => T)) => void

type SetValue = <T>(value: T | ((prevValue: T) => T), valueRef: Ref<T>) => void

const isCallback = <T>(value: T | ((prevValue: T) => T)): value is (prevValue: T) => T => {
  return typeof value === 'function'
}

const setValue: SetValue = (value, valueRef) => {
  if (isCallback(value)) return (valueRef.value = value(valueRef.value))

  valueRef.value = value
}

export const useState = <T>(initialValue: T): [Ref<T>, Dispatch<T>] => {
  const state = ref<T>() as Ref<T>
  state.value = initialValue

  const dispatch: Dispatch<T> = (value) => setValue(value, state)

  return [state, dispatch]
}
