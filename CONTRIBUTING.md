# Quy trình làm việc nhóm

## Nhánh
| Nhánh | Mục đích |
|---|---|
| `main` | Bản ổn định, chỉ merge từ `develop` khi kết thúc Sprint / demo |
| `develop` | Nhánh tích hợp, mọi người tạo PR vào đây |
| `feature/task<N>-<mo-ta>` | Mỗi task / chức năng một nhánh, ví dụ `feature/task3-menu-page` |
| `fix/<mo-ta>` | Sửa lỗi |

Không push thẳng lên `main` và `develop`, luôn đi qua Pull Request.

## Các bước
1. Nhận task trên GitHub Issues / Project board, tự assign cho mình.
2. Cập nhật code mới nhất:
   ```bash
   git checkout develop && git pull origin develop
   git checkout -b feature/task5-cart
   ```
3. Commit nhỏ, rõ ràng (Conventional Commits):
   - `feat(cart): thêm store giỏ hàng bằng Zustand`
   - `fix(auth): sửa lỗi token hết hạn`
   - `docs: cập nhật README`
   - Loại commit: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
4. Push và tạo Pull Request vào `develop`, ghi `Closes #<số issue>` trong mô tả.
5. Cần ít nhất **1 thành viên khác review** trước khi merge.
6. Gặp conflict: `git pull origin develop` vào nhánh của mình, sửa rồi push lại.

## Scrum
- Daily: mỗi người cập nhật trong `docs/scrum/` hoặc comment trên issue: hôm qua làm gì, hôm nay làm gì, vướng gì.
- Cuối Sprint: Review + Retrospective, TV1 ghi biên bản vào `docs/scrum/sprint-<N>.md`.

## Không commit
- File `.env` (chỉ commit `.env.example`)
- `node_modules/`, `dist/`, `build/`
