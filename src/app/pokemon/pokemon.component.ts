import { Component, OnInit, Input } from '@angular/core';

import { PokemonListService } from '../pokemon-list/pokemon-list.service';

import { Pokemon } from './pokemon.model';

@Component({
  selector: 'pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  providers: [PokemonListService]
})
export class PokemonComponent implements OnInit {
  @Input() entity: Pokemon;

  constructor(private pokeSvc: PokemonListService) {}

  ngOnInit(): void {
  }

  colorForLevel(level: number): string {
    if (level < 25) {
      return "primary";
    } else if (level > 75) {
      return "warn";
    } else {
      return "accent";
    }
  }
}
