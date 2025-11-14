import { addDays, format, isBefore, isEqual, parseISO } from "date-fns";
import { CalendarItem } from "../calendar.types";

export function getItemsForDate(
  data: CalendarItem[],
  dateString: string
): (CalendarItem & { category: "event" | "activity" })[] {
  const results: any[] = [];

  data.forEach((item) => {
    if (item.type === "event") {
      if (dateString >= item.start_date && dateString <= item.end_date) {
        results.push({ ...item, category: "event" });
      }
    }

    if (item.type === "activity") {
      let start = parseISO(item.start);
      let end = parseISO(item.end);

      let cursor = start;

      while (isBefore(cursor, end) || isEqual(cursor, end)) {
        const d = format(cursor, "yyyy-MM-dd");
        if (d === dateString) {
          results.push({ ...item, category: "activity" });
        }
        cursor = addDays(cursor, 1);
      }
    }
  });

  return results;
}
