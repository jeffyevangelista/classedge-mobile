type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type ClassSchedule = {
  id: number;
  subject_id: number;
  subject_name: string;
  schedule_start_time: string;
  schedule_end_time: string;
  teacher_name: string;
  room_number: string;
  days_of_week: DayOfWeek[];
  teacher_photo: string;
  next_occurence: number;
};
