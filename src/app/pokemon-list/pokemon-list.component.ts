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
        this.pokemonPool.forEach(pokemon => pokemon.level = this.pokemonService.generateLevel());

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
    if (this.combatSvc.state.myTeam.find(myTeamPokemon => myTeamPokemon.id === pokemon.id)) {
      return alert('Impossible d\'ajouter un pokemon déjà existant dans l\'équipe.');
    } else {
      if (this.combatSvc.state.myTeam?.length === 3) {
        const yourFirstSelectedPokemon: Pokemon = this.combatSvc.state.myTeam[0];
        if (this.levelQuota + pokemon.level - yourFirstSelectedPokemon.level > this.MAX_LEVEL_QUOTA) {
          return alert('Vous dépassez le quota autorisé pour cette équipe.');
        } else {
          document.querySelector('.pokemon-tile-' + yourFirstSelectedPokemon.id).classList.remove('pokemon-tile-selected');
          this.combatSvc.state.myTeam?.shift();
          this.levelQuota -= yourFirstSelectedPokemon.level;
        }
      } else {
        if (this.levelQuota + pokemon.level > this.MAX_LEVEL_QUOTA) {
          return alert('Vous dépassez le quota autorisé pour cette équipe.');
        }
      }

      this.selectPokemonTile(event.target).classList.add('pokemon-tile-selected');

      this.combatSvc.state.myTeam.push(pokemon);
      this.levelQuota += pokemon.level;
    }
  }

  goToPage(pageName: string): void {
    this.router.navigate([pageName]);
  }
}
