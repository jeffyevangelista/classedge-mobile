import api from "@/lib/axios";
import { ClassSchedule } from "./schedule.types";

export const getCurrentClass = async (): Promise<{
  message: string;
  schedule: ClassSchedule;
}> => {
  return (await api.get("/class_schedule/?mode=current")).data;
};

export const getUpcomingClass = async (): Promise<{
  message: string;
  schedule: ClassSchedule;
}> => {
  return (await api.get("/class_schedule/?mode=next")).data;
};
