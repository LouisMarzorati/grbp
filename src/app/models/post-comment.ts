import { CommentReply } from './comment-reply';

export class PostComment {
  id?: string;
  pid?: string;
  uid: string;
  displayName: string;
  postComment?: string;
  replies?: CommentReply[];
  type: string;
  gifUrl: string;
  soundUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
