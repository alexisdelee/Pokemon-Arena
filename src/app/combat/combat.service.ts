import { Injectable } from '@angular/core';
import { CombatState } from './CombatState';
import { PokemonService } from '../pokemon/pokemon.service';
import {Intent} from './turn-order.model';
import {Pokemon} from '../pokemon/pokemon.model';
import {Type} from '../pokemon/type.model';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Move} from '../move/move.model';

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

    getStandingPokemons(pokemons: Pokemon[]) {
    return pokemons.filter((pokemon) => pokemon.hp > 0);
  }

  public getTypeModifier(intent: Intent, target: Pokemon): Observable<number> {
    return this.pokemonService.getItemFromURI<Type>(intent.move.type.url ?? intent.move.type.type.url).pipe(
      map((attackType) => {
        let m = 1;
        target.types.forEach((targetType) => {
          if (attackType.damage_relations.double_damage_to
            .find((typeRelation) => typeRelation.name === targetType.type.name)) {
            m *= 2;
          } else if (attackType.damage_relations.half_damage_to
            .find((typeRelation) => typeRelation.name === targetType.type.name)) {
            m *= 0.5;
          } else if (attackType.damage_relations.no_damage_to
            .find((typeRelation) => typeRelation.name === targetType.type.name)) {
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

  public pickMoves(pokes: Pokemon[]): Observable<Move[][]> {
    const promises = [];
    pokes.forEach((p) => {
      promises.push(this.pokemonService.hydrateAvaliableMoves(p));
    });

    return forkJoin<Move[]>(promises);
  }
}
