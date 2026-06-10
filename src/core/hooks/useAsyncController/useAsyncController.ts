// src/core/presentation/useAsyncController.ts
import { useState, useCallback } from 'react'
import type IControllerState from '../../controller/IControllerState'
import type IControllerOptions from './IControllerOptions'

export function useAsyncController<TInput, TOutput>(
  asyncOperation: (input: TInput) => Promise<TOutput>,
  options?: IControllerOptions<TOutput>,
) {
  const [state, setState] = useState<IControllerState<TOutput>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  })

  const execute = useCallback(
    async (input: TInput): Promise<TOutput> => {
      setState({ data: null, loading: true, error: null, success: false })

      try {
        const result = await asyncOperation(input)
        setState({ data: result, loading: false, error: null, success: true })
        options?.onSuccess?.(result)
        return result
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err))
        const errorMessage = error.message || 'Ocorreu um erro inesperado.'
        setState({
          data: null,
          loading: false,
          error: errorMessage,
          success: false,
        })
        options?.onError?.(error)
        throw error
      }
    },
    [asyncOperation, options],
  )

  return {
    ...state,
    execute,
  }
}
