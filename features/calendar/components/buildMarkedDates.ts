import { addDays, format, isBefore, isEqual, parseISO } from "date-fns";
import { CalendarItem } from "../calendar.types";

type Marking = {
  marked?: boolean;
  dots?: { color: string }[];
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
  selected?: boolean;
  selectedColor?: string;
};

export type MarkedDates = Record<string, Marking>;

export function buildMarkedDates(data: CalendarItem[]): MarkedDates {
  const marks: MarkedDates = {};

  const addDot = (date: string, color: string) => {
    marks[date] = {
      ...(marks[date] || {}),
      marked: true,
      dots: [...(marks[date]?.dots || []), { color }],
    };
  };

  const addRange = (startStr: string, endStr: string, color: string) => {
    if (!startStr || !endStr) return;

    let start = parseISO(startStr);
    let end = parseISO(endStr);

    let cursor = start;

    while (isBefore(cursor, end) || isEqual(cursor, end)) {
      const date = format(cursor, "yyyy-MM-dd");
      const isStart = isEqual(cursor, start);
      const isEnd = isEqual(cursor, end);

      marks[date] = {
        ...(marks[date] || {}),
        startingDay: isStart,
        endingDay: isEnd,
        color,
        textColor: "white",
      };

      cursor = addDays(cursor, 1);
    }
  };

  data.forEach((item) => {
    if (item.type === "event") {
      const { start_date, end_date } = item;

      if (!start_date || !end_date) return;

      // One-day event
      if (start_date === end_date) {
        marks[start_date] = {
          ...(marks[start_date] || {}),
          startingDay: true,
          endingDay: true,
          color: "#50cebb",
          textColor: "white",
        };
      } else {
        // Range event
        addRange(start_date, end_date, "#50cebb");
      }
    }

    if (item.type === "activity") {
      if (!item.start || !item.end) return;

      let start = parseISO(item.start);
      let end = parseISO(item.end);

      let cursor = start;

      while (isBefore(cursor, end) || isEqual(cursor, end)) {
        const date = format(cursor, "yyyy-MM-dd");
        const dotColor = item.answered ? "#2cc94e" : "#ff5555";
        addDot(date, dotColor);
        cursor = addDays(cursor, 1);
      }
    }
  });

  return marks;
}
