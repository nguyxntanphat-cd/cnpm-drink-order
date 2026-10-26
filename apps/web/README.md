# BrewLite – Frontend (Next.js)

Quy ước: xem [`../../AGENTS.md`](../../AGENTS.md) (file `AGENTS.md` trong thư mục này do Next.js tự sinh – giữ nguyên).
Thiết kế: [`../../docs/DESIGN.md`](../../docs/DESIGN.md) · API: [`../../docs/API.md`](../../docs/API.md).

## Chạy dev

```bash
cd apps/web
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000 (backend cần chạy ở :3001)
```

## Lệnh

| Lệnh | Việc |
|---|---|
| `npm run dev` | Chạy dev |
| `npm run build` | Build production (CI chạy lệnh này) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (tự sắp xếp class Tailwind) |

## Cấu trúc

```
src/
  app/              routes (App Router) – bảng route ở AGENTS.md §7.1
  components/ui/    Button, Card, Input, Modal… (TV4 – issue #13)
  components/layout AppShell, PageHeader, CartButton
  features/<x>/     api.ts, hooks/, components/ theo nghiệp vụ
  lib/              api-client.ts, query-client.ts, format.ts
  stores/           Zustand: cart.store.ts, auth.store.ts
  types/            kiểu dùng chung, khớp docs/API.md
```

Design token nằm trong `src/app/globals.css` (`@theme` của Tailwind v4) → dùng class như `bg-primary`, `text-ink-muted`, `rounded-card`.
