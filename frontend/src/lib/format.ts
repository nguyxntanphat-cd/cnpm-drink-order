/** 28000 → "28.000đ" */
export function formatVnd(amount: number): string {
  return `${new Intl.NumberFormat('vi-VN').format(amount)}đ`;
}

/** ISO → "19/10/2026 - 20:30" (giờ Việt Nam) */
export function formatDateTime(iso: string): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date(iso));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  return `${get('day')}/${get('month')}/${get('year')} - ${get('hour')}:${get('minute')}`;
}
