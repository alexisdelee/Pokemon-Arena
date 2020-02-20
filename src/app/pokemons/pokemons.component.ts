import { Component, OnInit } from '@angular/core';
import { PokemonsService } from './pokemons.service';

import { Pokemon } from './Pokemon';
import { Type } from './Type';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  providers: [PokemonsService]
})
export class PokemonsComponent implements OnInit {

  constructor(private pokeSvc: PokemonsService) {}
  pokemons: Pokemon[];
  types: Map<string, string> = new Map<string, string>();
  yourSelectedPokemons: Pokemon[] = new Array();
  selectedEnnemyPokemons: Pokemon[] = new Array();

  private levelQuota = 0;

  ngOnInit(): void {
    this.pokeSvc.getPokemons(27, 600).subscribe({
      next: value => {
        this.pokemons = value;
        this.pokemons.forEach(pokemon => pokemon.level = this.pokeSvc.generateLevel());

        for (let i = 0; i < 3; i++) {
          const r = Math.floor(Math.random() * this.pokemons.length - 1) + 1;
          this.selectedEnnemyPokemons.push(this.pokemons[r]);
        }

        console.log(this.selectedEnnemyPokemons);
        console.log(this.remainingLevelQuota(this.selectedEnnemyPokemons));
      }
    });
  }

  colorForLevel(level: number): string {
    if (level < 25) {
      return 'primary';
    } else if (level > 75) {
      return 'warn';
    } else {
      return 'accent';
    }
  }

  private selectPokemonTile(target) {
    if (target.classList.contains('pokemon-tile')) {
      return target;
    } else {
      return target.closest('.pokemon-tile');
    }
  }

  initializeEmptyArray(n: number): Array<void> {
    return new Array(n);
  }

  remainingLevelQuota(selectedPokemons: Pokemon[]): number {
    return selectedPokemons.reduce((acc, item) => acc + item.level, 0);
  }

  onClickPokemon(event, pokemon: Pokemon): void {
    if (this.yourSelectedPokemons.find(selectPokemon => selectPokemon.id === pokemon.id)) {
      return alert('impossible d\'ajouter un pokemon déjà existant dans l\'équipe');
    } else {
      if (this.yourSelectedPokemons.length === 3) {
        const yourFirstSelectedPokemon: Pokemon = this.yourSelectedPokemons[0];
        if (this.levelQuota + pokemon.level - yourFirstSelectedPokemon.level > 150) {
          return alert('vous dépassez le quota autorisé pour cette équipe');
        } else {
          document.querySelector('.pokemon-tile-' + yourFirstSelectedPokemon.id).classList.remove('pokemon-tile-selected');
          this.yourSelectedPokemons.shift();
          this.levelQuota -= yourFirstSelectedPokemon.level;
        }
      } else {
        if (this.levelQuota + pokemon.level > 150) {
          return alert('vous dépassez le quota autorisé pour cette équipe');
        }
      }

      this.selectPokemonTile(event.target).classList.add('pokemon-tile-selected');

      this.yourSelectedPokemons.push(pokemon);
      this.levelQuota += pokemon.level;
    }
  }
}
