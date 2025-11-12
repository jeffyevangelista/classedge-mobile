export type Notification = {
  id: number;
  entity_id: number;
  entity_type: string;
  user_id: number;
  message: string;
  is_read: boolean;
  created_at: string;
  created_by: number;
  created_by_photo: string;
};
