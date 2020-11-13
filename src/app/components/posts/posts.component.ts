import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { PostComment } from 'src/app/models';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { LoginDialogComponent } from 'src/app/shared/user/login-dialog/login-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  @Input() home: boolean;
  postForm: FormGroup;

  showLoggin: boolean;
  postText: string;
  tab = 'text';

  posts: Post[];
  postsSub: any;
  commentsSub: any[];

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
    this.commentsSub = []

     this.postsSub = this.db.collection('posts').ref.onSnapshot((postSnapshot) => {
      this.posts = [];
      postSnapshot.forEach((postDoc) => {
        let post = postDoc.data() as Post;
        post.createdAt = postDoc.data().createdAt.toDate();
        post.id = postDoc.id;

        let commentSub = postDoc.ref.collection('comments').onSnapshot((commentSnapshot) => {
          post.comments = [];
          commentSnapshot.forEach((commentDoc) => {
            let comment = commentDoc.data() as PostComment;
            comment.id = commentDoc.id;
            post.comments.push(comment);
          });
        });

        this.commentsSub.push(commentSub);
        this.posts.push(post);
      });
    });
  }

  // unsubscribe from post/comment listeners when user isnt on posts page
  ngOnDestroy() {
    this.postsSub();
    this.commentsSub.forEach((s) => {
      s();
    })
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

}
