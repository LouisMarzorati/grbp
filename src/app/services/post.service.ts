import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { User } from '../models/user';
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
        const { serverTimestamp } = firebase.default.firestore.FieldValue;

        this.db.collection('posts').add({
            user: {
              uid: user.uid,
              displayName: this.getDisplayName(user)
            },
            message: message,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
      }
  }

  deletePost(pId: string) {

  }

  editPost(pId: string, post: string) {

  }

  createComment(user: firebase.default.User, pId: string, comment: string) {
    if (user && pId) {
      var postRef = this.db.collection('posts').doc(pId);
      postRef.update({
          replies: firebase.default.firestore.FieldValue.arrayUnion({
            pid: pId,
            user: {
              displayName: user.displayName,
              uid: user.uid
            } as User,
            comment: comment,
            createdAt: new Date(),
            updatedAt: new Date()
          })
      });
    }
  }

  deleteComment(cId: string) {

  }

  editComment(cId: string, comment: string) {

  }
}
