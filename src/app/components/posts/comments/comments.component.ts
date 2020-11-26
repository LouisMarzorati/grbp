import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommentReply, Post } from 'src/app/models';

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
    private fb: FormBuilder
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
