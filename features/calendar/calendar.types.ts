export type EventItem = {
  id: string;
  title: string;
  start_date: string; // "YYYY-MM-DD"
  end_date: string; // "YYYY-MM-DD"
  event_time: string;
  type: "event";
  location: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  start: string; // ISO
  end: string; // ISO
  type: "activity";
  answered: boolean;
};

export type CalendarItem = EventItem | ActivityItem;
