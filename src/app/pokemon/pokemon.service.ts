import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

import { Pokemon, Stat } from './pokemon.model';
import {Move} from '../move/move.model';
import {ApiID} from './apiid.model';
import {filter, map, subscribeOn} from 'rxjs/operators';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

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

  generateRandomLevel(): number {
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

  findPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }

  getItemFromURI<T>(uri: string): Observable<T> {
    return this.http.get<T>(uri);
  }

  getPokemonHpMax(pokemon: Pokemon) {
    return Math.ceil((((2 * this.getStatByName(pokemon, 'hp').base_stat + 100) * pokemon.level) / 100) + 10);
  }

  hydrateAvaliableMoves(pokemon: Pokemon): Observable<Move[]> {
    const moveSet = pokemon.moves.filter((move) => {
      return move.version_group_details.find((versionGroupDetails) => {
        return versionGroupDetails.version_group.name === 'x-y' &&
          versionGroupDetails.move_learn_method.name === 'level-up' &&
          versionGroupDetails.level_learned_at <= pokemon.level;
      });
    });

    const promises = [];
    moveSet.forEach((move) => promises.push(this.getItemFromURI(move.move.url)));

    return forkJoin<Move>(promises).pipe(
      map((data: Move[]) => {
        return data.filter((item) => item.damage_class.name !== 'status');
    }));
  }

  loadPickedMoves(movesIds: ApiID[]): Observable<Move[]> {
    const movesPromises = [];

    movesIds.forEach((move) => movesPromises.push(this.getItemFromURI<Move>(move.url)));

    return forkJoin<Move>(movesPromises);
  }
}
