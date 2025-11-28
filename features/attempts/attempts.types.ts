export type Attempt = {
  id: number;
  activity_id: number;
  attempt_number: number;
  is_submitted: boolean;
  score: number;
  status: "ongoing" | "submitted" | "expired";
  started_at: string; // ISO datetime
  will_end_at: string; // ISO datetime
  remaining_seconds: number;
};
