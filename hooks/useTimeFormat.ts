/**
 * Hook to format military time (24-hour) to 12-hour format
 * @param militaryTime - Time string in format "HH:MM" or "HH:MM:SS"
 * @returns Formatted time string like "2:30 PM"
 */
export const useTimeFormat = (militaryTime: string): string => {
  // Parse the time string (assuming format like "14:30" or "14:30:00")
  const [hours, minutes] = militaryTime.split(":");
  const hour24 = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);

  // Convert to 12-hour format
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 >= 12 ? "PM" : "AM";

  // Format minutes with leading zero if needed
  const formattedMinutes = minute.toString().padStart(2, "0");

  return `${hour12}:${formattedMinutes} ${ampm}`;
};
