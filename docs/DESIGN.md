# Thiết kế giao diện – BrewLite / COLDEN COFFEE

Ảnh thiết kế gốc nằm trong [`docs/ui/`](ui/). Mọi màn hình phải bám theo ảnh; màu, bo góc, chữ lấy từ token dưới đây.

| Ảnh | Màn hình |
|---|---|
| [`01-auth.jpg`](ui/01-auth.jpg) | Đăng nhập, Đăng ký, Quên mật khẩu + popup thành công / thất bại |
| [`02-product-detail.jpg`](ui/02-product-detail.jpg) | Chi tiết sản phẩm: size, lượng đá, topping, số lượng, nút "Thêm vào giỏ hàng - giá" |
| [`03-cart.jpg`](ui/03-cart.jpg) | Giỏ hàng: tăng/giảm số lượng, xóa món, tạm tính, nút Đặt hàng |
| [`04-checkout-payment.png`](ui/04-checkout-payment.png) | "Đơn hàng của bạn" + Thanh toán QR với 4 trạng thái: chờ, đang xử lý, thất bại, thành công |
| [`05-order-history.jpg`](ui/05-order-history.jpg) | Lịch sử đặt hàng (tab), chi tiết đơn + timeline trạng thái |

> ⚠️ **Đề không có phần giao hàng.** Ảnh 03, 04, 05 còn dòng "Phí giao hàng", thông tin shipper, địa chỉ giao và nhãn "Giao hàng thành công/thất bại" – **không làm các phần này** (xem bảng "Khác biệt giữa thiết kế và đề bài" cuối file).

> Chưa có ảnh cho màn **Menu** (`/`): dùng lưới thẻ sản phẩm 2 cột, cùng phong cách thẻ trắng bo góc như giỏ hàng,
> thanh lọc danh mục dạng nút tab giống màn Lịch sử, nút giỏ hàng có badge số lượng ở header.

## Design tokens

Đã khai báo sẵn trong `apps/web/src/app/globals.css` bằng `@theme` (Tailwind v4). Bảng dưới là giá trị tương ứng; class dùng: `bg-background`, `bg-surface`, `bg-primary`, `bg-primary-dark`, `bg-primary-light`, `text-ink`, `text-ink-muted`, `border-line`, `text-success`, `bg-success-soft`, `text-danger`, `bg-danger-soft`, `bg-warning-soft`, `rounded-card`, `rounded-btn`.

```ts
colors: {
  background: '#F5EBDD',   // nền kem toàn trang
  surface:    '#FFFFFF',   // thẻ, ô nhập
  primary: {
    DEFAULT:  '#C08A5A',   // nút chính, giá tiền, viền đang chọn
    dark:     '#8B5E3C',   // hover/active
    light:    '#F1E2D0',   // nền icon, nút phụ
  },
  ink: {
    DEFAULT:  '#3B2A20',   // chữ chính (nâu đậm)
    muted:    '#8A7A6D',   // chữ phụ (Size M, Trân châu…)
  },
  line:       '#E9DCCB',   // viền, đường kẻ
  success:  { DEFAULT: '#2E7D32', soft: '#E4F2E7' },
  danger:   { DEFAULT: '#C62828', soft: '#FBE9E7' },
  warning:  { DEFAULT: '#C08A5A', soft: '#FFF3D6' },
},
borderRadius: { card: '16px', btn: '12px' },
fontFamily: { sans: ['var(--font-inter)', 'system-ui', 'sans-serif'] }, // next/font Inter, subsets ['latin','vietnamese']
```

## Quy tắc chung

- Khung nội dung: `max-w-[430px] mx-auto min-h-screen bg-background px-4`.
- Header: mũi tên quay lại `←` + tiêu đề (`text-xl font-semibold text-ink`), icon bên phải (giỏ hàng có badge đỏ).
- Thẻ: `bg-surface rounded-card p-3 shadow-sm`; ảnh sản phẩm vuông bo `rounded-xl`.
- Giá tiền: `text-primary font-semibold`, định dạng `28.000đ`.
- Nút chính: `bg-primary text-white rounded-btn h-12 w-full`, có mũi tên `→` bên phải khi là bước tiếp theo.
- Nút phụ: nền trắng, viền `line`, đang chọn thì viền `primary`.
- Stepper số lượng: nút `−` / `+` tròn viền, số ở giữa trên nền `primary`.
- Popup kết quả (đăng nhập, đăng ký, đổi mật khẩu): lớp phủ mờ, hộp `primary-light`, icon ✓ xanh / ✕ đỏ trong vòng tròn, tiêu đề màu success/danger.
- Màn thanh toán: vòng tròn icon lớn — chờ (đồng hồ, `warning.soft`), thất bại (✕, `danger.soft`), thành công (✓, `success.soft`).
- Trạng thái đơn hiển thị theo bảng nhãn/màu trong [`API.md`](API.md#trạng-thái-hiển-thị-trên-ui).
- Mọi màn có dữ liệu từ API phải có skeleton/loading, thông báo lỗi và trạng thái rỗng ("Giỏ hàng trống", "Chưa có đơn hàng").

## Khác biệt giữa thiết kế và đề bài (đã thống nhất)

| Thiết kế | Đề bài | Cách làm |
|---|---|---|
| Size M / L | Size S / M / L | Seed tạo đủ S/M/L (đề chấm "chọn size S/M/L"); UI hiển thị các size API trả về, cùng kiểu radio như ảnh |
| "Thanh toán khi nhận hàng" | Bắt buộc **không dùng tiền mặt** | Vô hiệu hóa lựa chọn này. Thay bằng 3 phương thức mock: **Chuyển khoản QR**, **Ví điện tử**, **Thẻ ngân hàng** (đề chấm "chọn Ví/Thẻ"); dùng cùng kiểu nút như ảnh |
| Theo dõi shipper, giao hàng, địa chỉ giao | **Đề không có phần giao hàng** – khách nhận đồ uống tại quầy | **Bỏ hẳn**: không có shipper, địa chỉ giao, thời gian giao. Trang chi tiết đơn chỉ có thông tin món + timeline `statusHistory` (Đã đặt → Đã thanh toán → Đang pha chế → Sẵn sàng lấy tại quầy → Hoàn thành) |
| Dòng "Phí giao hàng 0đ" ở giỏ hàng / đơn hàng | Không có giao hàng | **Bỏ dòng này**: chỉ hiển thị Tạm tính, Giảm giá (nếu có), Tổng cộng |
| Nhãn "Giao hàng thành công / thất bại" ở lịch sử đơn | Không có giao hàng | Dùng nhãn trạng thái đơn trong bảng API.md (Hoàn thành, Đã hủy, Thanh toán thất bại…) |
