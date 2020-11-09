import { Component, OnInit } from '@angular/core';
import { Sound } from 'src/app/models/sound';

@Component({
  selector: 'app-respond',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.scss']
})
export class RespondComponent implements OnInit {

  selected = '';
  sounds: Sound[];

  constructor() { }

  ngOnInit(): void {
    this.setSounds();
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
      const audio = new Audio($event.value.url);
      audio.play();
    }
  }

}
