import { PostComment } from './post-comment';
import { UserInfo } from './user-info';

export class Post {
  id?: string;
  userInfo?: UserInfo;
  comments?: PostComment[];
  post?: string;
  timeSince?: number;
  createdAt: Date;
  updatedAt: Date;
}