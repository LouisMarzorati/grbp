import { CommentReply } from './comment-reply';
import { UserInfo } from './user-info';

export class PostComment {
  id?: string;
  pid?: string;
  uid: string;
  displayName: string;
  postComment?: string;
  replies?: CommentReply[];
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
