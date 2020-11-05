import { User } from './user';

export class Reply {
  id?: string;
  pid?: string;
  user?: User;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}