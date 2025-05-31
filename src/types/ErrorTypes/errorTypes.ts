// error types
export interface ApiErrorResponse<T = any> {
  success: false;
  message: string;
  error: T;
  status: number | null;
}
