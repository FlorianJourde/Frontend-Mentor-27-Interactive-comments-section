export interface Comment {
  id: number;
  author: string;
  description: string;
  created_at: string;
  updated_at: string;
  likes: number;
  related_comment: number | null;
  session_id: string | null;
  avatar_id: number;
}