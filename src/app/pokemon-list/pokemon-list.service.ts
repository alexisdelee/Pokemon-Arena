import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

import { Pokemon, Stat } from '../pokemon/pokemon.model';

import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class PokemonListService {
  constructor(private http: HttpClient, private pokemonService: PokemonService) {}

  getPokemonPool(n: number, maxId: number): Observable<Pokemon[]> {
    const arr = [];
    const numArray = [];

    while (arr.length < n) {
      const r = Math.floor(Math.random() * maxId) + 1;
      if (!numArray.includes(r)) {
        numArray.push(r);
        arr.push(this.pokemonService.findPokemon(r));
      }
    }

    return forkJoin<Pokemon>(arr);
  }
}
