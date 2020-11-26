import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Sound } from '../models';

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

  createPost(message: string, user: firebase.default.User, gifUrl?: string, sound?: Sound) {
      if (user) {
        this.db.collection('posts').add({
            userInfo: {
              uid: user.uid,
              displayName: this.getDisplayName(user)
            },
            post: message,
            gifUrl: !!gifUrl ? gifUrl : null,
            sound: !!sound ? {
              label: sound.label,
              url: sound.url
            } : null,
            createdAt: new Date(),
            updatedAt: new Date()
        });
      }
  }

  deletePost(pId: string) {

  }

  editPost(pId: string, post: string) {

  }

  createComment(pId: string, reply: string, user: firebase.default.User, gifUrl?: string, sound?: Sound) {
    if (user && pId) {
      this.db.collection(`posts/${pId}/comments`).add({
        pid: pId,
        postComment: reply,
        displayName: user.displayName,
        uid: user.uid,
        gifUrl: !!gifUrl ? gifUrl : '',
        sound: !!sound ? {
          label: sound.label,
          url: sound.url
        } : null,
        createdAt: new Date(),
        updatedAt: new Date()
      }).then((doc) => {
        console.log('comment', doc.id);
      });
    }
  }

  createReply(pId: string, cId: string, reply: string, user: firebase.default.User, gifUrl?: string, sound?: Sound) {
    if (user && pId && cId) {
      this.db.collection(`posts/${pId}/comments`).doc(cId).update({
        replies: firebase.default.firestore.FieldValue.arrayUnion({
          pid: pId,
          reply,
          displayName: user.displayName,
          uid: user.uid,
          gifUrl: !!gifUrl ? gifUrl : '',
          sound: !!sound ? {
            label: sound.label,
            url: sound.url
          } : null,
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
