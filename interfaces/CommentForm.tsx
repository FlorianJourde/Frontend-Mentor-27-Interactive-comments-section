import { Comment } from '@/interfaces/Comment';

export interface CommentForm {
  onUpdate: () => void,
  sessionId: string | null,
  comment?: Comment,
  isEditing?: boolean,
  isReplying?: boolean,
  toggleFormVisibility?: () => void
}