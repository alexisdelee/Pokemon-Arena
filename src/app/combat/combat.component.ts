import { Component, OnInit } from '@angular/core';
import {CombatState} from './CombatState';
import {PokemonService} from '../pokemon/pokemon.service';
import {CombatService} from './combat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
})
export class CombatComponent implements OnInit {
  combatLog = '';
  showLoading = true;
  state: CombatState;

  constructor(
    private combatSvc: CombatService,
    private pokemonSvc: PokemonService,
    private router: Router
  ) {
  }

  private log(txt: string) {
    this.combatLog += `\n\n${txt}`;
  }

  ngOnInit(): void {
    this.state = this.combatSvc.state;
    console.log(this.state);

    if (!this.combatSvc.initTeams()) {
      this.router.navigateByUrl('/');
      return;
    }

    this.log(`${this.state.myCurrentPokemon.name.toUpperCase()} GO !`);
    this.log(`The enemy sent ${this.state.enemyCurrentPokemon.name.toUpperCase()} !`);
    this.showLoading = false;
  }
}
