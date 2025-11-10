export type MaterialType = {
  id: number;
  subject_id: number;
  lesson_name: string;
  lesson_description: string;
  lesson_file: string | null;
  lesson_url: string | null;
  lesson_type: string;
  start_date: string;
  end_date: string;
  allow_download: boolean;
};
