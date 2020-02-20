import { Component, OnInit, Input } from '@angular/core';

import { Pokemon } from '../pokemon/pokemon.model';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'pokemon-information-panel',
  templateUrl: './pokemon-information-panel.component.html',
  styleUrls: ['./pokemon-information-panel.component.scss']
})
export class PokemonInformationPanelComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Input("hide-status") hideStatus: boolean = true;
  hpMax: number;

  constructor(private pokemonSvc: PokemonService) { }

  ngOnInit(): void {
    this.hpMax = this.pokemonSvc.getPokemonHpMax(this.pokemon);
  }
}
