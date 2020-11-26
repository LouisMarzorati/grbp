import { Sound } from '.';

export class CommentReply {
  id?: string;
  cid?: string;
  pid?: string;
  uid: string;
  displayName: string;
  gifUrl: string;
  sound: Sound;
  reply?: string;
  createdAt: Date;
  updatedAt: Date;
}