import { Component, OnInit, Input } from '@angular/core';
import {Pokemon} from '../pokemons/Pokemon';

@Component({
  selector: 'app-in-combat-pokemon',
  templateUrl: './in-combat-pokemon.component.html',
  styleUrls: ['./in-combat-pokemon.component.scss']
})
export class InCombatPokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Input() facing: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
