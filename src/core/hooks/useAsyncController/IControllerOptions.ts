export default interface IControllerOptions<TOutput> {
  onSuccess?: (data: TOutput) => void
  onError?: (error: Error) => void
}
