# BrewLite – Ứng dụng đặt cà phê không dùng tiền mặt

Bài tập lớn môn **Công nghệ Phần mềm** – Trường ĐH Sài Gòn, HK I 2026–2027.
Nhóm 7 thành viên, làm theo **Agile Scrum** trong 3 Sprint. Thương hiệu hiển thị trên giao diện: **COLDEN COFFEE**.

> *“BrewLite giúp khách hàng đặt và thanh toán đồ uống không dùng tiền mặt chỉ trong vài chạm, giảm thời gian xếp hàng và nhận đơn nhanh tại quầy.”*

**Luồng MVP:** Menu → Chi tiết (size, đá, topping) → Giỏ hàng → Đăng nhập → Xác nhận đơn → Thanh toán QR (mock) → Kết quả → Lịch sử đơn.

## Tài liệu

| File | Nội dung |
|---|---|
| [AGENTS.md](AGENTS.md) | **Quy ước code chung – đọc trước khi code** (dành cho cả người và AI) |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | Yêu cầu, user story, Definition of Done |
| [docs/SCENARIOS.md](docs/SCENARIOS.md) | Kịch bản nghiệp vụ, ngoại lệ, use case |
| [docs/API.md](docs/API.md) | Hợp đồng API giữa frontend và backend |
| [docs/DESIGN.md](docs/DESIGN.md) + [docs/ui/](docs/ui/) | Thiết kế giao diện, design token |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Product Backlog, phân công, thứ tự phụ thuộc |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Quy trình Git / Pull Request / Scrum |

## Công nghệ

| Phần | Công nghệ |
|---|---|
| Frontend | Next.js (App Router, TypeScript), TailwindCSS, Zustand, TanStack Query |
| Backend | NestJS (TypeScript), REST, class-validator, Passport JWT, bcrypt |
| CSDL | PostgreSQL 16 + Prisma |
| Thanh toán | Mock Payment Gateway (mô phỏng chuyển khoản QR) |
| DevOps | Docker Compose, GitHub Actions |

```
frontend/  Next.js  :3000  ──REST/JSON──▶  backend/  NestJS  :3001  ──Prisma──▶  PostgreSQL :5432
```

## Cấu trúc thư mục

```
backend/     NestJS API (khởi tạo ở issue #11)
frontend/    Next.js web (khởi tạo ở issue #12)
docs/        Tài liệu, ảnh thiết kế, biên bản Scrum
.github/     CI, mẫu issue / pull request
AGENTS.md    Quy ước cho AI coding agent
```

## Chạy dự án (dev)

Yêu cầu: Node.js 20, Docker.

```bash
git clone https://github.com/nguyxntanphat-cd/cnpm-drink-order.git
cd cnpm-drink-order
cp .env.example .env
docker compose up -d db              # PostgreSQL

cd backend && npm install && npx prisma migrate dev && npm run seed && npm run start:dev   # http://localhost:3001
cd frontend && npm install && npm run dev                                                  # http://localhost:3000
```

Tài khoản demo (sau khi seed): `demo@brewlite.vn / 123456` · nhân viên `staff@brewlite.vn / 123456` · mã giảm giá `WELCOME10`.

Chạy toàn bộ bằng Docker (hoàn thiện ở issue #32): `docker compose up --build`.

## Thành viên & phân công

| TV | Họ tên | GitHub | Vai trò Scrum | Phụ trách chính |
|---|---|---|---|---|
| TV1 | | @ | Scrum Master | Khởi tạo dự án, CI, trang Checkout, Docker & bàn giao |
| TV2 | | @ | Product Owner | Prisma schema + seed, API sản phẩm, API đơn hàng |
| TV3 | | @ | Dev | Trang Menu, Giỏ hàng, Lịch sử đơn |
| TV4 | | @ | Dev | UI kit, Chi tiết sản phẩm, Chi tiết đơn |
| TV5 | | @ | Dev | Đăng ký / Đăng nhập (backend + frontend) |
| TV6 | | @ | Dev | Thanh toán (API idempotent + UI), Hủy đơn |
| TV7 | | @ | Dev | State machine, tồn kho, khuyến mãi / điểm thưởng |

Mỗi người tự điền tên + GitHub vào bảng trên (PR đầu tiên của bạn). Chi tiết từng issue: [docs/BACKLOG.md](docs/BACKLOG.md).

## Kế hoạch Sprint

| Sprint | Mục tiêu | Task |
|---|---|---|
| 1 | Nền tảng & hiển thị menu | Task 1, 2, 3, 4 (+ khung Task 10) |
| 2 | Giỏ hàng, đặt đơn, đăng nhập | Task 5, 6, 7 (+ tồn kho, API thanh toán) |
| 3 | Thanh toán, bàn giao & nghiệp vụ nâng cao | Task 8, 9, 10 |
