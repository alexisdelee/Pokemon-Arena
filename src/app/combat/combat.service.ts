import { Injectable } from '@angular/core';
import {CombatState} from './CombatState';
import {Move} from '../pokemons/Move';
import {PokemonsService} from '../pokemons/pokemons.service';

@Injectable({
  providedIn: 'root',
})
export class CombatService {

  constructor(private pokeSvc: PokemonsService) { }

  getMovesOrder(cs: CombatState): Move[] {
    const meFirst = [cs.myPokemonIntent, cs.enemyPokemonIntent];
    const enemyFirst = [cs.enemyPokemonIntent, cs.myPokemonIntent];

    if (cs.myPokemonIntent.priority - cs.enemyPokemonIntent.priority !== 0) {
      return cs.myPokemonIntent.priority > cs.enemyPokemonIntent.priority ? meFirst : enemyFirst;
    }

    const myPokemonSpeed = this.pokeSvc.getStatByName(cs.myCurrentPokemon, 'speed');
    const enemyPokemonSpeed = this.pokeSvc.getStatByName(cs.enemyCurrentPokemon, 'speed');

    if (myPokemonSpeed.base_stat === enemyPokemonSpeed.base_stat) {
      return Math.round(Math.random()) === 1 ? meFirst : enemyFirst;
    }

    return myPokemonSpeed.base_stat > enemyPokemonSpeed.base_stat ? meFirst : enemyFirst;
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
