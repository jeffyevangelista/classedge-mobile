import { formatDistanceToNowStrict, parseISO } from "date-fns";

export const useTimeAgo = (dateString: string) => {
  const parsed = parseISO(dateString);

  const result = formatDistanceToNowStrict(parsed, {
    addSuffix: true,
  });

  const [value, unit, ago] = result.split(" ");

  const map: Record<string, string> = {
    second: "s",
    seconds: "s",
    minute: "m",
    minutes: "m",
    hour: "h",
    hours: "h",
    day: "d",
    days: "d",
    week: "w",
    weeks: "w",
    month: "mo",
    months: "mo",
    year: "y",
    years: "y",
  };

  if (unit.startsWith("second") && Number(value) < 30) {
    return "just now";
  }

  return `${value}${map[unit] ?? ""} ${ago}`;
};
