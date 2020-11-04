import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: Observable<firebase.default.User>;

  constructor(private angularFireAuth: AngularFireAuth, private snackService: SnackBarService) {
    this.userData = angularFireAuth.authState;
  }

  signUp(email: string, password: string) {
    this.angularFireAuth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('You are Successfully signed up!', res);
    })
    .catch(error => {
      console.log('Something is wrong:', error.message);
    });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('You are Successfully logged in!');
    })
    .catch(err => {
      console.log('Something is wrong:',err.message);
    });
  }

  signOut() {
    this.angularFireAuth.signOut();
  }

  googleSignIn() {
    let provider = new firebase.default.auth.GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(provider);
  }

  // send success or failure back so account info knows what to display
  async updateDisplayName(name: string): Promise<boolean> {
    var user = firebase.default.auth().currentUser;

    return await user.updateProfile({
      displayName: name,
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      return true;
    }).catch(function(error) {
      console.log("failed ", error)
      return false;
    });
  }
}
