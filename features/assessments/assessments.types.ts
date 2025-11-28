import { Attempt } from "../attempts/attempts.types";

type LessonUrl = {
  id: number;
  lesson_name: string;
  lesson_url: null | any;
  lesson_file: string;
};

export type Assessment = {
  id: number;
  activity_name: string;
  activity_type: number;
  activity_type_name: string;
  subject_id: number;
  start_time: string; // ISO string
  end_time: string; // ISO string
  show_score: boolean;
  max_score: number;
  passing_score: number;
  passing_score_type: "percentage" | "points"; // inferred; add more if needed
  time_duration: number;
  max_retake: number;
  retake_method: "highest" | string; // can refine if backend has strict choices
  activity_instruction: string;
  classroom_mode: boolean;
  shuffle_questions: boolean;
  student_retake_count: number;
  remaining_attempts: number;
  lesson_urls: LessonUrl[];
  attempts: Attempt[];
  ongoing_attempt: Attempt | null;
};

type Choice = {
  id: number;
  choice_text: string;
  is_left_side: boolean;
};

export type Question = {
  id: number;
  quiz_type:
    | "Multiple Choice"
    | "True/False"
    | "Fill in the Blank"
    | "Matching Type"
    | "Calculated Numeric"
    | "Essay"
    | "Document"; // <-- narrowed to only the ones with choices
  choices: Choice[]; // not null anymore
  question_text: string;
  score: number;
  activity_id: number;
  subject_id: number;
};
