export default interface IControllerState<TOutput> {
  data: TOutput | null
  loading: boolean
  error: string | null
  success: boolean
}
