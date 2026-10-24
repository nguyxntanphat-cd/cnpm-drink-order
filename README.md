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
backend/     NestJS API (cổng 3001)
frontend/    Next.js web (cổng 3000)
docs/        Tài liệu, ảnh thiết kế, biên bản Scrum
.github/     CI, mẫu issue / pull request
AGENTS.md    Quy ước cho AI coding agent
```

## Chạy dự án (dev)

Yêu cầu: **Node.js 24 LTS** (kèm npm 11), Docker.

```bash
git clone https://github.com/nguyxntanphat-cd/cnpm-drink-order.git
cd cnpm-drink-order
git checkout develop
docker compose up -d db                       # PostgreSQL ở localhost:5432

# Terminal 1 – backend: http://localhost:3001
cd backend
cp .env.example .env
npm install
npm run prisma:migrate
npm run seed
npm run start:dev

# Terminal 2 – frontend: http://localhost:3000
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Mở http://localhost:3000 thấy **"Hello BrewLite"** là backend và frontend đã nối được với nhau.
Chi tiết lệnh: [backend/README.md](backend/README.md), [frontend/README.md](frontend/README.md).

Tài khoản demo (sau khi làm xong issue #14 – seed): `demo@brewlite.vn / 123456` · nhân viên `staff@brewlite.vn / 123456` · mã giảm giá `WELCOME10`.

Chạy toàn bộ bằng Docker (hoàn thiện ở issue #32): `docker compose up --build`.

## Thành viên & phân công

| TV | Họ tên | GitHub | Vai trò Scrum | Phụ trách chính |
|---|---|---|---|---|
| TV1 | Cao Thanh Tuyền | [@ThanhTuyencr30](https://github.com/ThanhTuyencr30) | Scrum Master | Khung dự án + CI (đã xong), Swagger, trang Checkout, trang Tài khoản, Docker & bàn giao |
| TV2 | Nguyễn Tấn Phát | [@nguyxntanphat-cd](https://github.com/nguyxntanphat-cd) | Product Owner | Prisma schema + seed, API sản phẩm, API đơn hàng |
| TV3 | Lê Thế Hào | [@SHI-HAO-1201](https://github.com/SHI-HAO-1201) | Dev | Trang Menu, Giỏ hàng, Lịch sử đơn |
| TV4 | Trần Điền Kha | [@TDKha12](https://github.com/TDKha12) | Dev | UI kit, Chi tiết sản phẩm, Chi tiết đơn |
| TV5 | Ngọc Thanh | [@ngthanh309](https://github.com/ngthanh309) | Dev | Đăng ký / Đăng nhập (backend + frontend) |
| TV6 | Trần Vy | [@tranvyw5-source](https://github.com/tranvyw5-source) | Dev | Thanh toán (API idempotent + UI), Hủy đơn |
| TV7 | Nghiêm Hân | [@nghiemhn-hue](https://github.com/nghiemhn-hue) | Dev | State machine, tồn kho, khuyến mãi / điểm thưởng |

Việc của bạn: vào [Issues](https://github.com/nguyxntanphat-cd/cnpm-drink-order/issues) → lọc **Assignee** là bạn. Chi tiết từng issue: [docs/BACKLOG.md](docs/BACKLOG.md).

## Kế hoạch Sprint

| Sprint | Mục tiêu | Task |
|---|---|---|
| 1 | Nền tảng & hiển thị menu | Task 1, 2, 3, 4 (+ khung Task 10) |
| 2 | Giỏ hàng, đặt đơn, đăng nhập | Task 5, 6, 7 (+ tồn kho, API thanh toán) |
| 3 | Thanh toán, bàn giao & nghiệp vụ nâng cao | Task 8, 9, 10 |

---

## 🚀 Hướng dẫn bắt đầu code

Làm lần lượt từ trên xuống. Lần đầu mất khoảng 30 phút, các lần sau chỉ cần làm từ **Bước 4**.

### Bước 1 – Cài công cụ (một lần)

| Công cụ | Ghi chú |
|---|---|
| [Node.js **24 LTS**](https://nodejs.org) | Bắt buộc bản 24 (kèm npm 11). Kiểm tra: `node -v` → `v24.x` |
| [Git](https://git-scm.com) | Kiểm tra: `git -v` |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Để chạy PostgreSQL. Mở Docker Desktop trước khi chạy lệnh |
| [VS Code](https://code.visualstudio.com) | Mở repo lần đầu sẽ được gợi ý cài các extension cần thiết → bấm **Install All** |

Cấu hình Git (một lần):
```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email-github@cua-ban.com"
```

### Bước 2 – Vào repo và lấy code về (một lần)

1. Mở email, bấm **chấp nhận lời mời** vào repo (nhóm trưởng gửi).
2. Clone và chuyển sang nhánh `develop`:
   ```bash
   git clone https://github.com/nguyxntanphat-cd/cnpm-drink-order.git
   cd cnpm-drink-order
   git checkout develop
   ```

### Bước 3 – Chạy thử dự án (một lần)

```bash
docker compose up -d db                     # bật PostgreSQL

cd backend
cp .env.example .env
npm install
npm run prisma:migrate
npm run start:dev                           # để nguyên terminal này
```
Mở terminal thứ hai:
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```
Mở http://localhost:3000 → thấy **"Hello BrewLite"** là thành công. Bị lỗi thì xem mục *Lỗi thường gặp* bên dưới.

### Bước 4 – Nhận việc

1. Vào tab [**Issues**](https://github.com/nguyxntanphat-cd/cnpm-drink-order/issues), bấm vào nhãn của bạn (`TV1` … `TV7`) để lọc.
2. Làm theo thứ tự Sprint (nhãn `sprint-1` trước). Đọc kỹ mục **Phụ thuộc** và **Tiêu chí chấp nhận** trong issue.
3. Ở cột phải của issue, bấm **Assignees → assign yourself** để cả nhóm biết bạn đang làm.
4. Xem tiến độ từng Sprint ở tab [**Milestones**](https://github.com/nguyxntanphat-cd/cnpm-drink-order/milestones). Việc Scrum (Planning, Daily, Review, Retro) nằm ở các issue nhãn `scrum`.

Việc có thể bắt đầu **ngay bây giờ** (Sprint 1):

| Người | Issue | Ghi chú |
|---|---|---|
| TV2 | #14 Prisma schema + seed → #15 API sản phẩm | Làm sớm nhất – nhiều người chờ |
| TV4 | #13 Bộ component giao diện → #17 Chi tiết sản phẩm | Làm sớm – frontend dùng chung |
| TV3 | #16 Trang Menu | Dùng dữ liệu giả trước, có API thì nối vào |
| TV7 | #18 State machine + test (a) | Viết logic + test trước, không cần chờ ai |
| TV5 | #22 Auth backend | Đợi #14 có bảng `User`, trong lúc đó đọc tài liệu Passport/JWT |
| TV6 | #25 API thanh toán | Viết `MockPaymentGateway` + thiết kế trước, tích hợp ở Sprint 2 |
| TV1 | #34 Swagger + bộ lọc lỗi, #37 Scrum Sprint 1 | Làm sớm – Swagger giúp cả nhóm thử API; tạo `docs/scrum/sprint-1.md` |

### Bước 5 – Tạo nhánh riêng cho issue

**Luôn** tạo nhánh mới từ `develop` mới nhất, đặt tên theo số issue:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/16-menu-page        # 16 = số issue
```

### Bước 6 – Code (có thể nhờ AI)

- Đọc [AGENTS.md](AGENTS.md) một lần để biết quy ước chung.
- Nếu dùng AI (Claude Code, Cursor, Copilot…), mở AI **ở thư mục gốc repo** và dán câu lệnh mẫu:
  > Đọc AGENTS.md, docs/API.md, docs/DESIGN.md và nội dung issue #16 dưới đây. Chỉ làm đúng phạm vi issue này, không sửa file của module khác. Làm xong chạy lint, build, test.
  > *(dán nội dung issue vào đây)*
- Màn hình giao diện → mở ảnh tương ứng trong [`docs/ui/`](docs/ui/) và gửi kèm cho AI.
- **Đọc lại code AI viết** trước khi commit – bạn là người phải giải thích code khi bảo vệ.

### Bước 7 – Kiểm tra rồi commit

Trong thư mục bạn sửa (`backend` hoặc `frontend`):
```bash
npm run format
npm run lint
npm run build
npm test                 # backend
```
Tất cả không lỗi thì commit (commit nhỏ, nhiều lần cũng được):
```bash
git add .
git commit -m "feat(products): trang menu hiển thị lưới sản phẩm"
git push -u origin feature/16-menu-page
```
Mẫu message: `feat(...)` thêm tính năng · `fix(...)` sửa lỗi · `test(...)` thêm test · `docs: ...` tài liệu.

### Bước 8 – Tạo Pull Request

1. Lên GitHub sẽ thấy nút vàng **Compare & pull request** → bấm.
2. Kiểm tra **base: `develop`** ← **compare: nhánh của bạn**.
3. Điền mẫu có sẵn, dòng đầu ghi `Closes #16` để issue tự đóng khi merge. Đổi giao diện thì dán ảnh chụp màn hình.
4. Bên phải chọn **Reviewers**: một bạn trong nhóm (ưu tiên người làm phần liên quan).
5. Đợi **CI xanh ✅** và được approve → bấm **Squash and merge** → **Delete branch**.

Bị yêu cầu sửa → sửa trên chính nhánh đó, `git commit` + `git push` lại, PR tự cập nhật.

### Bước 9 – Làm issue tiếp theo

```bash
git checkout develop
git pull origin develop      # lấy code mới nhất của cả nhóm
git checkout -b feature/<số-issue>-<ten-ngan>
```
Quay lại **Bước 6**.

### Lỗi thường gặp

| Lỗi | Cách sửa |
|---|---|
| `npm error Cannot read properties of null (reading 'edgesOut')` | Đang dùng Node 22 / npm 10 → cài Node 24 |
| `Can't reach database server at localhost:5432` | Mở Docker Desktop, chạy lại `docker compose up -d db` |
| Trang báo "Không kết nối được backend" | Backend chưa chạy, hoặc thiếu file `frontend/.env.local` |
| `npm warn install-scripts ...` khi cài thư viện mới | Chạy `npm install-scripts approve <tên-thư-viện>` |
| Sau khi `git pull` bị lỗi thiếu thư viện / bảng | Chạy lại `npm install` và `npm run prisma:migrate` trong `backend` |
| Pull Request bị **conflict** | `git pull origin develop` trên nhánh của bạn, sửa chỗ conflict, commit + push lại |
| CI đỏ ❌ | Bấm **Details** cạnh dấu ❌ xem bước nào lỗi, chạy lại lệnh đó ở máy, sửa rồi push |

Vẫn kẹt quá 30 phút → hỏi trong nhóm chat hoặc comment ngay trong issue.
