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

  generateLevel(): number {
    let r = Math.floor(Math.random() * 200) - 99; // ]-100; 100]
    if (r < 0) {
      r = Math.pow(r, 2) * -1; // ]-10000; -1]
    } else {
      r = Math.pow(r, 2); // [0; 10000]
    }

    if (r < -2500) { // [-10000; -2500[
      // [1; 25[
      r = Math.round((1 - (r + 2500) / -7500) * 25);
    } else if (r >= -2500 && r <= 2500) { // [-2500; 2500]
      // [25; 75]
      r = Math.round(((r / 2500) + 1) * 25 + 25);
    } else if (r > 2500) { // ]2500; 10000]
      // ]75; 100]
      r = Math.round(75 + ((r - 2500) / 7500) * 25);
    }

    return r;
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
