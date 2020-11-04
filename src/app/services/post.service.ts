import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit {

  postsCollection: any;
  commentsCollection: any;
  unsubscribe: any;

  constructor(private authService: AuthenticationService, private db: AngularFirestore) { }

  ngOnInit() {
  }

  createPost(message: string, user: firebase.default.User) {
      if (user) {
        const { serverTimestamp } = firebase.default.firestore.FieldValue;

        this.db.collection('posts').add({
            uid: user.uid,
            message: message,
            comments: [],
            username: !!user.displayName ? user.displayName : user.email,
            createdAt: serverTimestamp()
        });
      }
  }

  deletePost(pId: string) {

  }

  editPost(pId: string, post: string) {

  }

  createComment(pId: string, comment: string) {

  }

  deleteComment(cId: string) {

  }

  editComment(cId: string, comment: string) {

  }
}
