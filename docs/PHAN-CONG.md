# Bảng phân công công việc

Căn cứ để đối chiếu với **mã nguồn và lịch sử commit** (yêu cầu của thầy). Mỗi dòng là một issue trên GitHub; người làm tự commit trên nhánh tương ứng và tạo Pull Request vào `main`.

Xem trực tiếp: [Issues](https://github.com/nguyxntanphat-cd/cnpm-drink-order/issues) · [Milestones (tiến độ Sprint)](https://github.com/nguyxntanphat-cd/cnpm-drink-order/milestones) · [Lịch sử commit](https://github.com/nguyxntanphat-cd/cnpm-drink-order/commits/main)

## Thành viên

| TV | Họ tên | GitHub | Vai trò | Code | Sơ đồ |
|---|---|---|---|---|---|
| TV1 | Cao Thanh Tuyền | [@ThanhTuyencr30](https://github.com/ThanhTuyencr30) | Scrum Master | #34, #21, #32, #35 | #40 |
| TV2 | Nguyễn Tấn Phát | [@nguyxntanphat-cd](https://github.com/nguyxntanphat-cd) | Lead · Product Owner | #14, #15, #20, #29 | #41 |
| TV3 | Lê Thế Hào | [@SHI-HAO-1201](https://github.com/SHI-HAO-1201) | Developer | #16, #19, #30 | #42 |
| TV4 | Trần Điền Kha | [@TDKha12](https://github.com/TDKha12) | Developer | #13, #17, #31 | #43 |
| TV5 | Ngọc Thanh | [@ngthanh309](https://github.com/ngthanh309) | Developer | #22, #23, #24 | #44 |
| TV6 | Trần Vy | [@tranvyw5-source](https://github.com/tranvyw5-source) | Developer | #25, #27, #28 | #45 |
| TV7 | Nghiêm Hân | [@nghiemhn-hue](https://github.com/nghiemhn-hue) | Developer | #18, #26, #33 | #46 |

## Task code (10 Task của đề BrewLite)

| Task | Sub-task (issue) | Mảng | Người thực hiện | Nhánh | Sprint |
|---|---|---|---|---|---|
| Task 1 – Khởi tạo dự án và cấu trúc | #11 [T1.1] Khởi tạo backend NestJS + Prisma + Postgres (docker) | DevOps | Nguyễn Tấn Phát (Lead) | đã xong (khung dự án) | 1 |
| Task 1 – Khởi tạo dự án và cấu trúc | #12 [T1.2] Khởi tạo frontend Next.js + Tailwind + TanStack Query + api-client | DevOps | Nguyễn Tấn Phát (Lead) | đã xong (khung dự án) | 1 |
| Task 1 – Khởi tạo dự án và cấu trúc | #13 [T1.3] Design system: Tailwind tokens + components/ui + layout | Frontend | Trần Điền Kha | `kha/13-ui-kit` | 1 |
| Task 1 – Khởi tạo dự án và cấu trúc | #34 [T1.4] Swagger /docs + bộ lọc lỗi toàn cục cho backend | Backend | Cao Thanh Tuyền | `tuyen/34-swagger` | 1 |
| Task 2 – API danh sách sản phẩm | #14 [T2.1] Prisma schema, migration đầu tiên và seed dữ liệu | Backend | Nguyễn Tấn Phát | `phat/14-prisma-schema-seed` | 1 |
| Task 2 – API danh sách sản phẩm | #15 [T2.2] API GET /categories, /products, /products/:id, /toppings | Backend | Nguyễn Tấn Phát | `phat/15-products-api` | 1 |
| Task 3 – Trang Menu (Frontend) | #16 [T3.1] Trang Menu (/): lưới sản phẩm, lọc danh mục, tìm kiếm | Frontend | Lê Thế Hào | `hao/16-menu-page` | 1 |
| Task 4 – Chi tiết và tùy chọn sản phẩm | #17 [T4.1] Trang chi tiết sản phẩm: size, lượng đá, topping, số lượng, tính giá | Frontend | Trần Điền Kha | `kha/17-product-detail-page` | 1 |
| Task 5 – Giỏ hàng (Cart) | #19 [T5.1] Giỏ hàng: Zustand store + trang /cart + badge | Frontend | Lê Thế Hào | `hao/19-cart` | 2 |
| Task 6 – API tạo đơn hàng | #20 [T6.1] API POST /orders: validate, tính giá ở server, tạo đơn PENDING | Backend | Nguyễn Tấn Phát | `phat/20-create-order-api` | 2 |
| Task 6 – API tạo đơn hàng | #21 [T6.2] Trang /checkout "Đơn hàng của bạn": tóm tắt, mã giảm giá, chọn phương thức | Frontend | Cao Thanh Tuyền | `tuyen/21-checkout-page` | 2 |
| Task 7 – Đăng ký / Đăng nhập (JWT) | #22 [T7.1] Auth backend: register, login, JWT guard, /auth/me | Backend | Ngọc Thanh | `thanh/22-auth-api` | 2 |
| Task 7 – Đăng ký / Đăng nhập (JWT) | #23 [T7.2] Trang Đăng nhập / Đăng ký / Quên mật khẩu + popup kết quả | Frontend | Ngọc Thanh | `thanh/23-auth-pages` | 2 |
| Task 7 – Đăng ký / Đăng nhập (JWT) | #24 [T7.3] Auth store, gắn token vào api-client, route guard (EX-01) | Frontend | Ngọc Thanh | `thanh/24-auth-guard` | 2 |
| Task 8 – Thanh toán không tiền mặt | #25 [T8.1] API POST /payments + Mock gateway + Idempotency-Key + test (b) | Backend | Trần Vy | `vy/25-payments-api` | 2 |
| Task 8 – Thanh toán không tiền mặt | #27 [T8.2] Trang thanh toán /payment/[orderId]: QR + 4 trạng thái | Frontend | Trần Vy | `vy/27-payment-page` | 3 |
| Task 8 – Thanh toán không tiền mặt | #28 [T8.3] Hủy đơn: POST /orders/:id/cancel + hoàn tiền mô phỏng + nút Hủy | Fullstack | Trần Vy | `vy/28-cancel-order` | 3 |
| Task 9 – Xác nhận, lịch sử đơn & bàn giao | #29 [T9.1] API GET /orders/me và GET /orders/:id | Backend | Nguyễn Tấn Phát | `phat/29-order-history-api` | 3 |
| Task 9 – Xác nhận, lịch sử đơn & bàn giao | #30 [T9.2] Trang Lịch sử đặt hàng /orders (tab Tất cả / Đang xử lý / Hoàn thành) | Frontend | Lê Thế Hào | `hao/30-order-history-page` | 3 |
| Task 9 – Xác nhận, lịch sử đơn & bàn giao | #31 [T9.3] Trang chi tiết đơn /orders/[id] + timeline trạng thái + màn xác nhận | Frontend | Trần Điền Kha | `kha/31-order-detail-page` | 3 |
| Task 9 – Xác nhận, lịch sử đơn & bàn giao | #32 [T9.4] docker-compose chạy cả 3 dịch vụ + README bàn giao + kịch bản demo | DevOps | Cao Thanh Tuyền | `tuyen/32-docker-handover` | 3 |
| Task 9 – Xác nhận, lịch sử đơn & bàn giao | #35 [T9.5] Trang tài khoản /account: thông tin, điểm thưởng, đăng xuất | Frontend | Cao Thanh Tuyền | `tuyen/35-account-page` | 3 |
| Task 10 – Nghiệp vụ backend | #18 [T10.1] Order State Machine + lịch sử trạng thái + PATCH /orders/:id/status + test (a) | Backend | Nghiêm Hân | `han/18-order-state-machine` | 1 |
| Task 10 – Nghiệp vụ backend | #26 [T10.2] Kiểm soát tồn kho: transaction + optimistic locking + test (c) | Backend | Nghiêm Hân | `han/26-inventory-locking` | 2 |
| Task 10 – Nghiệp vụ backend | #33 [T10.3] Khuyến mãi + điểm thưởng: POST /promotions/validate, applyPromotion, cộng điểm | Backend | Nghiêm Hân | `han/33-promotions-loyalty` | 3 |
| Task 10 – Nghiệp vụ backend | #36 [T10.4] (Mở rộng) Trang nhân viên cập nhật trạng thái | Frontend | Ai xong sớm nhận | `optional/36-staff-orders-page` | 3 |

## Sơ đồ (mỗi người ít nhất 1)

| Issue | Sơ đồ | Người thực hiện | Nhánh |
|---|---|---|---|
| #40 | Sơ đồ kiến trúc hệ thống + triển khai | Cao Thanh Tuyền | `tuyen/diagram-architecture` |
| #41 | ERD cơ sở dữ liệu | Nguyễn Tấn Phát | `phat/diagram-erd` |
| #42 | Use Case tổng quát + Activity luồng đặt hàng | Lê Thế Hào | `hao/diagram-usecase` |
| #43 | Luồng màn hình + cây Component | Trần Điền Kha | `kha/diagram-screen-flow` |
| #44 | Sequence Đăng ký / Đăng nhập JWT | Ngọc Thanh | `thanh/diagram-sequence-auth` |
| #45 | Sequence Đặt & Thanh toán + đặc tả Use Case trọng tâm | Trần Vy | `vy/diagram-sequence-order-payment` |
| #46 | State Machine đơn hàng | Nghiêm Hân | `han/diagram-state-machine` |

## Quản lý dự án & báo cáo

| Issue | Việc | Người thực hiện |
|---|---|---|
| #37, #38, #39 | Scrum Sprint 1–3: Planning, Daily, burndown, Review, Retrospective | Cao Thanh Tuyền (tổ chức), Nguyễn Tấn Phát (nghiệm thu) |
| #47 | Báo cáo Assignment 2 bằng LaTeX, xuất 7 bản bìa cá nhân | Nguyễn Tấn Phát (tổng hợp) + mỗi người phần sơ đồ/minh chứng của mình |
| – | Review và merge Pull Request vào `main` | Nguyễn Tấn Phát (Lead) |
