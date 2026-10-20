import axios from 'axios';

// Mọi lời gọi API đi qua instance này (AGENTS.md §7.3).
// TODO(T7.3 – issue #24): gắn Authorization từ auth store, xử lý 401 → logout + chuyển /login.
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

/** Lấy message lỗi từ response NestJS `{ statusCode, message, error }`. */
export function getErrorMessage(error: unknown, fallback = 'Đã có lỗi xảy ra'): string {
  if (axios.isAxiosError<{ message?: string | string[] }>(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message[0] ?? fallback;
    if (message) return message;
  }
  return fallback;
}
