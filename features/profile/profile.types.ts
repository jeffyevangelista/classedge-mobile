export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  address: string;

  phone_number: string;
  photo: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  id_number: string;
  year_level: string;
  course: string;
  department: string;
};

type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type ClassSchedule = {
  id: number;
  subject_id: number;
  subject_name: string;
  schedule_start_time: string;
  schedule_end_time: string;
  assign_teacher: string;
  room: string;
  days_of_week: DayOfWeek[];
  teacher_photo: string;
};
