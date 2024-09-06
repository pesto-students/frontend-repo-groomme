export const generateSlotsForNextDay = (
  inputDate: Date,
  startTime: string,
  endTime: string,
  intervalMinutes: number
) => {
  const now = new Date(inputDate);
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1);

  const dailySlots = [];
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  for (
    let currentMinutes = startMinutes;
    currentMinutes < endMinutes;
    currentMinutes += intervalMinutes
  ) {
    const slotStartHour = Math.floor(currentMinutes / 60);
    const slotStartMinute = currentMinutes % 60;
    const slotEndMinutes = currentMinutes + intervalMinutes;
    const slotEndHour = Math.floor(slotEndMinutes / 60);
    const slotEndMinute = slotEndMinutes % 60;

    dailySlots.push({
      startTime: `${String(slotStartHour).padStart(2, "0")}:${String(
        slotStartMinute
      ).padStart(2, "0")}`,
      endTime: `${String(slotEndHour).padStart(2, "0")}:${String(
        slotEndMinute
      ).padStart(2, "0")}`,
    });
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[nextDay.getDay()];

  return {
    date: nextDay.toISOString().split("T")[0],
    day: dayOfWeek,
    time: dailySlots,
  };
};
