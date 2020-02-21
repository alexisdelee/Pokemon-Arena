import { Component, OnInit, OnDestroy } from '@angular/core';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'audio',
  template: ``,
  styles: [''],
})
export class AudioComponent implements OnInit, OnDestroy {
  sound = new Howl({
    src: [(Math.random() >= 0.5 ? "assets/music.mp3" : "assets/music-2.mp3")],
    loop: true,
    volume: 0.5
  });

  constructor() { }

  ngOnInit(): void {
    this.sound.play();
  }

  ngOnDestroy(): void {
    this.sound.stop();
  }
}
