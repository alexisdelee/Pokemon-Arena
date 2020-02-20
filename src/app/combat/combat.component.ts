import { Component, OnInit } from '@angular/core';
import {CombatState} from './CombatState';
import {PokemonsService} from '../pokemons/pokemons.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
  providers: [PokemonsService]
})
export class CombatComponent implements OnInit {
  combatLog = '';
  combatState: CombatState;
  showLoading = true;
  i = 0;

  constructor(private pokemonSvc: PokemonsService) {
    forkJoin([
      this.pokemonSvc.findPokemon(1),
      this.pokemonSvc.findPokemon(4)]
    ).subscribe((data) => {
      this.combatState = new CombatState([data[0]], [data[1]]);
      this.showLoading = false;
    });
  }

  private log(txt: string) {
    this.combatLog += `\n\n${txt}`;
  }

  ngOnInit(): void {
  }
}
