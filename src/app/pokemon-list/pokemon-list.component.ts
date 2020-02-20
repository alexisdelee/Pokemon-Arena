import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../store/store.service';
import { PokemonListService } from './pokemon-list.service';
import { PokemonService } from '../pokemon/pokemon.service';

import { Pokemon } from '../pokemon/pokemon.model';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  providers: [StoreService, PokemonListService, PokemonService]
})
export class PokemonListComponent implements OnInit {
  pokemonPool: Pokemon[];
  types: Map<string, string> = new Map<string, string>();
  myTeam: Pokemon[] = new Array();
  enemyTeam: Pokemon[] = new Array();

  MAX_LEVEL_QUOTA = 150;

  private levelQuota = 0;

  constructor(
    private storeService: StoreService,
    private pokemonListService: PokemonListService,
    private pokemonService: PokemonService,
    private router: Router
  ) {
    this.storeService.change.subscribe(store => {
      this.myTeam = store.myTeam;
    });
  }

  ngOnInit(): void {
    this.pokemonListService.getPokemonPool(27, 600).subscribe({
      next: value => {
        this.pokemonPool = value;
        this.pokemonPool.forEach(pokemon => pokemon.level = this.pokemonService.generateLevel())
        this.pokemonPool = this.pokemonPool.sort((pokemonA, pokemonB) => {
          if (pokemonA.level < pokemonB.level) return -1;
          else if (pokemonA.level > pokemonB.level) return 1;
          else return 0;
        });

        for (let i = 0; i < 3; i++) {
          const r = Math.floor(Math.random() * this.pokemonPool.length - 1) + 1;
          this.enemyTeam.push(this.pokemonPool[r]);
        }

        this.storeService.changeEnemyTeam(this.enemyTeam);
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
    } else {
      if (this.myTeam.length == 3) {
        return alert("Vous avez déjà sélectionné 3 pokemons. Veuillez en désélectionner un pour libérer de la place.");
      } else {
        if (this.levelQuota + pokemon.level > this.MAX_LEVEL_QUOTA) {
          return alert('Vous dépassez le quota autorisé pour cette équipe.');
        }
      }

      this.selectPokemonTile(event.target).classList.add('pokemon-tile-selected');

      this.myTeam.push(pokemon);
      this.levelQuota += pokemon.level;

      this.storeService.changeMyTeam(this.myTeam);
    }
  }

  goToPage(pageName: string): void {
    this.router.navigate([pageName]);
  }
}
