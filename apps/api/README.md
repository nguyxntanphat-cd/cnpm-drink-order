# BrewLite – Backend (NestJS)

Quy ước: xem [`../../AGENTS.md`](../../AGENTS.md). Hợp đồng API: [`../../docs/API.md`](../../docs/API.md).

## Chạy dev

```bash
# ở thư mục gốc repo: bật PostgreSQL
docker compose up -d db

cd apps/api
cp .env.example .env
npm install            # tự chạy prisma generate
npm run prisma:migrate # tạo/cập nhật bảng
npm run seed           # dữ liệu mẫu
npm run start:dev      # http://localhost:3001
```

## Lệnh

| Lệnh | Việc |
|---|---|
| `npm run start:dev` | Chạy dev, tự reload |
| `npm run build` | Build ra `dist/` |
| `npm run lint` | Kiểm tra code (oxlint) |
| `npm run format` | Format bằng Prettier |
| `npm test` | Unit test (Vitest, file `*.spec.ts` cạnh code) |
| `npm run test:e2e` | E2E test (file `test/*.e2e-spec.ts`, cần DB) |
| `npm run prisma:migrate -- --name <ten>` | Tạo migration mới sau khi sửa `schema.prisma` |
| `npm run prisma:studio` | Xem dữ liệu trên trình duyệt |

## Cấu trúc

```
prisma/          schema.prisma, migrations/, seed.ts
src/
  main.ts        ValidationPipe, CORS, PORT
  app.module.ts
  prisma/        PrismaService (global)
  common/        decorators/, guards/, filters/
  modules/       auth, users, products, orders, inventory, payments, promotions
test/            e2e
```

> Lưu ý: dự án dùng **ES modules** – import file nội bộ phải có đuôi `.js`, ví dụ `import { X } from './x.service.js'`.
