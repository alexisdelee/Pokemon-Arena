import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonListService } from './pokemon-list.service';
import { PokemonService } from '../pokemon/pokemon.service';

import { Pokemon } from '../pokemon/pokemon.model';
import {CombatService} from '../combat/combat.service';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  providers: [PokemonListService]
})
export class PokemonListComponent implements OnInit {
  pokemonPool: Pokemon[];
  types: Map<string, string> = new Map<string, string>();

  MAX_LEVEL_QUOTA = 150;

  private levelQuota = 0;
  myTeam: Pokemon[];
  enemyTeam: Pokemon[];

  audio: boolean = true;

  constructor(
    private combatSvc: CombatService,
    private pokemonListService: PokemonListService,
    private pokemonService: PokemonService,
    private router: Router
  ) {
    this.myTeam = this.combatSvc.state.myTeam;
    this.enemyTeam = this.combatSvc.state.enemyTeam;
  }

  ngOnInit(): void {
    this.pokemonListService.getPokemonPool(27, 600).subscribe({
      next: value => {
        this.pokemonPool = value;
        this.pokemonPool.forEach(pokemon => pokemon.level = this.pokemonService.generateRandomLevel());
        this.pokemonPool = this.pokemonPool.sort((pokemonA, pokemonB) => {
          // return pokemonA.level - pokemonB.level > 1 ? -1 : pokemonA.level - pokemonB.level === 0 ? 0 : 1;
          return pokemonA.level < pokemonB.level ? -1 : (pokemonA.level > pokemonB.level ? 1 : 0);
        }).reverse();

        for (let i = 0; i < 3; i++) {
          const r = Math.floor(Math.random() * this.pokemonPool.length - 1) + 1;
          this.combatSvc.state.enemyTeam.push(this.pokemonPool[r]);
        }
      }
    });
  }

  initializeEmptyArray(n: number): Array<void> {
    return new Array(n);
  }

  remainingLevelQuota(team: Pokemon[]): number {
    return team.reduce((acc, item) => acc + item.level, 0);
  }

  private selectPokemonTile(target) {
    if (target.classList.contains('pokemon-tile')) {
      return target;
    } else {
      return target.closest('.pokemon-tile');
    }
  }

  onClickPokemon(event, pokemon: Pokemon): void {
    if (this.myTeam.find(myTeamPokemon => myTeamPokemon.id == pokemon.id)) {
      this.selectPokemonTile(event.target).classList.remove('pokemon-tile-selected');

      this.levelQuota -= pokemon.level;
      this.myTeam = this.myTeam.filter(myTeamPokemon => myTeamPokemon.id != pokemon.id);
      this.combatSvc.state.myTeam = this.myTeam;
    } else {
      if (this.myTeam.length == 3) {
        return alert('You have already selected 3 pokemons. Please deselect one to free up space.');
      } else {
        if (this.levelQuota + pokemon.level > this.MAX_LEVEL_QUOTA) {
          return alert('You exceed the authorized quota for this team.');
        }
      }

      this.selectPokemonTile(event.target).classList.add('pokemon-tile-selected');

      this.myTeam.push(pokemon);
      this.levelQuota += pokemon.level;
    }
  }

  goToPage(pageName: string): void {
    this.router.navigate([pageName], {queryParams: {audio: this.audio}});
  }
}
