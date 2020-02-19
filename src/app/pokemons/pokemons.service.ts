import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

import { Pokemon } from './pokemon';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

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
}
