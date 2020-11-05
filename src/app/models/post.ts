import { Reply } from './reply';
import { User } from './user';

export class Post {
  id?: string;
  user?: User;
  replies?: Reply[];
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
  timeSince?: number;
}