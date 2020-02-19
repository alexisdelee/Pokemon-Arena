import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

import { Pokemon, Stat } from './pokemon';

@Injectable()
export class PokemonsService {

  constructor(private http: HttpClient) {
  }

  findPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }

  getPokemons(n: number, maxId: number): Observable<Pokemon[]> {
    const arr = [];
    const numArray = [];

    while (arr.length < n) {
      const r = Math.floor(Math.random() * maxId) + 1;
      console.log(r);
      if (!numArray.includes(r)) {
        numArray.push(r);
        arr.push(this.findPokemon(r));
      }
    }

    return forkJoin<Pokemon>(arr);
  }

  getItemFromURI<T>(uri: string): Observable<T> {
    return this.http.get<T>(uri);
  }

  getStatByName(poke: Pokemon, statName: string): Stat {
    const found = poke.stats.find((stat) => {
      if (stat.stat.name === statName) {
        return true;
      }
    });

    if (!found) {
      throw new Error(`Unknown statname : ${statName}`);
    }

    return found;
  }
}
