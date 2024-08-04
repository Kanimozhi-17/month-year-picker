export function getYears({
  minDate,
  maxDate,
}: {
  minDate: string;
  maxDate: string;
}) {
  const startYear = new Date(minDate).getFullYear();
  const endYear = new Date(maxDate).getFullYear();
  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return years;
}
