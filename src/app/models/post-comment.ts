import { CommentReply } from './comment-reply';
import { UserInfo } from './user-info';

export class PostComment {
  id?: string;
  pid?: string;
  userInfo?: UserInfo;
  postComment?: string;
  replies?: CommentReply[];
  createdAt: Date;
  updatedAt: Date;
}