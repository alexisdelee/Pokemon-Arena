import { Component, OnInit } from '@angular/core';
import {CombatState} from './CombatState';
import {PokemonService} from '../pokemon/pokemon.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
  providers: [PokemonService]
})
export class CombatComponent implements OnInit {
  combatLog = '';
  combatState: CombatState;
  showLoading = true;
  i = 0;

  constructor(private pokemonSvc: PokemonService) {
    forkJoin([
      this.pokemonSvc.findPokemon(1),
      this.pokemonSvc.findPokemon(4)]
    ).subscribe((data) => {
      this.combatState = new CombatState([data[0]], [data[1]]);
      this.combatState.myCurrentPokemon.hp = 30;
      this.combatState.enemyCurrentPokemon.hp = 30;
      this.combatState.myCurrentPokemon.level = 30;
      this.combatState.enemyCurrentPokemon.level = 30;

      this.log(`My HP ${this.combatState.myCurrentPokemon.hp} / ${pokemonSvc.getPokemonHpMax(this.combatState.myCurrentPokemon)}`);
      this.log(`Enemy HP ${this.combatState.enemyCurrentPokemon.hp} / ${pokemonSvc.getPokemonHpMax(this.combatState.enemyCurrentPokemon)}`);

      this.showLoading = false;
    });
  }

  private log(txt: string) {
    this.combatLog += `\n\n${txt}`;
  }

  ngOnInit(): void {
  }
}
