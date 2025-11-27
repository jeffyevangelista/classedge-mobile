import { z } from "zod";

export const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.string().min(1, "Address is required"),
  id_number: z.string().min(1, "ID number is required"),
  year_level: z.string().min(1, "Year level is required"),
  course: z.string().min(1, "Course is required"),
  department: z.string().min(1, "Department is required"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
