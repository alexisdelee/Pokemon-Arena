import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

import { Pokemon } from '../pokemon/pokemon.model';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'in-combat-pokemon',
  templateUrl: './in-combat-pokemon.component.html',
  styleUrls: ['./in-combat-pokemon.component.scss']
})
export class InCombatPokemonComponent implements OnInit, OnChanges {
  @Input() pokemon: Pokemon;
  @Input() facing: boolean;
  imageUrl: string;

  constructor(private pokemonSvc: PokemonService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes || !changes.pokemon) {
      return;
    }

    const newPokemon: Pokemon = changes.pokemon.currentValue;
    this.imageUrl = 'http://www.pokestadium.com/sprites/xy/' + (this.facing ? '' : 'back/') + newPokemon.name + '.gif';
  }

  ngOnInit(): void {
    this.imageUrl = 'http://www.pokestadium.com/sprites/xy/' + (this.facing ? '' : 'back/') + this.pokemon.name + '.gif';
  }

  onError(): void {
    this.imageUrl = this.pokemon.sprites.front_default;
  }
}
