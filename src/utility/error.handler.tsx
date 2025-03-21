// utils/error.handler.ts
export function parseApiError(error: any): string {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return 'Beklenmeyen bir hata oluştu.';
}
