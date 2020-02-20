import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CombatState } from './CombatState';
import { PokemonService } from '../pokemon/pokemon.service';
import { CombatService } from './combat.service';

@Component({
  selector: 'combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
})
export class CombatComponent implements OnInit {
  combatLog = '';
  showLoading = true;
  state: CombatState;
  audio: boolean = false;

  constructor(
    private combatSvc: CombatService,
    private pokemonSvc: PokemonService,
    private router: Router
  ) {
    const queryParams = this.router.getCurrentNavigation().extras.queryParams;
    if (queryParams) {
      this.audio = queryParams.audio;
    }
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

    // console.log(this.route.snapshot.queryParamMap.get("audio"));
  }
}
