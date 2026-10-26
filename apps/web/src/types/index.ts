// Kiểu dữ liệu dùng chung – phải khớp docs/API.md.

export type Size = 'S' | 'M' | 'L';
export type IceLevel = 'NONE' | 'LESS' | 'NORMAL' | 'MORE';
export type OrderStatus =
  'PENDING' | 'PAYMENT_FAILED' | 'PAID' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
export type PaymentMethod = 'QR_TRANSFER' | 'E_WALLET' | 'CARD';
export type PaymentStatus = 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';
export type Role = 'CUSTOMER' | 'STAFF';

export interface User {
  id: number;
  email: string;
  fullName: string | null;
  phone: string | null;
  role: Role;
  loyaltyPoints: number;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Category {
  id: number;
  name: string;
}

export interface ProductSummary {
  id: number;
  name: string;
  imageUrl: string;
  basePrice: number;
  category: string | null;
  isAvailable: boolean;
}

export interface ProductDetail extends ProductSummary {
  description: string | null;
  stock: number;
  sizes: { size: Size; price: number }[];
}

export interface Topping {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  imageUrl: string;
  size: Size;
  ice: IceLevel;
  qty: number;
  unitPrice: number;
  lineTotal: number;
  toppings: { toppingId: number; name: string; price: number }[];
}

export interface Order {
  id: number;
  code: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  total: number;
  promoCode: string | null;
  createdAt: string;
  items: OrderItem[];
  statusHistory: { from: OrderStatus | null; to: OrderStatus; createdAt: string }[];
}

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
}

export interface CreateOrderRequest {
  items: { productId: number; size: Size; ice: IceLevel; qty: number; toppingIds: number[] }[];
  promoCode?: string;
  note?: string;
}

export interface CreatePaymentRequest {
  orderId: number;
  method: PaymentMethod;
  simulate?: 'SUCCESS' | 'FAIL';
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}
