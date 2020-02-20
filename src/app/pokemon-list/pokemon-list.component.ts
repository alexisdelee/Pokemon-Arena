import { Component, OnInit } from '@angular/core';

import { PokemonListService } from './pokemon-list.service';
import { PokemonService } from '../pokemon/pokemon.service';

import { Pokemon } from '../pokemon/pokemon.model';
import { Type } from '../pokemon/type.model';

import { PokemonComponent } from '../pokemon/pokemon.component';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  providers: [PokemonListService, PokemonService]
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[];
  types: Map<string, string> = new Map<string, string>();
  yourSelectedPokemons: Pokemon[] = new Array();
  selectedEnnemyPokemons: Pokemon[] = new Array();

  MAX_LEVEL_QUOTA: number = 150;

  private levelQuota: number = 0;

  constructor(private pokemonListService: PokemonListService, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonListService.getPokemons(27, 600).subscribe({
      next: value => {
        this.pokemons = value;
        this.pokemons.forEach(pokemon => pokemon.level = this.pokemonService.generateLevel());

        for (let i = 0; i < 3; i++) {
          const r = Math.floor(Math.random() * this.pokemons.length - 1) + 1;
          this.selectedEnnemyPokemons.push(this.pokemons[r]);
        }

        console.log(this.selectedEnnemyPokemons);
        console.log(this.remainingLevelQuota(this.selectedEnnemyPokemons));
      }
    });
  }

  initializeEmptyArray(n: number): Array<void> {
    return new Array(n);
  }

  remainingLevelQuota(selectedPokemons: Pokemon[]): number {
    return selectedPokemons.reduce((acc, item) => acc + item.level, 0);
  }

  private selectPokemonTile(target) {
    if (target.classList.contains("pokemon-tile")) {
      return target;
    } else {
      return target.closest(".pokemon-tile");
    }
  }

  onClickPokemon(event, pokemon: Pokemon): void {
    if (this.yourSelectedPokemons.find(selectPokemon => selectPokemon.id == pokemon.id)) {
      return alert("impossible d'ajouter un pokemon déjà existant dans l'équipe");
    } else {
      if (this.yourSelectedPokemons.length == 3) {
        const yourFirstSelectedPokemon: Pokemon = this.yourSelectedPokemons[0];
        if (this.levelQuota + pokemon.level - yourFirstSelectedPokemon.level > this.MAX_LEVEL_QUOTA) {
          return alert("vous dépassez le quota autorisé pour cette équipe");
        } else {
          document.querySelector(".pokemon-tile-" + yourFirstSelectedPokemon.id).classList.remove("pokemon-tile-selected");
          this.yourSelectedPokemons.shift();
          this.levelQuota -= yourFirstSelectedPokemon.level;
        }
      } else {
        if (this.levelQuota + pokemon.level > 150) {
          return alert("vous dépassez le quota autorisé pour cette équipe");
        }
      }

      this.selectPokemonTile(event.target).classList.add("pokemon-tile-selected");

      this.yourSelectedPokemons.push(pokemon);
      this.levelQuota += pokemon.level;
    }
  }
}
