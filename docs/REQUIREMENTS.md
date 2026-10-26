# Yêu cầu phần mềm – BrewLite

Tóm tắt từ đề bài "BrewLite – Bài tập lớn Công nghệ Phần mềm" (ĐH Sài Gòn, HK I 2026–2027).
Mỗi task trong [BACKLOG.md](BACKLOG.md) đạt **Definition of Done** được 1 điểm, tổng 10 điểm.
Công nghệ bắt buộc: **NestJS (backend) + Next.js (frontend)**.

## Product Vision
> BrewLite giúp khách hàng đặt và thanh toán đồ uống không dùng tiền mặt chỉ trong vài chạm, giảm thời gian xếp hàng và nhận đơn nhanh tại quầy.

## Các bên liên quan
- **Khách hàng**: đặt đồ uống, chọn size/topping, thanh toán không tiền mặt, theo dõi trạng thái đơn.
- **Nhân viên quầy / Barista**: nhận đơn, cập nhật trạng thái pha chế (mở rộng, ngoài MVP – chỉ làm API).
- **Quản lý cửa hàng / Product Owner**: xác định yêu cầu, ưu tiên backlog, nghiệm thu Increment.
- **Giảng viên**: nghiệm thu quy trình và sản phẩm.
- **Nhóm phát triển**: phân tích, thiết kế, lập trình, kiểm thử, bàn giao.
- **Đơn vị thanh toán**: mô phỏng bằng mock payment gateway.

## Yêu cầu chức năng
1. Hiển thị menu đồ uống kèm hình, tên, giá.
2. Xem chi tiết sản phẩm, chọn size và topping.
3. Thêm / sửa / xóa sản phẩm trong giỏ hàng; tự tính tổng tiền.
4. Đăng ký / đăng nhập (JWT).
5. Tạo đơn hàng và thanh toán không tiền mặt.
6. Hiển thị xác nhận đơn (mã đơn, trạng thái) và lịch sử đơn.

## Yêu cầu phi chức năng
- API phản hồi < 500ms với dữ liệu mẫu.
- Bảo mật: băm mật khẩu, JWT, validate dữ liệu đầu vào.
- Chạy tốt trên các trình duyệt web (thiết kế mobile-first).

## User stories

| Mã | User story | Task |
|---|---|---|
| US-01 | Là khách hàng, tôi muốn xem menu theo danh mục để chọn đồ uống nhanh | 2, 3 |
| US-02 | Là khách hàng, tôi muốn chọn size, lượng đá, topping và thấy giá thay đổi để đặt đúng món mình thích | 4 |
| US-03 | Là khách hàng, tôi muốn thêm/sửa/xóa món trong giỏ và thấy tổng tiền để kiểm soát chi tiêu | 5 |
| US-04 | Là khách hàng, tôi muốn đăng ký/đăng nhập để lưu đơn hàng và điểm thưởng của mình | 7 |
| US-05 | Là khách hàng, tôi muốn thanh toán bằng ví/thẻ/chuyển khoản để không cần mang tiền mặt | 6, 8, 10 |
| US-06 | Là khách hàng, tôi muốn xem xác nhận và lịch sử đơn để theo dõi trạng thái | 9 |
| US-07 | Là khách hàng, tôi muốn nhập mã giảm giá và tích điểm để được ưu đãi | 10 |
| US-08 | Là nhân viên, tôi muốn cập nhật trạng thái pha chế để khách biết khi nào lấy nước | 10 |

### US-05 – Tiêu chí chấp nhận (mẫu từ đề)
- Khi giỏ hàng có ít nhất 1 sản phẩm, nút "Thanh toán" hiển thị tổng tiền.
- Chọn phương thức rồi xác nhận ⇒ đơn ở trạng thái `PAID`.
- Nếu thanh toán lỗi, đơn ở trạng thái `PAYMENT_FAILED` và giỏ hàng được giữ nguyên.
- Sau khi thành công, hiển thị mã đơn và màn hình xác nhận.

## Task 10 – nghiệp vụ backend (tiêu chí chấm)
1. **Order State Machine**: `PENDING → PAID → PREPARING → READY → COMPLETED`; chặn chuyển trạng thái không hợp lệ.
2. **Thanh toán idempotent** với `Idempotency-Key`.
3. **Kiểm soát tồn kho** khi đặt đồng thời: transaction + optimistic locking.
4. **Khuyến mãi & điểm thưởng** sau khi đơn `PAID`.

Bắt buộc có test chứng minh: **(a)** chặn chuyển trạng thái sai; **(b)** 2 lần cùng Idempotency-Key chỉ tạo 1 đơn/thanh toán; **(c)** đặt đồng thời không vượt tồn kho.

## Definition of Done
- Code chạy được, không lỗi build; đạt tiêu chí chấp nhận của task.
- Có commit rõ ràng trên Git; được review trong nhóm.
- API có validate đầu vào; UI xử lý loading/lỗi cơ bản.
- Có hướng dẫn chạy trong README.

## Bàn giao (cuối Sprint 2)
1. Demo end-to-end: chọn sản phẩm → giỏ hàng → thanh toán → xác nhận đơn.
2. Bàn giao mã nguồn (Git), docker-compose chạy được, README.
3. Trình bày Sprint Retrospective.
4. Ghi nhận phản hồi vào backlog cho phiên bản sau.
