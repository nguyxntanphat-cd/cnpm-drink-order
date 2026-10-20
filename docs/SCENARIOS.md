# Kịch bản & luồng nghiệp vụ

Nguồn: tài liệu "TV3 – Kịch bản & luồng nghiệp vụ" của nhóm.

## 1. Luồng chính (happy path)

| Bước | Tác nhân | Hành động | Phản hồi của hệ thống | US |
|---|---|---|---|---|
| 1 | Khách hàng | Mở app | Hiển thị trang chủ và menu | US-01 |
| 2 | Khách hàng | Xem menu, lọc theo danh mục | Danh sách món, giá, trạng thái còn/hết | US-01 |
| 3 | Khách hàng | Chọn món, size, topping, số lượng | Tính giá theo size/topping | US-02 |
| 4 | Khách hàng | Bấm "Thêm vào giỏ" | Cập nhật giỏ hàng và tổng tiền | US-03 |
| 5 | Khách hàng | Bấm "Thanh toán" | Kiểm tra đăng nhập; chưa thì mở Đăng nhập | US-04 |
| 6 | Khách hàng | Chọn phương thức, xác nhận | Gửi yêu cầu tới thanh toán mô phỏng | US-05 |
| 7 | Hệ thống thanh toán | Trả kết quả thành công | Đơn PAID, xóa giỏ, màn Xác nhận kèm mã đơn | US-05 |
| 8 | Nhân viên quán | Pha chế, báo sẵn sàng | Cập nhật trạng thái; đơn vào lịch sử | US-06 |

> Ghi chú kỹ thuật: đơn được tạo ở trạng thái `PENDING` khi khách xác nhận ở trang Checkout (`POST /orders`),
> sau đó `POST /payments` chuyển sang `PAID` hoặc `PAYMENT_FAILED` (xem AGENTS.md §6).

## 2. Kịch bản ngoại lệ
Mọi ngoại lệ đều **giữ nguyên giỏ hàng**, trừ khi khách tự xóa món.

| Mã | Tình huống | Điều kiện | Hệ thống xử lý | Quay về bước |
|---|---|---|---|---|
| EX-01 | Chưa đăng nhập khi thanh toán | Bấm "Thanh toán" khi chưa có phiên | Mở Đăng nhập/Đăng ký, giữ giỏ; xong quay lại Thanh toán | 5 |
| EX-02 | Giỏ hàng trống | Giỏ không có món | Khóa nút "Thanh toán", hiện "Giỏ hàng trống" | 2 |
| EX-03 | Thanh toán lỗi | Gateway trả lỗi | Báo lỗi, đơn `PAYMENT_FAILED`, giữ giỏ; cho thử lại / đổi phương thức | 6 |
| EX-04 | Hủy đơn | Khách bấm "Hủy đơn" | Chỉ hủy khi chưa pha chế; trạng thái "Đã hủy", hoàn tiền mô phỏng | Kết thúc |
| EX-05 | Hết hàng | Món/topping hết khi thêm giỏ hoặc thanh toán | Báo món hết, gợi ý thay thế hoặc xóa khỏi giỏ | 3 |

## 3. Use case
Tác nhân: **Khách hàng** (chính), **Hệ thống thanh toán mô phỏng**, **Nhân viên quán**.
Thanh toán «include» Đăng nhập; Chọn size/topping «extend» Xem menu; Hủy đơn «extend» Xem lịch sử đơn.

| Mã | Use case | Tiền điều kiện | Luồng chính | Luồng thay thế | Hậu điều kiện | Issue |
|---|---|---|---|---|---|---|
| UC01 | Xem menu | App đã mở | Chọn danh mục → hiển thị món, giá, trạng thái | Danh mục rỗng → "Chưa có món" | Thấy danh sách món | #16 |
| UC02 | Chọn size/topping | Đang xem chi tiết món | Chọn size, topping, số lượng → tính lại giá | Topping hết → làm mờ (EX-05) | Món cấu hình xong | #17 |
| UC03 | Quản lý giỏ hàng | Đã cấu hình món | Thêm/sửa/xóa → cập nhật tổng | Giỏ trống → khóa Thanh toán (EX-02) | Giỏ lưu theo phiên | #19 |
| UC04 | Đăng ký/Đăng nhập | Chưa có phiên | Nhập email + mật khẩu → xác thực, tạo phiên | Sai mật khẩu → báo lỗi; chưa có tài khoản → Đăng ký | Có phiên, giỏ giữ nguyên | #22 #23 #24 |
| UC05 | Thanh toán | Đã đăng nhập, giỏ ≥ 1 món | Chọn phương thức → gửi → thành công → Xác nhận | Lỗi → EX-03; hết hàng → EX-05 | Đơn lưu, giỏ xóa | #20 #21 #25 #27 |
| UC06 | Xem lịch sử đơn | Đã đăng nhập | Mở Lịch sử → đơn mới nhất trước, kèm trạng thái | Chưa có đơn → "Chưa có đơn hàng" | Xem được chi tiết | #29 #30 #31 |
| UC07 | Hủy đơn | Đơn chưa pha chế | Bấm Hủy → xác nhận → "Đã hủy", hoàn tiền mô phỏng | Đang pha chế → không cho hủy (EX-04) | Đơn "Đã hủy" | #28 |
| UC08 | Cập nhật trạng thái đơn | Nhân viên đăng nhập | Chờ pha chế → Đang pha chế → Sẵn sàng → Hoàn thành | Đơn đã hủy → không cho cập nhật | Khách thấy trạng thái mới | #18 |

## 4. Luồng quyết định

```
Mở app → Xem menu → Chọn món (size, đá, topping)
   → [Còn hàng?] ──không──▶ EX-05: báo hết, quay lại chọn món
   → Thêm vào giỏ → Xem giỏ & tổng tiền (← mua thêm)
   → [Đã đăng nhập?] ──không──▶ EX-01: Đăng nhập rồi quay lại
   → Xác nhận đơn (PENDING) → Thanh toán
   → [Thành công?] ──không──▶ EX-03: PAYMENT_FAILED, thử lại / đổi phương thức
   → Xác nhận đơn (mã đơn, PAID) → PREPARING → READY → Nhận đồ uống (COMPLETED)
```
