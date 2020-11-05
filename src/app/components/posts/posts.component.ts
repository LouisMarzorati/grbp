import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { first } from 'rxjs/operators';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { LoginDialogComponent } from 'src/app/shared/user/login-dialog/login-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() public home: boolean;
  public postForm: FormGroup;
  public commentForm: FormGroup;

  public showLoggin: boolean;
  public postText: string;

  posts: Post[];
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private postService: PostService) { }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      postText: ['', Validators.required]
    });

    this.commentForm = this.fb.group({
      commentText: ['', Validators.required]
    });


    const ref = firebase.default.firestore().collection('posts');
    ref.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      this.posts = [];
      snapshot.forEach((doc) => {
        let p = doc.data() as Post;
        p.id = doc.id;
        this.posts.push(p)
      });
    });
  }

  async post(): Promise<void>{
    const user = await this.isLoggedIn();
    if (user) {
      this.postService.createPost(this.postForm.get('postText').value, user);
      this.postForm.reset();
    } else {
      let dialogRef = this.dialog.open(LoginDialogComponent, {
        data: { }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.post();
        }
      });
    }
  }

  async comment(post: Post): Promise<void> {
    const user = await this.isLoggedIn();
    if (user) {
      this.postService.createComment(user, post.id, this.commentForm.get('commentText').value);
    } else {
      let dialogRef = this.dialog.open(LoginDialogComponent, {
        data: { }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.comment(post);
        }
      });
    }
  }

}
