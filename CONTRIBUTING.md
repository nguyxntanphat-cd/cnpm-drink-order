# Quy trình làm việc nhóm

Đọc [AGENTS.md](AGENTS.md) trước khi code. Quy trình dưới đây theo đúng yêu cầu của thầy (buổi 23/10/2026).

## ⚠️ Quy định bắt buộc của thầy

- **Lịch sử commit là minh chứng duy nhất** bạn có tham gia. **Không có commit → 0 điểm.**
- **Tự commit bằng tài khoản GitHub của mình.** Không commit hộ, không nhờ người khác push giúp.
- **Ai cũng phải code** (frontend hoặc backend) **và vẽ ít nhất 1 sơ đồ**. Chỉ làm tài liệu → tối đa 3 điểm.
- Backend phải **tự kiểm thử API bằng Swagger/Postman** và chụp ảnh minh chứng trước khi bàn giao cho frontend.
- Được dùng AI hỗ trợ nhưng **phải hiểu và tự sửa được code của mình** – thầy hỏi vấn đáp trực tiếp trên code.

## 1. Nhánh

| Nhánh | Ai | Mục đích |
|---|---|---|
| `main` | Lead (Phát) merge | Nhánh chính. **Không ai push thẳng** – chỉ nhận code qua Pull Request |
| `<tên>/<số issue>-<mô tả>` | Thành viên | Mỗi issue một nhánh, **đã tạo sẵn**, tên bắt đầu bằng tên bạn: `tuyen/`, `phat/`, `hao/`, `kha/`, `thanh/`, `vy/`, `han/` |

Tên nhánh của từng issue ghi ở dòng **Nhánh:** đầu mô tả issue. Danh sách đầy đủ: [docs/PHAN-CONG.md](docs/PHAN-CONG.md).

```bash
git fetch origin
git checkout hao/16-menu-page
git merge origin/main            # luôn lấy code mới nhất trước khi code
# ... code ...
git add .
git commit -m "feat(products): trang menu hiển thị lưới sản phẩm"
git push
```

## 2. Commit (Conventional Commits)

`<type>(<scope>): <mô tả tiếng Việt>` – type: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`.
Scope là module: `auth`, `products`, `cart`, `orders`, `payments`, `inventory`, `promotions`, `ui`, `devops`, `report`.

- Commit **nhỏ và thường xuyên** (mỗi khi xong một phần chạy được), không dồn 1 commit khổng lồ cuối kỳ.
- Message nói rõ đã làm gì – thầy đọc lịch sử commit để chấm.

## 3. Pull Request

- **base: `main`** ← compare: nhánh của bạn. Một PR = một issue, mô tả ghi `Closes #<số>`.
- Trước khi tạo PR: `git merge origin/main`, chạy `npm run lint && npm run build && npm test` trong thư mục bạn sửa.
- Chọn **Reviewer: Lead – @nguyxntanphat-cd** (+ 1 bạn làm phần liên quan nếu cần).
- CI phải xanh ✅. Đổi giao diện → dán ảnh chụp màn hình; API → dán ảnh Swagger/Postman.
- **Lead review và merge** bằng **Create a merge commit** (giữ nguyên các commit của bạn trên `main` làm minh chứng).
  Sau đó có thể xóa nhánh.

## 4. Gặp conflict

```bash
git checkout <nhánh của bạn>
git fetch origin && git merge origin/main
# sửa chỗ conflict, chạy lại lint/build/test
git add . && git commit && git push
```

## 5. Scrum

- **Daily** (15 phút): trả lời 3 câu (hôm qua, hôm nay, vướng gì) trong `docs/scrum/sprint-<N>.md` hoặc nhóm chat.
- **Cuối Sprint**: Review + Retrospective, TV1 ghi biên bản theo `docs/scrum/sprint-template.md`, cập nhật burndown.
- Bị chặn (chờ API / component) → báo ngay ở Daily, code tạm bằng dữ liệu giả đúng kiểu trong `docs/API.md`.

## 6. Không commit

`.env`, `node_modules/`, `dist/`, `.next/`, `report/out/`, file IDE, dữ liệu cá nhân.
