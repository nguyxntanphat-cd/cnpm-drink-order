# AGENTS.md – Hướng dẫn cho AI coding agent (và cho người)

File này là **nguồn quy ước duy nhất** của dự án BrewLite. Mọi AI agent (Claude Code, Cursor,
Copilot, Codex, Gemini…) và mọi thành viên phải đọc file này trước khi viết code.
Nếu code hiện có mâu thuẫn với file này, làm theo file này và báo lại trong PR.
Muốn đổi quy ước → sửa file này trong một PR riêng, cả nhóm review.

> Gợi ý khi dùng AI: dán câu lệnh kiểu *"Đọc AGENTS.md và issue #NN, làm đúng phạm vi issue, không sửa file ngoài phạm vi."*

---

## 1. Dự án là gì

**BrewLite** – web app đặt cà phê **không dùng tiền mặt** (thương hiệu hiển thị trên UI: **COLDEN COFFEE**).
Luồng MVP: Menu → Chi tiết (size, đá, topping) → Giỏ hàng → Đăng nhập (nếu chưa) → Xác nhận đơn
→ Thanh toán (mock) → Màn hình kết quả → Lịch sử đơn.

Tài liệu nghiệp vụ: [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md), [`docs/SCENARIOS.md`](docs/SCENARIOS.md),
hợp đồng API: [`docs/API.md`](docs/API.md), giao diện: [`docs/DESIGN.md`](docs/DESIGN.md) + ảnh trong `docs/ui/`.

## 2. Công nghệ (bắt buộc theo đề – KHÔNG tự ý đổi)

| Phần | Công nghệ |
|---|---|
| Frontend | **Next.js 16 (App Router)**, React 19, TypeScript, **TailwindCSS v4**, **Zustand** (giỏ hàng, auth), **TanStack Query** (gọi API), axios |
| Backend | **NestJS 12** (ES modules), TypeScript, REST, **class-validator / class-transformer**, **Passport JWT**, **bcrypt** |
| CSDL | **PostgreSQL 16** + **Prisma 6** (`prisma-client-js`) |
| Test | Backend: **Vitest** (+ supertest cho e2e). Frontend: không bắt buộc |
| Lint/format | Backend: **oxlint** + Prettier. Frontend: ESLint (eslint-config-next) + Prettier |
| DevOps | Docker Compose, GitHub Actions (CI), npm |

- Package manager: **npm** (không dùng yarn/pnpm, không commit lockfile khác `package-lock.json`).
- **Node.js 24 LTS** (kèm npm 11). npm 10 của Node 22 bị lỗi khi cài backend → bắt buộc Node 24.
- npm 11 chặn script cài đặt của thư viện lạ: nếu thêm thư viện cần postinstall, chạy `npm install-scripts approve <tên>` (được ghi vào `allowScripts` trong package.json).
- Không thêm thư viện UI lớn (MUI, Antd, Chakra…). Dùng Tailwind + component tự viết trong `components/ui`.
  Icon: `lucide-react`. Cần thêm thư viện mới → ghi lý do trong PR.

## 3. Cấu trúc repo

```
.
├── AGENTS.md              ← file này
├── README.md
├── docker-compose.yml     ← db (dev); thêm api + web ở issue #32
├── .env.example           ← biến cho docker-compose; mỗi app có `.env.example` riêng
├── apps/
│   ├── api/               ← NestJS (backend)
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── prisma/           (PrismaModule, PrismaService)
│   │   │   ├── common/           (guards, decorators, filters, pipes, utils)
│   │   │   └── modules/
│   │   │       ├── auth/         (TV5)
│   │   │       ├── users/        (TV5)
│   │   │       ├── products/     (TV2)
│   │   │       ├── orders/       (TV2 tạo/đọc đơn; TV7 state machine)
│   │   │       ├── inventory/    (TV7)
│   │   │       ├── payments/     (TV6)
│   │   │       ├── promotions/   (TV7)
│   │   │       └── health/       (TV1)
│   │   └── test/                 (e2e của API)
│   └── web/               ← Next.js (frontend)
│       └── src/
│           ├── app/              (routes – xem mục 7)
│           ├── components/
│           │   ├── ui/           (Button, Card, Input, Modal, Badge, QuantityStepper… – TV4)
│           │   └── layout/       (AppShell, Header – TV4)
│           ├── features/         (products/ cart/ auth/ orders/ payments/)
│           ├── lib/              (api-client.ts, format.ts, query-client.ts)
│           ├── stores/           (cart.store.ts, auth.store.ts)
│           └── types/            (kiểu dữ liệu dùng chung – khớp docs/API.md)
├── tests/
│   └── e2e/               ← Playwright: luồng menu → xác nhận đơn (issue #51)
├── docs/                  ← requirements/, diagrams/, architecture/, scrum/, minh-chung/
└── .github/workflows/     ← CI (ci.yml), CD (cd.yml – issue #50)
```

Mỗi module NestJS: `xxx.module.ts`, `xxx.controller.ts`, `xxx.service.ts`, `dto/`, `xxx.service.spec.ts`. Tạo nhanh: `npx nest g resource modules/xxx --no-spec` rồi tự viết spec.
Mỗi feature frontend: `components/`, `hooks/` (useXxx gọi TanStack Query), `api.ts` (hàm gọi API).

## 4. Quy ước code chung

- TypeScript `strict`. Không dùng `any` (dùng `unknown` + thu hẹp kiểu).
- Prettier (cấu hình sẵn trong từng app): `singleQuote: true`, `semi: true`, `printWidth: 100`. Chạy `npm run format` trước khi commit.
- **Backend là ES modules**: import file nội bộ phải có đuôi `.js` (`import { X } from './x.service.js'`), test dùng `vi.fn()` thay cho `jest.fn()`.
- **Next.js 16** khác nhiều so với bản cũ (vd `middleware` đổi thành `proxy`, Cache Components bật sẵn). AI phải đọc tài liệu trong `apps/web/node_modules/next/dist/docs/` khi không chắc.
- Đặt tên: file `kebab-case.ts`, component React `PascalCase.tsx`, biến/hàm `camelCase`,
  hằng số `UPPER_SNAKE_CASE`, enum `PascalCase` với giá trị `UPPER_SNAKE_CASE`.
- **Code, tên biến, comment code: tiếng Anh. Text hiển thị cho người dùng: tiếng Việt có dấu.**
- **Tiền tệ: số nguyên VND** (`28000`), không dùng số thực. Hiển thị bằng `formatVnd()` → `28.000đ`.
- Thời gian: lưu UTC, API trả ISO 8601, hiển thị `dd/MM/yyyy - HH:mm` giờ Việt Nam.
- Không commit secret, `.env`, `node_modules`, `dist`, `.next`.
- Không sửa code thuộc module của người khác khi không cần; nếu bắt buộc phải sửa → nói rõ trong PR và tag người đó.

## 5. Mô hình dữ liệu (Prisma) – hợp đồng chung

Đây là schema chuẩn. TV2 tạo file `schema.prisma` theo đúng phần này ở Sprint 1; ai cần thêm trường → PR sửa cả schema và mục này.

```prisma
enum Role {
  CUSTOMER
  STAFF
}
enum Size {
  S
  M
  L
}
enum IceLevel {
  NONE
  LESS
  NORMAL
  MORE
}
enum OrderStatus {
  PENDING
  PAYMENT_FAILED
  PAID
  PREPARING
  READY
  COMPLETED
  CANCELLED
}
enum PaymentMethod {
  QR_TRANSFER
  E_WALLET
  CARD
}
enum PaymentStatus {
  PROCESSING
  SUCCEEDED
  FAILED
  REFUNDED
}
enum DiscountType {
  PERCENT
  FIXED
}
enum LoyaltyType {
  EARN
  REVERT
}

model User {
  id            Int      @id @default(autoincrement())
  email         String   @unique
  passwordHash  String
  fullName      String?
  phone         String?
  role          Role     @default(CUSTOMER)
  loyaltyPoints Int      @default(0)
  createdAt     DateTime @default(now())
  orders        Order[]
  loyaltyTransactions LoyaltyTransaction[]
}

model Category {
  id       Int       @id @default(autoincrement())
  name     String
  products Product[]
}

model Product {
  id          Int           @id @default(autoincrement())
  name        String
  description String?
  imageUrl    String
  categoryId  Int?
  category    Category?     @relation(fields: [categoryId], references: [id])
  basePrice   Int           // giá size M, dùng để hiển thị ở Menu
  stock       Int           @default(100)
  isAvailable Boolean       @default(true)
  version     Int           @default(0)   // optimistic locking (Task 10)
  sizes       ProductSize[]
}

model ProductSize {
  id        Int     @id @default(autoincrement())
  productId Int
  product   Product @relation(fields: [productId], references: [id])
  size      Size
  price     Int     // giá tuyệt đối của size này
  @@unique([productId, size])
}

model Topping {
  id          Int     @id @default(autoincrement())
  name        String
  price       Int
  stock       Int     @default(100)
  isAvailable Boolean @default(true)
  version     Int     @default(0)
}

model Order {
  id            Int                  @id @default(autoincrement())
  code          String               @unique   // "BL-000001"
  idempotencyKey String?             @unique   // header Idempotency-Key của POST /orders (test b)
  userId        Int
  user          User                 @relation(fields: [userId], references: [id])
  status        OrderStatus          @default(PENDING)
  subtotal      Int
  discount      Int                  @default(0)
  total         Int
  promoCode     String?
  note          String?
  createdAt     DateTime             @default(now())
  updatedAt     DateTime             @updatedAt
  items         OrderItem[]
  payments      Payment[]
  statusHistory OrderStatusHistory[]
  loyaltyTransactions LoyaltyTransaction[]
}

model OrderItem {
  id          Int                @id @default(autoincrement())
  orderId     Int
  order       Order              @relation(fields: [orderId], references: [id])
  productId   Int
  productName String             // snapshot tại lúc đặt
  size        Size
  ice         IceLevel           @default(NORMAL)
  qty         Int
  unitPrice   Int                // giá size + tổng topping, 1 ly
  lineTotal   Int                // unitPrice * qty
  toppings    OrderItemTopping[]
}

model OrderItemTopping {
  id          Int       @id @default(autoincrement())
  orderItemId Int
  orderItem   OrderItem @relation(fields: [orderItemId], references: [id])
  toppingId   Int
  name        String
  price       Int
}

model OrderStatusHistory {
  id        Int          @id @default(autoincrement())
  orderId   Int
  order     Order        @relation(fields: [orderId], references: [id])
  from      OrderStatus?
  to        OrderStatus
  createdAt DateTime     @default(now())
}

model Payment {
  id             Int           @id @default(autoincrement())
  orderId        Int
  order          Order         @relation(fields: [orderId], references: [id])
  idempotencyKey String        @unique
  amount         Int
  method         PaymentMethod
  status         PaymentStatus
  createdAt      DateTime      @default(now())
}

model Promotion {
  id            Int          @id @default(autoincrement())
  code          String       @unique
  type          DiscountType
  value         Int          // PERCENT: 10 = 10%; FIXED: số tiền VND
  minOrderTotal Int          @default(0)
  isActive      Boolean      @default(true)
  expiresAt     DateTime?
}

// Lịch sử cộng / trừ điểm thưởng (Assignment 2 – class diagram bắt buộc có)
model LoyaltyTransaction {
  id        Int         @id @default(autoincrement())
  userId    Int
  user      User        @relation(fields: [userId], references: [id])
  orderId   Int?
  order     Order?      @relation(fields: [orderId], references: [id])
  type      LoyaltyType // EARN khi đơn PAID, REVERT khi hủy đơn đã PAID
  points    Int         // số dương với EARN, số âm với REVERT
  createdAt DateTime    @default(now())
}
```

## 6. Nghiệp vụ cốt lõi (backend)

### 6.1 Giá
- `unitPrice = ProductSize.price + Σ topping.price`; `lineTotal = unitPrice * qty`.
- `subtotal = Σ lineTotal`; `total = subtotal - discount`.
- **Không có giao hàng** (theo đề Assignment 1): khách nhận đồ uống tại quầy → không có địa chỉ giao, shipper, phí giao hàng, trạng thái "đang giao".
- **Server luôn tự tính lại giá**, không tin giá client gửi lên.

### 6.2 Order State Machine (Task 10 – TV7)
Chỉ được đổi trạng thái qua `OrderStateMachine.assertTransition(from, to)` (file `modules/orders/order-state-machine.ts`).
Mọi lần đổi trạng thái phải ghi `OrderStatusHistory`.

```
PENDING        → PAID | PAYMENT_FAILED | CANCELLED
PAYMENT_FAILED → PENDING (thử lại) | CANCELLED
PAID           → PREPARING | CANCELLED (hoàn tiền mô phỏng)
PREPARING      → READY
READY          → COMPLETED
COMPLETED, CANCELLED: trạng thái kết thúc
```
Chuyển sai → ném `ConflictException` (409) với message `Invalid status transition: X -> Y`.

### 6.3 Tồn kho (Task 10 – TV7)
- Trừ kho trong **cùng transaction** tạo đơn (`prisma.$transaction`).
- Optimistic locking: `updateMany({ where: { id, version, stock: { gte: qty } }, data: { stock: { decrement: qty }, version: { increment: 1 } } })`;
  `count === 0` → thử lại tối đa 3 lần, sau đó ném `ConflictException` mã `OUT_OF_STOCK`.
- Hủy đơn (CANCELLED) → hoàn lại kho.

### 6.4 Thanh toán idempotent (Task 8 + 10 – TV6)
- `POST /payments` bắt buộc header `Idempotency-Key` (UUID do frontend sinh **một lần cho mỗi lần bấm thanh toán**).
- Cùng key gửi lại → trả về **đúng kết quả Payment cũ**, không tạo Payment/đổi trạng thái lần 2.
- Mock gateway: `MockPaymentGateway.charge()`; kết quả điều khiển bằng field `simulate: "SUCCESS" | "FAIL"` trong body (để demo), mặc định SUCCESS.
- Thành công → đơn `PAID`, cộng điểm thưởng; thất bại → `PAYMENT_FAILED`, **không xóa giỏ** ở frontend.

### 6.5 Khuyến mãi & điểm thưởng (Task 10 – TV7)
- Mã giảm giá áp khi tạo đơn (`promoCode`), kiểm tra `isActive`, `expiresAt`, `minOrderTotal`.
- Điểm thưởng: cộng `floor(total / 10000)` điểm khi đơn chuyển sang `PAID` – cập nhật `User.loyaltyPoints` **và** ghi 1 dòng `LoyaltyTransaction` (EARN) trong cùng transaction; hủy đơn đã PAID thì ghi REVERT (số âm) và trừ lại điểm.

## 7. Frontend

### 7.1 Routes (App Router)
| Route | Màn hình | Người làm |
|---|---|---|
| `/` | Menu (lưới sản phẩm, lọc danh mục) | TV3 |
| `/products/[id]` | Chi tiết sản phẩm: size, lượng đá, topping, số lượng | TV4 |
| `/cart` | Giỏ hàng | TV3 |
| `/login`, `/register`, `/forgot-password` | Xác thực | TV5 |
| `/checkout` | "Đơn hàng của bạn": tóm tắt, mã giảm giá, chọn phương thức (QR / Ví / Thẻ) | TV1 |
| `/payment/[orderId]` | Thanh toán QR: 4 trạng thái chờ / đang xử lý / thất bại / thành công | TV6 |
| `/orders` | Lịch sử đặt hàng (tab Tất cả / Đang xử lý / Hoàn thành) | TV3 |
| `/orders/[id]` | Chi tiết đơn + timeline trạng thái (kiêm màn xác nhận) | TV4 |
| `/account` | Tài khoản: thông tin, điểm thưởng, đăng xuất | TV1 |
| `/staff/orders` | *(mở rộng)* Nhân viên cập nhật trạng thái pha chế | chưa giao |

Route cần đăng nhập: `/checkout`, `/payment/*`, `/orders/*`, `/account`, `/staff/*` → chưa đăng nhập thì chuyển `/login?redirect=<url>` (EX-01), giữ nguyên giỏ.

### 7.2 State
- `stores/cart.store.ts` (Zustand + `persist` localStorage, key `brewlite-cart`):
  `items: CartItem[]`, `addItem`, `updateQty`, `removeItem`, `clear`, selector `totalQty`, `subtotal`.
  Hai món giống nhau (cùng productId + size + ice + bộ topping) thì **gộp số lượng**.
- `stores/auth.store.ts` (Zustand + persist, key `brewlite-auth`): `accessToken`, `user`, `login()`, `logout()`.
- Dữ liệu server (products, orders) → **TanStack Query**, không bỏ vào Zustand.

### 7.3 Gọi API
- Chỉ dùng `lib/api-client.ts` (axios instance, `baseURL = process.env.NEXT_PUBLIC_API_URL`,
  tự gắn `Authorization: Bearer <token>`, 401 → logout + chuyển `/login`).
- Kiểu dữ liệu trong `src/types/` phải khớp `docs/API.md`.
- Mỗi màn hình gọi API **bắt buộc** có trạng thái loading, lỗi, rỗng (Definition of Done).

### 7.4 Giao diện
- Mobile-first, nội dung nằm trong khung `max-w-[430px] mx-auto` (giống bản thiết kế điện thoại).
- Dùng **design token** khai báo trong `src/app/globals.css` (`@theme`, Tailwind v4 – **không có** `tailwind.config.ts`): `bg-primary`, `text-ink-muted`, `rounded-card`… Không hard-code mã màu trong component.
- Dùng component trong `components/ui` trước khi tự viết mới.
- Bám sát ảnh thiết kế trong `docs/ui/`.

## 8. Backend – quy ước

- Prefix toàn cục: không có (`/products`, `/orders`…) để khớp đề. CORS cho `FRONTEND_URL`.
- `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })` toàn cục.
- Mọi DTO dùng class-validator. Không trả `passwordHash` ra ngoài.
- Lỗi: dùng exception có sẵn của Nest (`BadRequestException`, `NotFoundException`, `ConflictException`, `UnauthorizedException`).
  Body lỗi: `{ statusCode, message, error }` (mặc định Nest).
- Swagger ở `http://localhost:3001/docs`: DTO dùng `@ApiProperty()`, controller dùng `@ApiTags()`, route cần đăng nhập thêm `@ApiBearerAuth()`.
- Lấy user hiện tại bằng decorator `@CurrentUser()` (trong `common/decorators`), route cần đăng nhập dùng `JwtAuthGuard`.
- Truy cập DB **chỉ qua `PrismaService`**, nghiệp vụ nằm trong service, controller mỏng.
- Seed (`npm run seed`) phải tạo đủ dữ liệu demo: danh mục, ≥ 8 món (Cà phê sữa, Cappuccino, Americano,
  Caramel Macchiato…) có size S/M/L, 9 topping như ảnh thiết kế, 1 user demo `demo@brewlite.vn / 123456`, 1 user STAFF, mã `WELCOME10`.

## 9. Test

- Backend: `npm test` (unit, Vitest) và `npm run test:e2e`. Bắt buộc có test cho Task 10:
  (a) chặn chuyển trạng thái sai, (b) 2 lần cùng `Idempotency-Key` chỉ tạo 1 payment, (c) đặt đồng thời không vượt tồn kho.
- Viết test cho service mình làm khi có logic tính toán (giá, khuyến mãi…).
- CI (GitHub Actions) chạy **Install → Lint → Unit Test → Build** cho cả `apps/api` và `apps/web` trên mỗi PR – PR đỏ không được merge.

## 10. Git

- Nhánh: `main` (nhánh chính, Lead merge) ← mỗi thành viên **1 nhánh** `tv1-tuyen` … `tv7-han`, dùng cho mọi việc. Mỗi PR chỉ chứa 1 việc; Lead merge bằng merge commit, không xóa nhánh.
- Commit theo Conventional Commits, phạm vi là module: `feat(cart): ...`, `fix(auth): ...`, `test(orders): ...`, `docs: ...`, `chore: ...`.
- Một PR = một issue, base `main`, mô tả có `Closes #<số>`, Lead (@nguyxntanphat-cd) review và merge. Không push thẳng vào `main`.
- **AI không được tự commit/push thay thành viên.** Mỗi người tự commit bằng tài khoản của mình (lịch sử commit là căn cứ chấm điểm).
- Trước khi tạo PR: `git merge origin/main`, chạy `npm run lint && npm run build && npm test` ở thư mục mình sửa.

## 11. Definition of Done (từ đề bài)

1. Code chạy được, không lỗi build, đạt tiêu chí chấp nhận của issue.
2. Commit rõ ràng, PR được Lead review và merge vào `main`.
5. Backend: đã kiểm thử API bằng Swagger/Postman, có ảnh minh chứng trong `docs/minh-chung/api/`.
3. API có validate đầu vào; UI có loading/lỗi cơ bản.
4. README / docs được cập nhật nếu có thay đổi cách chạy hoặc API.

## 12. Việc AI agent KHÔNG được làm

- Viết code mà người dùng không hiểu: luôn giải thích ngắn gọn code vừa viết (props, state, luồng dữ liệu) để thành viên trả lời được khi thầy vấn đáp.
- Chạy lệnh có thể xóa dữ liệu (`prisma migrate reset`, `DROP`, `rm -rf`, `git push --force`) khi chưa được hỏi.

- Đổi công nghệ, đổi cấu trúc thư mục, đổi tên route/endpoint/field so với file này và `docs/API.md`.
- Sửa `schema.prisma` mà không cập nhật mục 5.
- Tạo migration đè/xóa migration cũ. Chỉ tạo migration mới bằng `npx prisma migrate dev --name <ten>`.
- Viết code ngoài phạm vi issue đang làm, hoặc "dọn dẹp" file của người khác.
- Hard-code URL API, secret, mã màu.
- Tắt/skip test để CI xanh.
