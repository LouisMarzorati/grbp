import { Sound } from '.';
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
  sound: Sound;
  createdAt: Date;
  updatedAt: Date;
}
