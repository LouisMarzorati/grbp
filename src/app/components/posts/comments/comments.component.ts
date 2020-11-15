import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { CommentReply, Post } from 'src/app/models';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() public post: Post;

  commentForm: FormGroup;
  replyForm: FormGroup;
  selectedReplyId = '';
  selectedCommentId = '';

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private postService: PostService
  ) { }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }

  ngOnInit(): void {

    this.commentForm = this.fb.group({
      commentText: ['', Validators.required]
    });

    this.replyForm = this.fb.group({
      replyText: ['', Validators.required]
    });
  }

  // async comment(post: Post): Promise<void> {
  //   const user = await this.isLoggedIn();
  //   if (user) {
  //     this.postService.createComment(post.id, this.commentForm.get('commentText').value, user, );
  //     this.commentForm.reset();
  //     this.selectedReplyId = '';
  //   } else {
  //     let dialogRef = this.dialog.open(LoginDialogComponent, {
  //       data: { }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       if (result) {
  //         this.comment(post);
  //       }
  //     });
  //   }
  // }

  // async reply(postId: string, commentId: string): Promise<void> {
  //   const user = await this.isLoggedIn();
  //   if (user) {
  //     this.postService.createReply(user, postId, commentId, this.replyForm.get('replyText').value);
  //     this.replyForm.reset();
  //     this.selectedCommentId = '';
  //   } else {
  //     let dialogRef = this.dialog.open(LoginDialogComponent, {
  //       data: { }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       if (result) {
  //         this.reply(postId, commentId);
  //       }
  //     });
  //   }
  // }

  setReplyField(comment: CommentReply) {
    // hide post reply button if user clicks it twice
    if (comment.id === this.selectedCommentId) {
      this.selectedCommentId = '';
      return;
    }
    this.replyForm.reset();
    this.selectedCommentId = comment.id;
  }

  setCommentField(post: Post) {
    // hide post reply button if user clicks it twice
    if (post.id === this.selectedReplyId) {
      this.selectedReplyId = '';
      return;
    }
    this.commentForm.reset();
    this.selectedReplyId = post.id;
  }

}
