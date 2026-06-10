// src/core/presentation/createControllerFactory.ts
import { type IUseCase } from '../../UseCases/IUseCase'
import { useAsyncController } from '../../hooks/useAsyncController/useAsyncController'

export function createControllerFactory<TInput, TOutput>(
  useCase: IUseCase<TInput, TOutput>,
) {
  return function useBoundController(options?: {
    onSuccess?: (data: TOutput) => void
    onError?: (error: Error) => void
  }) {
    return useAsyncController<TInput, TOutput>(
      (input: TInput) => useCase.execute(input),
      options,
    )
  }
}
