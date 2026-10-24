# Product Backlog & phân công

Đề có 10 task (mỗi task 1 điểm). Mỗi task được chia thành các issue con trên GitHub để **7 người code khối lượng ngang nhau (13 story point/người)**.
Bảng phân công đích danh (gồm sơ đồ, nhánh): [PHAN-CONG.md](PHAN-CONG.md). Nguồn sự thật là GitHub Issues + [Milestones](https://github.com/nguyxntanphat-cd/cnpm-drink-order/milestones) – file này chỉ là bảng tổng hợp.

## Theo Sprint

### Sprint 1 – Nền tảng & hiển thị menu

| Issue | Mã | Việc | Người | SP | Task cha |
|---|---|---|---|---|---|
| #11 ✅ | T1.1 | Khởi tạo backend NestJS + Prisma + Postgres (docker) | TV1 | 3 | #1 Khởi tạo dự án |
| #12 ✅ | T1.2 | Khởi tạo frontend Next.js + Tailwind + TanStack Query + api-client | TV1 | 2 | #1 Khởi tạo dự án |
| #13 | T1.3 | Design system: Tailwind tokens + components/ui + layout | TV4 | 3 | #1 Khởi tạo dự án |
| #14 | T2.1 | Prisma schema, migration đầu tiên và seed dữ liệu | TV2 | 3 | #2 API sản phẩm |
| #15 | T2.2 | API GET /categories, /products, /products/:id, /toppings | TV2 | 3 | #2 API sản phẩm |
| #16 | T3.1 | Trang Menu (/): lưới sản phẩm, lọc danh mục, tìm kiếm | TV3 | 5 | #3 Trang Menu |
| #17 | T4.1 | Trang chi tiết sản phẩm: size, lượng đá, topping, số lượng, tính giá | TV4 | 5 | #4 Chi tiết sản phẩm |
| #18 | T10.1 | Order State Machine + lịch sử trạng thái + PATCH /orders/:id/status + test (a) | TV7 | 5 | #10 Nghiệp vụ backend |
| #34 | T1.4 | Swagger /docs + bộ lọc lỗi toàn cục cho backend | TV1 | 2 | #1 Khởi tạo dự án |

Scrum: issue #37 (Planning, Daily, burndown, Review, Retrospective).

### Sprint 2 – Giỏ hàng, đặt đơn, đăng nhập

| Issue | Mã | Việc | Người | SP | Task cha |
|---|---|---|---|---|---|
| #19 | T5.1 | Giỏ hàng: Zustand store + trang /cart + badge | TV3 | 5 | #5 Giỏ hàng |
| #20 | T6.1 | API POST /orders: validate, tính giá ở server, tạo đơn PENDING | TV2 | 5 | #6 API tạo đơn |
| #21 | T6.2 | Trang /checkout "Đơn hàng của bạn": tóm tắt, mã giảm giá, chọn phương thức | TV1 | 5 | #6 API tạo đơn |
| #22 | T7.1 | Auth backend: register, login, JWT guard, /auth/me | TV5 | 5 | #7 Đăng ký/Đăng nhập (JWT) |
| #23 | T7.2 | Trang Đăng nhập / Đăng ký / Quên mật khẩu + popup kết quả | TV5 | 5 | #7 Đăng ký/Đăng nhập (JWT) |
| #24 | T7.3 | Auth store, gắn token vào api-client, route guard (EX-01) | TV5 | 3 | #7 Đăng ký/Đăng nhập (JWT) |
| #25 | T8.1 | API POST /payments + Mock gateway + Idempotency-Key + test (b) | TV6 | 5 | #8 Thanh toán không tiền mặt |
| #26 | T10.2 | Kiểm soát tồn kho: transaction + optimistic locking + test (c) | TV7 | 5 | #10 Nghiệp vụ backend |

Scrum: issue #38 (Planning, Daily, burndown, Review, Retrospective).

### Sprint 3 – Thanh toán, bàn giao & nghiệp vụ nâng cao

| Issue | Mã | Việc | Người | SP | Task cha |
|---|---|---|---|---|---|
| #27 | T8.2 | Trang thanh toán /payment/[orderId]: QR + 4 trạng thái | TV6 | 5 | #8 Thanh toán không tiền mặt |
| #28 | T8.3 | Hủy đơn: POST /orders/:id/cancel + hoàn tiền mô phỏng + nút Hủy | TV6 | 3 | #8 Thanh toán không tiền mặt |
| #29 | T9.1 | API GET /orders/me và GET /orders/:id | TV2 | 2 | #9 Xác nhận, lịch sử & bàn giao |
| #30 | T9.2 | Trang Lịch sử đặt hàng /orders (tab Tất cả / Đang xử lý / Hoàn thành) | TV3 | 3 | #9 Xác nhận, lịch sử & bàn giao |
| #31 | T9.3 | Trang chi tiết đơn /orders/[id] + timeline trạng thái + màn xác nhận | TV4 | 5 | #9 Xác nhận, lịch sử & bàn giao |
| #32 | T9.4 | docker-compose chạy cả 3 dịch vụ + README bàn giao + kịch bản demo | TV1 | 3 | #9 Xác nhận, lịch sử & bàn giao |
| #33 | T10.3 | Khuyến mãi + điểm thưởng: POST /promotions/validate, applyPromotion, cộng điểm | TV7 | 3 | #10 Nghiệp vụ backend |
| #35 | T9.5 | Trang tài khoản /account: thông tin, điểm thưởng, đăng xuất | TV1 | 3 | #9 Xác nhận, lịch sử & bàn giao |
| #36 | T10.4 | (Mở rộng) Trang nhân viên /staff/orders cập nhật trạng thái pha chế | - | 3 | #10 Nghiệp vụ backend |

Scrum: issue #39 (Planning, Daily, burndown, Review, Retrospective).

## Theo thành viên

| TV | Thành viên | Vai trò | Issue | Tổng SP |
|---|---|---|---|---|
| TV1 | Cao Thanh Tuyền (@ThanhTuyencr30) | Scrum Master · DevOps/Fullstack | #21 T6.2, #32 T9.4, #34 T1.4, #35 T9.5 | 13 |
| TV2 | Nguyễn Tấn Phát (@nguyxntanphat-cd) | Product Owner · Backend | #14 T2.1, #15 T2.2, #20 T6.1, #29 T9.1 | 13 |
| TV3 | Lê Thế Hào (@SHI-HAO-1201) | Dev · Frontend | #16 T3.1, #19 T5.1, #30 T9.2 | 13 |
| TV4 | Trần Điền Kha (@TDKha12) | Dev · Frontend (UI kit) | #13 T1.3, #17 T4.1, #31 T9.3 | 13 |
| TV5 | Ngọc Thanh (@ngthanh309) | Dev · Fullstack (Auth) | #22 T7.1, #23 T7.2, #24 T7.3 | 13 |
| TV6 | Trần Vy (@tranvyw5-source) | Dev · Fullstack (Thanh toán) | #25 T8.1, #27 T8.2, #28 T8.3 | 13 |
| TV7 | Nghiêm Hân (@nghiemhn-hue) | Dev · Backend (Task 10) | #18 T10.1, #26 T10.2, #33 T10.3 | 13 |
| – | – | Mở rộng (ai xong sớm nhận) | #36 T10.4 Trang nhân viên | 3 |

Việc không phải code: TV1 tổ chức Daily/Review/Retro, cập nhật burndown; TV2 viết user story, ưu tiên backlog, nghiệm thu; TV3 viết kịch bản nghiệp vụ ([SCENARIOS.md](SCENARIOS.md)).

## Ba bài test bắt buộc của Task 10

| Test | Nội dung | Issue |
|---|---|---|
| (a) | Chặn chuyển trạng thái sai | #18 (TV7) |
| (b) | 2 lần cùng `Idempotency-Key` chỉ tạo 1 đơn / 1 thanh toán | #20 (TV2 – đơn), #25 (TV6 – thanh toán) |
| (c) | Đặt đồng thời không vượt tồn kho | #26 (TV7) |

## Thứ tự phụ thuộc chính

```
T1.1 ✅ backend ─┬─ T2.1 schema ─┬─ T2.2 products ─┬─ T3.1 menu
                 │               │                 └─ T4.1 detail ─┐
T1.2 ✅ frontend ┴─ T1.3 UI kit ─┘                                 ├─ T5.1 cart ─ T6.2 checkout ─ T8.2 payment UI ─ T9.3 order detail
              T2.1 ─ T10.1 state machine ─ T6.1 POST /orders ─┬─ T10.2 tồn kho
              T2.1 ─ T7.1 auth API ─ T7.3 guard ─ T7.2 UI     ├─ T8.1 POST /payments ─ T10.3 khuyến mãi/điểm ─ T9.5 tài khoản
                                                              └─ T9.1 GET /orders/me ─ T9.2 lịch sử ─ T9.4 docker + bàn giao
```
Ai bị chặn thì code với dữ liệu giả (mock) theo đúng kiểu trong [API.md](API.md), không ngồi chờ.

