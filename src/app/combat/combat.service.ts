import { Injectable } from '@angular/core';

import { CombatState } from './CombatState';
import { Move } from '../pokemon/move.model';

import { PokemonService } from '../pokemon/pokemon.service';
import {Intent} from './turn-order.model';
import {Pokemon} from '../pokemon/pokemon.model';
import {Type} from '../pokemon/type.model';
import {forkJoin, Observable, zip} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CombatService {

  constructor(private pokemonService: PokemonService) {
    this.state = new CombatState();
  }
  public state: CombatState;

  private typeRelation;

  initTeams(): boolean {
    if (this.state.enemyTeam.length === 0 || this.state.myTeam.length === 0) {
      return false;
    }

    this.state.myCurrentPokemon = this.state.myTeam[0];
    this.state.enemyCurrentPokemon = this.state.enemyTeam[0];

    this.state.myTeam.forEach((pokemon) =>
      pokemon.hp = this.pokemonService.getPokemonHpMax(pokemon)
    );

    this.state.enemyTeam.forEach((pokemon) =>
      pokemon.hp = this.pokemonService.getPokemonHpMax(pokemon)
    );

    return true;
  }

  getMovesOrder(): Intent[] {
    const meFirst = [this.state.myPokemonIntent, this.state.enemyPokemonIntent];
    const enemyFirst = [this.state.enemyPokemonIntent, this.state.myPokemonIntent];

    if (this.state.myPokemonIntent.move.priority - this.state.enemyPokemonIntent.move.priority !== 0) {
      return this.state.myPokemonIntent.move.priority > this.state.enemyPokemonIntent.move.priority ? meFirst : enemyFirst;
    }

    const myPokemonSpeed = this.pokemonService.getStatByName(this.state.myCurrentPokemon, 'speed');
    const enemyPokemonSpeed = this.pokemonService.getStatByName(this.state.enemyCurrentPokemon, 'speed');

    if (myPokemonSpeed.base_stat === enemyPokemonSpeed.base_stat) {
      return Math.round(Math.random()) === 1 ? meFirst : enemyFirst;
    }

    return myPokemonSpeed.base_stat > enemyPokemonSpeed.base_stat ? meFirst : enemyFirst;
  }

  public getTypeModifier(intent: Intent, target: Pokemon): Observable<number> {
    return this.pokemonService.getItemFromURI<Type>(intent.move.type.url ?? intent.move.type.type.url).pipe(
      map((attackType) => {
        let m = 1;
        target.types.forEach((targetType) => {
          if (attackType.damage_relations.double_damage_to
            .find((typeRelation) => typeRelation.name === targetType.name)) {
            m *= 2;
          } else if (attackType.damage_relations.half_damage_to
            .find((typeRelation) => typeRelation.name === targetType.name)) {
            m *= 0.5;
          } else if (attackType.damage_relations.no_damage_to
            .find((typeRelation) => typeRelation.name === targetType.name)) {
            m *= 0;
          }
        });

        return m;
      }),
    );
  }

  private getModifiers(intent: Intent, target: Pokemon): number {
    const isSTABED = intent.pokemon.types.find((type) => type.name === intent.move.type.name);

    return isSTABED ? 1.5 : 1;
  }

  private getStatsModifier(intent: Intent, target: Pokemon): number {
    return 1;
  }

  public applyDamages(intent: Intent, target: Pokemon, typesModifier: number): number {
    const dmg = (
      (
        (2 * intent.pokemon.level / 5 + 2) * intent.move.power * this.getStatsModifier(intent, target)
      ) / 50 + 2
    ) * typesModifier * this.getModifiers(intent, target);

    target.hp = target.hp - dmg >= 0 ? target.hp - dmg : 0;

    return dmg;
  }

/*
  async function gameLoop(poke1: Pokemon, poke2: Pokemon) :Promise<Pokemon|undefined> {
    poke1.hp = 100;
    poke2.hp = 100;
    var i :number = 1;

    while (1) {
      console.log(`Tour ${i++}\n${poke1.name} : ${poke1.hp} HP <=> HP ${poke2.hp} : ${poke2.name}`);
      const moves :Move[] = await Promise.all([pickRandomMove(poke1.moves), pickRandomMove(poke2.moves)]);

      var first = whoMovesFirst(poke1, poke2, moves[0], moves[1]);
      var second = poke1 === first ? poke2 : poke1;

      const firstMove = first === poke1 ? moves[0] : moves[1];
      const secondMove = first === poke1 ? moves[1] : moves[0];

      console.log(`${first.name} hits first whith ${firstMove.name} !`);
      console.log(`${second.name} loose ${firstMove.power ?? 'no'} PV !`);
      second.hp -= firstMove.power;
      if (second.hp <= 0) {
        return second;
      }

      console.log(`${second.name} hits back whith ${secondMove.name} !`);
      console.log(`${first.name} loose ${secondMove.power ?? 'no'} PV !`);
      first.hp -= secondMove.power;
      if (first.hp <= 0) {
        return first;
      }
      sleep(3000);
    }

    return undefined;
  }

  export async function game(duration: number = -1) {
    for (;duration != 0; --duration) {
      console.log("================ Get 2 randoms pokemons =============================");
      const pokes :Pokemon[] = await Promise.all([getNewPokemon(), getNewPokemon()]) ;
      console.log(pokes[0].name + " VS " + pokes[1].name);
      const ko = await gameLoop(pokes[0], pokes[1]);
      if (!ko) {
        return;
      }
      console.log(`------ ${ko.name} is KO ! ------`);
    }
  }

 */
}
