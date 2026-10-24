#!/usr/bin/env bash
# Xuất 1 PDF cho mỗi thành viên trong members.csv: out/BrewLite-<MSSV>-<tên>.pdf
# Nội dung giống nhau, trang bìa ghi họ tên + MSSV của từng người (yêu cầu của thầy).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p out
tail -n +2 members.csv | while IFS=, read -r tv hoten mssv github; do
  [ -z "$tv" ] && continue
  job="BrewLite-${mssv}-${tv}"
  echo ">> $job ($hoten)"
  latexmk -xelatex -interaction=nonstopmode -halt-on-error -quiet \
    -jobname="$job" -outdir=out \
    -usepretex="\\def\\hoten{$hoten}\\def\\mssv{$mssv}" main.tex
done
rm -f out/*.aux out/*.log out/*.fls out/*.fdb_latexmk out/*.toc out/*.lof out/*.out out/*.xdv
ls -1 out/*.pdf
