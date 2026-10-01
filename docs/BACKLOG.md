# Product Backlog

| Task | Nội dung | Người làm | Sprint |
|---|---|---|---|
| 1 | Khởi tạo dự án, Git, README, `.env` | TV1 | 1 |
| 2 | API products + seed dữ liệu | TV2 | 1 |
| 3 | Trang Menu | TV3 | 1 |
| 4 | Trang chi tiết sản phẩm (size / topping) | TV3 | 1 |
| 5 | Giỏ hàng (Zustand) | TV4 | 2 |
| 6 | API tạo đơn hàng | TV2 | 2 |
| 7 | Auth JWT: backend + trang đăng ký/đăng nhập + guard | TV5 | 2 |
| 8 | Mock payment: `POST /payments` + UI thanh toán | TV6 | 3 |
| 9 | docker-compose, README bàn giao (TV1); `GET /orders/me` (TV2); màn hình xác nhận + lịch sử đơn (TV4) | TV1, TV2, TV4 | 3 |
| 10 | State machine đơn hàng, kiểm soát tồn kho (transaction + optimistic locking), khuyến mãi/điểm thưởng, test (a), (c) (TV7); thanh toán idempotent (TV6) | TV6, TV7 | 2–3 |

## Chuẩn bị trong Sprint 1
- TV4: layout, header, store giỏ hàng
- TV5: schema User, nghiên cứu Passport/JWT
- TV6, TV7 (cùng TV2): entity Order, OrderItem, Payment; khung State Machine

## User stories
TV2 (Product Owner) viết theo mẫu: *Là một <vai trò>, tôi muốn <mục tiêu> để <lợi ích>.*
