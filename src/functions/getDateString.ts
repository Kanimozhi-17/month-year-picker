export function getDateDateString({
  year,
  month,
  day,
}: {
  day: number;
  month: number;
  year: number;
}) {
  // Create a new Date object with the provided year and month (zero-based index)
  let date: Date;

  // If day is provided, create a date with day
  if (day !== undefined) {
    date = new Date(year, month, day);
  } else {
    // If no day is provided, create a date with the first day of the month
    date = new Date(year, month, 1);
  }

  // Return the date string in the format 'YYYY-MM-DD'
  return date.toISOString();
}
