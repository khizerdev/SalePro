const dayjs = require("dayjs");

export function getRemainingDays(date) {
  const currentDate = dayjs();
  const futureDate = dayjs(date);
  const daysRemaining = futureDate.diff(currentDate, "day");
  return daysRemaining < 0 ? 0 : daysRemaining;
}
