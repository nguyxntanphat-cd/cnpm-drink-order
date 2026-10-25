# Quy trình làm việc nhóm

Đọc [AGENTS.md](AGENTS.md) trước khi code. Quy trình dưới đây theo đúng yêu cầu của thầy (buổi 23/10/2026).

## ⚠️ Quy định bắt buộc của thầy

- **Lịch sử commit là minh chứng duy nhất** bạn có tham gia. **Không có commit → 0 điểm.**
- **Tự commit bằng tài khoản GitHub của mình.** Không commit hộ, không nhờ người khác push giúp.
- **Ai cũng phải code** (frontend hoặc backend). Chỉ làm tài liệu → tối đa 3 điểm.
- Backend phải **tự kiểm thử API bằng Swagger/Postman** và chụp ảnh minh chứng trước khi bàn giao cho frontend.
- Được dùng AI hỗ trợ nhưng **phải hiểu và tự sửa được code của mình** – thầy hỏi vấn đáp trực tiếp trên code.

## 1. Nhánh

| Nhánh | Ai | Mục đích |
|---|---|---|
| `main` | Lead (Phát) merge | Nhánh chính. **Không ai push thẳng** – chỉ nhận thay đổi qua Pull Request |
| `tv1-tuyen`, `tv2-phat`, `tv3-hao`, `tv4-kha`, `tv5-thanh`, `tv6-vy`, `tv7-han` | Mỗi thành viên 1 nhánh | Dùng cho **mọi việc** của bạn: code, sơ đồ, tài liệu. Dùng suốt dự án, **không xóa** |

```bash
git fetch origin
git checkout tv3-hao
git merge origin/main            # luôn đồng bộ với main trước khi làm
# ... code / vẽ sơ đồ ...
git add .
git commit -m "feat(products): trang menu hiển thị lưới sản phẩm"
git push
```

**Vòng làm việc:** làm 1 việc → commit → push → tạo PR → Lead merge → `git merge origin/main` → làm việc tiếp theo trên cùng nhánh.

## 2. Commit (Conventional Commits)

`<type>(<scope>): <mô tả tiếng Việt>` – type: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`.
Scope là module: `auth`, `products`, `cart`, `orders`, `payments`, `inventory`, `promotions`, `ui`, `devops`.

- Commit **nhỏ và thường xuyên** (mỗi khi xong một phần chạy được), không dồn 1 commit khổng lồ cuối kỳ.
- Message nói rõ đã làm gì – thầy đọc lịch sử commit để chấm.

## 3. Pull Request

- **base: `main`** ← compare: nhánh của bạn. **Một PR = một việc** (1 issue hoặc 1 sơ đồ/tài liệu); với issue thì ghi `Closes #<số>`.
- Trước khi tạo PR: `git merge origin/main`, chạy `npm run lint && npm run build && npm test` trong thư mục bạn sửa.
- Chọn **Reviewer: Lead – @nguyxntanphat-cd** (+ 1 bạn làm phần liên quan nếu cần).
- CI phải xanh ✅. Đổi giao diện → dán ảnh chụp màn hình; API → dán ảnh Swagger/Postman.
- **Lead review và merge** bằng **Create a merge commit** – **không dùng Squash/Rebase** (nhánh dùng lại nhiều lần, squash sẽ gây conflict; merge commit giữ nguyên commit của bạn làm minh chứng).
- **Không xóa nhánh** sau khi merge. Đồng bộ lại: `git fetch origin && git merge origin/main && git push`.

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

`.env`, `node_modules/`, `dist/`, `.next/`, file IDE, dữ liệu cá nhân.
