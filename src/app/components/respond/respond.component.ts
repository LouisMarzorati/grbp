import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { GifsResult, GiphyFetch } from "@giphy/js-fetch-api";
import { Subject, Subscription } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { CommentReply, Post, PostComment } from 'src/app/models';
import { Sound } from 'src/app/models/sound';
import { PostService } from 'src/app/services/post.service';
import { LoginDialogComponent } from 'src/app/shared/user/login-dialog/login-dialog.component';

@Component({
  selector: 'app-respond',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.scss']
})
export class RespondComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  @Input() comment: PostComment;
  @Input() reply: CommentReply;

  user: firebase.default.User;

  selectedOption: string;
  textInput: string;q

  sounds: Sound[];
  selectedSound: Sound;

  //TODO: move to env
  gf = new GiphyFetch("V5cjFqBDVVqOujeASAAHIFMbRLFJ4X7d");

  gifSearchText: string;
  textModelChanged: Subject<string> = new Subject<string>();
  textModelChangeSubscription: Subscription;

  gifs: GifsResult;
  selectedGif: string;

  constructor(private postService: PostService,
    private dialog: MatDialog,
    private afAuth: AngularFireAuth) { }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }

  ngOnInit(): void {

    if (!!this.comment) {
      console.log('set comment form group')
    } else if (!!this.reply) {
      console.log('set reply form group')
    } else {
      console.log('set posts form group')
    }


    this.textModelChangeSubscription = this.textModelChanged
    .pipe(
      debounceTime(1000),
    )
    .subscribe(newText => {
      if (newText != '' && newText.length >= 1) {
        this.gifSearchText = newText;
        this.fetchGifs(this.gifSearchText, 0);
      }
    });
    this.setUser();
    this.setSounds();
  }

  async submit() {
    const user = await this.isLoggedIn();
    if (user) {
      let hasTextInput =!!this.textInput && this.textInput.trim().length > 0;
      if (!!this.comment) {
        console.log('submit comment')
      } else if (!!this.reply) {
        console.log('submit reply')
      } else {
        this.postService.createPost(hasTextInput ? this.textInput : null, user, this.selectedGif, this.selectedSound.url);
      }
      this.reset();
    } else {
      let dialogRef = this.dialog.open(LoginDialogComponent, {
        data: { }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.submit();
        }
      });
    }
  }

  reset() {
    this.textInput = undefined;
    this.selectedGif = undefined;
    this.selectedOption = undefined;
    this.selectedSound = undefined;
  }

  get noSelection(): boolean {
    return !!this.selectedOption === false;
  }


  ngOnDestroy() {
    this.textModelChangeSubscription.unsubscribe();
  }

  async setUser() {
    this.user = await this.afAuth.authState.pipe(first()).toPromise();
  }

  fetchGifs(searchTerm: string, offset: number) {
    this.gf.search(searchTerm, { offset, limit: 15 }).then((gif) => {
      this.gifs = gif;
    });
  }

  cancelResponse() {
    this.selectedOption = undefined;
    this.gifs = undefined;
    this.gifSearchText = undefined;
    this.selectedGif = undefined;
  }

  setGifResponse(gif: string) {
    this.selectedGif = gif;
    console.log('girfurl', this.selectedGif);
    //gif.images.original.url
    // this.postService.createComment(this.user, this.postId, gifUrl, 'gif');
  }

  setSounds(): void {
    this.sounds = [
      {
        id: 0,
        url: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg',
        label: 'trumpet'
      },
      {
        id: 1,
        url: 'https://actions.google.com/sounds/v1/human_voices/human_fart.ogg',
        label: 'squirt'
      },
      {
        id: 2,
        url: 'https://actions.google.com/sounds/v1/human_voices/baby_cry_cough.ogg',
        label: 'bb'
      },
      {
        id: 3,
        url: 'https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg',
        label: 'whistle'
      },
      {
        id: 4,
        url: 'https://actions.google.com/sounds/v1/emergency/emergency_siren_short_burst.ogg',
        label: 'party police'
      }
    ]
  }

  playSound($event: any) {
    if (!!$event.value.url) {
      this.selectedSound = $event.value;
      const audio = new Audio($event.value.url);
      audio.play();
    } else {
      this.selectedSound = undefined;
    }
  }

}
