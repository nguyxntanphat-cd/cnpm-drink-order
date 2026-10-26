# BrewLite – Ứng dụng đặt cà phê không dùng tiền mặt

Bài tập lớn môn **Công nghệ Phần mềm** – Trường ĐH Sài Gòn, HK I 2026–2027.
Nhóm 7 thành viên, làm theo **Agile Scrum** trong **2 Sprint** (theo đề Assignment 2). Thương hiệu hiển thị trên giao diện: **COLDEN COFFEE**.

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
| [docs/requirements/](docs/requirements/) · [docs/diagrams/](docs/diagrams/) · [docs/architecture/](docs/architecture/) | **Tài liệu & sơ đồ Assignment 2** – mỗi thư mục có README ghi rõ file nào, ai làm |
| [docs/PHAN-CONG.md](docs/PHAN-CONG.md) | **Bảng phân công**: task / sub-task / người làm / nhánh |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Product Backlog, story point, thứ tự phụ thuộc |
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
frontend  Next.js  :3000  ──REST/JSON──▶  backend  NestJS  :3001  ──Prisma──▶  PostgreSQL :5432
```

## Cấu trúc thư mục

```
backend/    NestJS API – backend (cổng 3001)
frontend/    Next.js web – frontend (cổng 3000)
tests/       E2E test (Playwright)
docs/        Tài liệu, ảnh thiết kế, biên bản Scrum
.github/     CI, mẫu issue / pull request
AGENTS.md    Quy ước cho AI coding agent
```

## Chạy dự án (dev)

Yêu cầu: **Node.js 24 LTS** (kèm npm 11), Docker.

```bash
git clone https://github.com/nguyxntanphat-cd/cnpm-drink-order.git
cd cnpm-drink-order
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
| TV1 | Cao Thanh Tuyền | [@ThanhTuyencr30](https://github.com/ThanhTuyencr30) | Scrum Master | Swagger + `/health`, trang Checkout, Docker, pipeline CD + deploy production |
| TV2 | Nguyễn Tấn Phát | [@nguyxntanphat-cd](https://github.com/nguyxntanphat-cd) | **Lead** · Product Owner | Khung dự án + CI, Prisma schema + seed, API sản phẩm, API đơn hàng |
| TV3 | Lê Thế Hào | [@SHI-HAO-1201](https://github.com/SHI-HAO-1201) | Dev | Trang Menu, Giỏ hàng, Lịch sử đơn |
| TV4 | Trần Điền Kha | [@TDKha12](https://github.com/TDKha12) | Dev | UI kit, Chi tiết sản phẩm, PWA, Chi tiết đơn |
| TV5 | Ngọc Thanh | [@ngthanh309](https://github.com/ngthanh309) | Dev | Đăng ký / Đăng nhập (backend + frontend), trang Tài khoản |
| TV6 | Trần Vy | [@tranvyw5-source](https://github.com/tranvyw5-source) | Dev | Thanh toán (API idempotent + UI), Hủy đơn, E2E test |
| TV7 | Nghiêm Hân | [@nghiemhn-hue](https://github.com/nghiemhn-hue) | Dev | State machine, tồn kho, khuyến mãi / điểm thưởng |

Việc của bạn: vào [Issues](https://github.com/nguyxntanphat-cd/cnpm-drink-order/issues) → lọc **Assignee** là bạn. Chi tiết từng issue: [docs/BACKLOG.md](docs/BACKLOG.md).

## Kế hoạch Sprint

| Sprint | Mục tiêu | Task |
|---|---|---|
| 1 | Nền tảng, tài liệu Task 1–3, CI và MVP xem menu (Assignment 2 – Task 4) | Task 1, 2, 3, 4 (+ khởi động Task 10) |
| 2 | Hoàn thiện MVP, CI/CD, deploy production và bàn giao (Assignment 2 – Task 5) | Task 5, 6, 7, 8, 9, 10 + CD, E2E, PWA |

---

## ⚠️ Quy định của thầy (buổi 23/10/2026)

- **Lịch sử commit là minh chứng duy nhất. Không có commit → 0 điểm.** Tự commit bằng tài khoản của mình, không commit hộ.
- **Ai cũng phải code** (frontend hoặc backend). Chỉ viết tài liệu → tối đa 3 điểm.
- Lead chia nhánh, thành viên code trên nhánh của mình rồi tạo **Pull Request**, **Lead review và merge vào `main`**.
- Backend phải kiểm thử API bằng **Swagger** (`http://localhost:3001/docs`) hoặc **Postman** và chụp ảnh minh chứng.
- Hiểu code mình viết (Props, State, luồng dữ liệu) – thầy **chọn ngẫu nhiên nhóm lên hỏi trực tiếp** từ tuần 8–9; vắng mặt = mất điểm chuyên cần.

Bảng phân công đích danh từng việc: [docs/PHAN-CONG.md](docs/PHAN-CONG.md).

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
2. Clone repo về máy:
   ```bash
   git clone https://github.com/nguyxntanphat-cd/cnpm-drink-order.git
   cd cnpm-drink-order
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
| TV1 | #34 Swagger + bộ lọc lỗi | Làm sớm – Swagger giúp cả nhóm thử API |

### Bước 5 – Chuyển sang nhánh của bạn

Mỗi người có **đúng 1 nhánh riêng**, dùng cho **mọi việc** (code, sơ đồ, tài liệu):

| Người | Nhánh | Việc (theo thứ tự nên làm) |
|---|---|---|
| TV1 Cao Thanh Tuyền | `tv1-tuyen` | #34 → #21 → #32 → #50 |
| TV2 Nguyễn Tấn Phát | `tv2-phat` | #14 → #15 → #20 → #29 |
| TV3 Lê Thế Hào | `tv3-hao` | #16 → #19 → #30 |
| TV4 Trần Điền Kha | `tv4-kha` | #13 → #17 → #52 → #31 |
| TV5 Ngọc Thanh | `tv5-thanh` | #22 → #23 → #24 → #35 |
| TV6 Trần Vy | `tv6-vy` | #25 → #27 → #28 → #51 |
| TV7 Nghiêm Hân | `tv7-han` | #18 → #26 → #33 |

```bash
git fetch origin
git checkout tv3-hao
git merge origin/main             # lấy code mới nhất của cả nhóm trước khi làm
```
**Không làm thẳng trên `main`.** Việc tùy chọn #36: ai nhận thì làm trên nhánh của mình.

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
npm test
```
Tất cả không lỗi thì commit (commit nhỏ, nhiều lần cũng được):
```bash
git add .
git commit -m "feat(products): trang menu hiển thị lưới sản phẩm"
git push -u origin tv3-hao      # lần đầu; các lần sau chỉ cần git push
```
Mẫu message: `feat(...)` thêm tính năng · `fix(...)` sửa lỗi · `test(...)` thêm test · `docs: ...` tài liệu.

### Bước 8 – Tạo Pull Request

1. Lên GitHub sẽ thấy nút vàng **Compare & pull request** → bấm.
2. Kiểm tra **base: `main`** ← **compare: nhánh của bạn**.
3. Điền mẫu có sẵn, dòng đầu ghi `Closes #16` để issue tự đóng khi merge. Đổi giao diện thì dán ảnh chụp màn hình.
4. Bên phải chọn **Reviewers: @nguyxntanphat-cd** (Lead).
5. Đợi **CI xanh ✅** → Lead review và merge vào `main` bằng **Create a merge commit** (giữ nguyên các commit của bạn làm minh chứng).
6. **Không bấm "Delete branch"** sau khi merge – nhánh `tvX-tên` dùng suốt dự án.

Mỗi PR chỉ chứa **1 việc** (1 issue hoặc 1 sơ đồ/tài liệu). Xong việc nào tạo PR việc đó, không dồn đến cuối kỳ.

Bị yêu cầu sửa → sửa trên chính nhánh đó, `git commit` + `git push` lại, PR tự cập nhật.

### Bước 9 – Làm việc tiếp theo (vẫn trên nhánh của bạn)

Sau khi PR trước được merge:
```bash
git checkout tv3-hao
git fetch origin
git merge origin/main        # bắt buộc: đồng bộ nhánh với main (gồm phần bạn vừa merge)
git push
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
| Pull Request bị **conflict** | `git fetch origin && git merge origin/main` trên nhánh của bạn, sửa chỗ conflict, commit + push lại |
| CI đỏ ❌ | Bấm **Details** cạnh dấu ❌ xem bước nào lỗi, chạy lại lệnh đó ở máy, sửa rồi push |

Vẫn kẹt quá 30 phút → hỏi trong nhóm chat hoặc comment ngay trong issue.
