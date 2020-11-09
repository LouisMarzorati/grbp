import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { UserInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsCollection: any;
  commentsCollection: any;
  unsubscribe: any;

  constructor(private db: AngularFirestore) { }

  getDisplayName(user: any): string {
    return !!user.displayName ? user.displayName : user.email;
  }

  createPost(message: string, user: firebase.default.User) {
      if (user) {
        this.db.collection('posts').add({
            userInfo: {
              uid: user.uid,
              displayName: this.getDisplayName(user)
            },
            post: message,
            createdAt: new Date(),
            updatedAt: new Date()
        });
      }
  }

  deletePost(pId: string) {

  }

  editPost(pId: string, post: string) {

  }

  createComment(user: firebase.default.User, pId: string, reply: string) {
    if (user && pId) {
      this.db.collection(`posts/${pId}/comments`).add({
        pid: pId,
        postComment: reply,
        userInfo: {
          displayName: user.displayName,
          uid: user.uid
        } as UserInfo,
        createdAt: new Date(),
        updatedAt: new Date()
      }).then((doc) => {
        console.log('comment', doc.id);
      });
    }
  }

  createReply(user: firebase.default.User, pId: string, cId: string, reply: string) {
    if (user && pId) {
      this.db.collection(`posts/${pId}/comments`).doc(cId).update({
        replies: firebase.default.firestore.FieldValue.arrayUnion({
          reply: reply,
          displayName: user.displayName,
          uid: user.uid
        })
      });
    }
  }

  deleteComment(cId: string) {

  }

  editComment(cId: string, comment: string) {

  }
}
