import { Injectable, Output, EventEmitter } from '@angular/core';

import { Store } from './store.model';

import { Pokemon } from '../pokemon/pokemon.model';

@Injectable()
export class StoreService {
  private store: Store;

  @Output() change: EventEmitter<Store> = new EventEmitter();

  constructor() {
    this.store = new Object() as Store;
    this.store.myTeam = new Array();
    this.store.enemyTeam = new Array();
  }

  private broadcast(): void {
    this.change.emit(this.store);
  }

  public changeMyTeam(myTeam: Pokemon[]): void {
    this.store.myTeam = myTeam;
    this.broadcast();
  }

  public changeEnemyTeam(enemyTeam: Pokemon[]): void {
    this.store.enemyTeam = enemyTeam;
    this.broadcast();
  }
}
