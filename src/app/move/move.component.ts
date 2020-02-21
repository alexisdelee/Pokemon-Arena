import { Component, OnInit, Input } from '@angular/core';

import { Move } from '../pokemon/move.model';

@Component({
  selector: 'move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})
export class MoveComponent implements OnInit {
  @Input() move: Move;

  constructor() { }

  ngOnInit(): void {
    console.log(this.move);
  }
}
