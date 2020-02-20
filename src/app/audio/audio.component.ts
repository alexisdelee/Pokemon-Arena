import { Component, OnInit, OnDestroy } from '@angular/core';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit, OnDestroy {
  sound = new Howl({
    src: ["assets/music.mp3"],
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
