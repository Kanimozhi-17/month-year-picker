export function getDaysInMonth({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }

  return days;
}
