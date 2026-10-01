# CNPM – Ứng dụng đặt đồ uống

Đồ án môn Công nghệ phần mềm, làm việc nhóm 7 thành viên theo Scrum (3 Sprint).

## Tính năng chính
- Menu sản phẩm, trang chi tiết (chọn size, topping)
- Giỏ hàng (Zustand)
- Đăng ký / đăng nhập (JWT), route guard
- Tạo đơn hàng, xác nhận đơn, lịch sử đơn (`GET /orders/me`)
- Thanh toán mock (`POST /payments`, idempotent)
- State machine trạng thái đơn, kiểm soát tồn kho (transaction + optimistic locking), khuyến mãi / điểm thưởng

## Công nghệ (đề xuất – TV1 chốt ở Task 1)
| Phần | Công nghệ |
|---|---|
| Backend | Node.js, NestJS, Passport/JWT, TypeORM |
| Frontend | React (Vite), Zustand, React Router |
| CSDL | PostgreSQL |
| Triển khai | Docker, docker-compose |

## Cấu trúc thư mục
```
backend/    API (TV2, TV5, TV6, TV7)
frontend/   Giao diện web (TV3, TV4, TV5, TV6)
docs/       Product Backlog, user story, biên bản họp Scrum
.github/    Mẫu issue / pull request
```

## Phân công
| TV | Vai trò Scrum | Mảng | Task phụ trách |
|---|---|---|---|
| TV1 | Scrum Master | DevOps / Fullstack | Task 1 (khởi tạo, Git, README, .env); Task 9: docker-compose, README bàn giao; theo dõi burndown, tổ chức Daily/Retro |
| TV2 | Product Owner | Backend | Task 2 (API products, seed); Task 6 (API tạo đơn); Task 9: `GET /orders/me`; viết user story và Product Backlog |
| TV3 | Dev | Frontend | Task 3 (trang Menu); Task 4 (chi tiết, size/topping) |
| TV4 | Dev | Frontend | Task 5 (giỏ hàng, Zustand); Task 9: màn hình xác nhận và lịch sử đơn |
| TV5 | Dev | Fullstack | Task 7 (auth JWT: backend + trang đăng ký/đăng nhập, guard) |
| TV6 | Dev | Backend | Task 8 (mock payment, `POST /payments`, UI thanh toán); Task 10: thanh toán idempotent |
| TV7 | Dev | Backend | Task 10: State Machine, kiểm soát tồn kho (transaction + optimistic locking), khuyến mãi/điểm thưởng; viết test (a), (c) |

> Mỗi người điền GitHub username của mình vào bảng trong [`docs/TEAM.md`](docs/TEAM.md).

## Lịch Sprint
- **Sprint 1 (Task 1–4):** TV1 dựng khung dự án trước. TV2 làm API products, TV3 làm Menu và Chi tiết.
  - TV4: dựng layout, header, store giỏ hàng (chuẩn bị Task 5)
  - TV5: thiết kế schema User, nghiên cứu Passport/JWT
  - TV6, TV7: thiết kế entity Order, OrderItem, Payment cùng TV2 và viết khung State Machine
- **Sprint 2 (Task 5–7):** TV4 làm giỏ hàng, TV2 làm API đơn hàng, TV5 làm auth. TV6 và TV7 bắt đầu sớm phần lõi Task 10.
- **Sprint 3 (Task 8–10):** TV6 làm thanh toán, TV4 làm xác nhận và lịch sử đơn, TV1 làm docker-compose. TV7 hoàn thiện khuyến mãi/điểm thưởng và test. Cả nhóm demo end-to-end và chuẩn bị Retrospective.

Chi tiết từng task: [`docs/BACKLOG.md`](docs/BACKLOG.md).

## Bắt đầu
```bash
git clone <url-repo>
cd cnpm-drink-order
cp .env.example .env
git checkout develop
git checkout -b feature/<task>-<mo-ta-ngan>
```
Quy trình làm việc nhóm: xem [`CONTRIBUTING.md`](CONTRIBUTING.md).
