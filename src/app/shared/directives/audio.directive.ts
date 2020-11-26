import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAudio]'
})
export class AudioDirective {

  @Input() public soundUrl: string;

  constructor() { }

  @HostListener('click')
  onclick() {

    const audio = new Audio(this.soundUrl);
    audio.play();
  }

}
