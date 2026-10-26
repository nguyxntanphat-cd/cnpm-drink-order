'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

// Trang tạm để kiểm tra kết nối backend – TV3 thay bằng trang Menu ở issue #16.
export default function HomePage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => (await apiClient.get<{ message: string }>('/')).data,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-2xl font-bold">COLDEN COFFEE</h1>
      {isPending && <p className="text-ink-muted">Đang kết nối backend…</p>}
      {isError && <p className="text-danger">Không kết nối được backend</p>}
      {data && <p className="text-primary font-semibold">{data.message}</p>}
    </main>
  );
}
