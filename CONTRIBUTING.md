# Quy trình làm việc nhóm

Đọc [AGENTS.md](AGENTS.md) trước khi code (kể cả khi nhờ AI viết code).

## 1. Nhận việc
1. Mở [Issues](https://github.com/nguyxntanphat-cd/cnpm-drink-order/issues), lọc theo nhãn của bạn (`TV1`…`TV7`).
2. Tự assign issue cho mình, kéo sang cột *In progress* trên Project board (nếu dùng).

## 2. Nhánh
| Nhánh | Mục đích |
|---|---|
| `main` | Bản demo ổn định – chỉ merge từ `develop` cuối mỗi Sprint |
| `develop` | Nhánh tích hợp – mọi PR đi vào đây |
| `feature/<số issue>-<mo-ta>` | Ví dụ `feature/17-product-detail-page` |
| `fix/<số issue>-<mo-ta>` | Sửa lỗi |

Không push thẳng lên `main` / `develop`.

```bash
git checkout develop && git pull origin develop
git checkout -b feature/17-product-detail-page
# ... code ...
git add . && git commit -m "feat(products): trang chi tiết chọn size và topping"
git push -u origin feature/17-product-detail-page
```

## 3. Commit (Conventional Commits)
`<type>(<scope>): <mô tả>` – type: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`.
Scope là module: `auth`, `products`, `cart`, `orders`, `payments`, `inventory`, `promotions`, `ui`, `devops`.

## 4. Pull Request
- Base: **`develop`**. Một PR = một issue, ghi `Closes #<số>`.
- Trước khi tạo PR: `git pull origin develop`, chạy `npm run lint && npm run build && npm test` trong thư mục bạn sửa.
- Cần **CI xanh + ≥ 1 người review**. Người review: ưu tiên người làm phần liên quan (ví dụ frontend gọi API của ai thì người đó review).
- Có thay đổi giao diện → đính kèm ảnh chụp màn hình.
- Merge bằng **Squash and merge**, xóa nhánh sau khi merge.

## 5. Gặp conflict
```bash
git checkout feature/xx && git pull origin develop
# sửa conflict, chạy lại lint/build/test
git commit && git push
```

## 6. Scrum
- **Daily** (15 phút): trả lời 3 câu trong nhóm chat hoặc ghi vào `docs/scrum/sprint-<N>.md`.
- **Cuối Sprint**: Review + Retrospective, TV1 ghi biên bản theo `docs/scrum/sprint-template.md`, cập nhật burndown.
- Ai bị chặn (chờ API / chờ component) → báo ngay trong Daily và code tạm bằng dữ liệu giả đúng kiểu trong `docs/API.md`.

## 7. Không commit
`.env`, `node_modules/`, `dist/`, `.next/`, file IDE, dữ liệu cá nhân.
