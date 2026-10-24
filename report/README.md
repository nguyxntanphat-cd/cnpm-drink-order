# Báo cáo Assignment 2 (LaTeX)

Yêu cầu của thầy: **soạn bằng LaTeX**, **mỗi thành viên in 1 bản riêng** – trang bìa ghi **họ tên + MSSV của chính mình**, nội dung bên trong giống nhau.
Lời văn chỉ **~2 trang A4**, còn lại là bảng đặc tả và sơ đồ. In xong: bấm kim, **dán băng keo xanh ở gáy**.

## Cấu trúc

| File | Nội dung | Ai sửa |
|---|---|---|
| `config.tex` | Số nhóm, tên giảng viên, học kỳ | Lead |
| `members.csv` | Họ tên + **MSSV** 7 người (thay `MSSV_TVx`) | Lead |
| `cover.tex` | Trang bìa (tự lấy tên + MSSV) | – |
| `sections/01…05-*.tex` | **5 Task lớn** của Assignment 2 – đổi tiêu đề cho đúng đề | Mỗi người phần của mình |
| `sections/phan-cong-table.tex` | Bảng phân công (từ `docs/PHAN-CONG.md`) | Lead |
| `figures/*.png` | Sơ đồ (issue #40–#46), `figures/api/` ảnh Swagger/Postman, `figures/tests/` kết quả test, `figures/ui/` ảnh giao diện | Người vẽ / người làm |

Chèn ảnh: `\hinh{ten-file}{Chú thích}` – ảnh chưa có sẽ hiện khung "Chưa có ảnh" để biết còn thiếu gì.

## Biên dịch

**Không cần cài gì:** push lên GitHub → tab **Actions → Report** → tải **Artifacts** (7 file PDF).

**Trên máy** (cần TeX Live có XeLaTeX, hoặc dùng Overleaf):
```bash
cd report
./build.sh                    # xuất 7 bản: out/BrewLite-<MSSV>-<TV>.pdf
latexmk -xelatex main.tex     # hoặc biên dịch thử 1 bản
```

**Overleaf:** upload cả thư mục `report/`, Menu → Compiler chọn **XeLaTeX**. Muốn bìa tên mình: thêm vào đầu `main.tex`
`\def\hoten{Tên bạn}\def\mssv{MSSV của bạn}`.
