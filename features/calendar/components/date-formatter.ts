import { format, parseISO } from "date-fns";

export const formatDate = (date: string) => {
  return format(parseISO(date), "MMMM dd, yyyy");
};

export const formatTime = (time: string) => {
  return format(parseISO(`2025-01-01T${time}`), "hh:mm a");
};

export const formatDateTime = (date: string) => {
  return format(parseISO(date), "MMMM dd, yyyy hh:mm a");
};
