import { Component, OnInit, Input } from '@angular/core';

import { Pokemon } from '../pokemon/pokemon.model';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'in-combat-pokemon',
  templateUrl: './in-combat-pokemon.component.html',
  styleUrls: ['./in-combat-pokemon.component.scss']
})
export class InCombatPokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Input() facing: boolean;
  hpMax: number;
  imageUrl: string;

  constructor(private pokemonSvc: PokemonService) { }

  ngOnInit(): void {
    this.hpMax = this.pokemonSvc.getPokemonHpMax(this.pokemon);
    this.imageUrl = 'http://www.pokestadium.com/sprites/xy/' + (this.facing ? '' : 'back/') + this.pokemon.name + '.gif';
  }

  onError(): void {
    this.imageUrl = this.pokemon.sprites.front_default;
  }
}
