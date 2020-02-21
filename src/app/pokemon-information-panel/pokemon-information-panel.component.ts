import {Component, OnInit, Input, OnChanges} from '@angular/core';

import { Pokemon } from '../pokemon/pokemon.model';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'pokemon-information-panel',
  templateUrl: './pokemon-information-panel.component.html',
  styleUrls: ['./pokemon-information-panel.component.scss']
})
export class PokemonInformationPanelComponent implements OnInit, OnChanges {
  @Input() pokemon: Pokemon;
  @Input("hide-status") hideStatus: boolean = true;
  hpMax: number;

  constructor(private pokemonSvc: PokemonService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes || !changes.pokemon) {
      return;
    }
    this.hpMax = this.pokemonSvc.getPokemonHpMax(changes.pokemon.currentValue);
  }

  ngOnInit(): void {
    this.hpMax = this.pokemonSvc.getPokemonHpMax(this.pokemon);
  }
}
