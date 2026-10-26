# Hợp đồng API – BrewLite

Base URL (dev): `http://localhost:3001` · Swagger (thử API trực tiếp): `http://localhost:3001/docs`. Dữ liệu JSON, tiền là số nguyên VND, thời gian ISO 8601.
Route có 🔒 cần header `Authorization: Bearer <accessToken>`.
Lỗi theo định dạng mặc định của NestJS: `{ "statusCode": 400, "message": "...", "error": "Bad Request" }`.

Frontend và backend **phải** bám đúng file này. Muốn đổi → PR sửa file này trước, báo người làm phía bên kia.

## Kiểu dùng chung (TypeScript)

```ts
type Size = 'S' | 'M' | 'L';
type IceLevel = 'NONE' | 'LESS' | 'NORMAL' | 'MORE';
type OrderStatus = 'PENDING' | 'PAYMENT_FAILED' | 'PAID' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
type PaymentMethod = 'QR_TRANSFER' | 'E_WALLET' | 'CARD';
type PaymentStatus = 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

interface User { id: number; email: string; fullName: string | null; phone: string | null; role: 'CUSTOMER' | 'STAFF'; loyaltyPoints: number }

interface ProductSummary { id: number; name: string; imageUrl: string; basePrice: number; category: string | null; isAvailable: boolean }
interface ProductDetail extends ProductSummary {
  description: string | null;
  stock: number;
  sizes: { size: Size; price: number }[];
}
interface Topping { id: number; name: string; price: number; isAvailable: boolean }

interface OrderItem {
  id: number; productId: number; productName: string; imageUrl: string;
  size: Size; ice: IceLevel; qty: number; unitPrice: number; lineTotal: number;
  toppings: { toppingId: number; name: string; price: number }[];
}
interface Order {
  id: number; code: string; status: OrderStatus;
  subtotal: number; discount: number; total: number;
  promoCode: string | null; createdAt: string;
  items: OrderItem[];
  statusHistory: { from: OrderStatus | null; to: OrderStatus; createdAt: string }[];
}
interface Payment { id: number; orderId: number; amount: number; method: PaymentMethod; status: PaymentStatus; createdAt: string }
```

## Auth (TV5)

| Method | Path | Body | Trả về |
|---|---|---|---|
| POST | `/auth/register` | `{ email, password (≥6), fullName? }` | `201 { accessToken, user }` · `409` email đã tồn tại |
| POST | `/auth/login` | `{ email, password }` | `200 { accessToken, user }` · `401` sai thông tin |
| GET 🔒 | `/auth/me` | – | `User` |
| POST | `/auth/forgot-password` *(mở rộng)* | `{ email }` | `200 { message }` – mã OTP mock in ra log server |
| POST | `/auth/reset-password` *(mở rộng)* | `{ email, code, newPassword }` | `200 { message }` |

## Sản phẩm (TV2)

| Method | Path | Query/Body | Trả về |
|---|---|---|---|
| GET | `/categories` | – | `{ id, name }[]` |
| GET | `/products` | `?categoryId=&search=` | `ProductSummary[]` |
| GET | `/products/:id` | – | `ProductDetail` · `404` |
| GET | `/toppings` | – | `Topping[]` |

## Đơn hàng (TV2 + TV7)

### POST 🔒 `/orders` – tạo đơn PENDING (Task 6)
Header tùy chọn: `Idempotency-Key: <uuid>` – gửi lại cùng key trả về đúng đơn đã tạo, không tạo đơn mới (Task 10 – test b).
```json
{
  "items": [
    { "productId": 1, "size": "M", "ice": "NORMAL", "qty": 1, "toppingIds": [1, 3] }
  ],
  "promoCode": "WELCOME10",
  "note": "Ít ngọt"
}
```
- `items` ≥ 1, `qty` 1–20. Server tự tính giá (AGENTS.md §6.1), trừ kho (§6.3), áp mã (§6.5).
- `201 Order` · `400` dữ liệu sai / mã không hợp lệ · `409 { message: "OUT_OF_STOCK", ... }` hết hàng.

| Method | Path | Mô tả |
|---|---|---|
| GET 🔒 | `/orders/me?status=active\|completed` | Lịch sử đơn của user, mới nhất trước. `active` = PENDING, PAYMENT_FAILED, PAID, PREPARING, READY; `completed` = COMPLETED, CANCELLED |
| GET 🔒 | `/orders/:id` | Chi tiết đơn (chỉ chủ đơn hoặc STAFF) |
| POST 🔒 | `/orders/:id/cancel` | Hủy đơn (chỉ khi PENDING / PAYMENT_FAILED / PAID), hoàn kho, hoàn tiền mô phỏng |
| PATCH 🔒 STAFF | `/orders/:id/status` | `{ status }` – nhân viên chuyển PAID→PREPARING→READY→COMPLETED |
| POST 🔒 | `/promotions/validate` | `{ code, subtotal }` → `{ valid, discount, message }` – để UI xem trước giảm giá |

## Thanh toán (TV6)

### POST 🔒 `/payments` (Task 8, idempotent – Task 10)
Header bắt buộc: `Idempotency-Key: <uuid>`
```json
{ "orderId": 12, "method": "QR_TRANSFER", "simulate": "SUCCESS" }
```
- Đơn phải ở `PENDING` (hoặc `PAYMENT_FAILED` → server tự chuyển về `PENDING` rồi thanh toán lại).
- `200 { payment: Payment, order: Order }`.
- Gửi lại cùng `Idempotency-Key` → trả lại đúng response cũ, không tạo payment mới.
- Thiếu header → `400`. Key đã dùng cho đơn khác → `409`.

## Trạng thái hiển thị trên UI

| OrderStatus | Nhãn tiếng Việt | Màu |
|---|---|---|
| PENDING | Chờ thanh toán | warning |
| PAYMENT_FAILED | Thanh toán thất bại | danger |
| PAID | Đã thanh toán | info |
| PREPARING | Đang pha chế | warning |
| READY | Sẵn sàng lấy tại quầy | info |
| COMPLETED | Hoàn thành (đã nhận đồ uống) | success |
| CANCELLED | Đã hủy | danger |
