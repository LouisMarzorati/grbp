import { Reply } from './comment';

export class Post {
  uid?: string;
  comments?: Reply[];
  username?: string;
  message?: string;
  createdAt?: Date;
}