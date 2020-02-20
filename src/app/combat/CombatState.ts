import {Pokemon} from '../pokemon/pokemon.model';
import {Move} from '../pokemon/move.model';

export class CombatState {
  myTeam: Pokemon[];
  enemyTeam: Pokemon[];

  myCurrentPokemon: Pokemon|null;
  enemyCurrentPokemon: Pokemon|null;

  myPokemonIntent: Move|null;
  enemyPokemonIntent: Move|null;

  constructor(teamA: Pokemon[], teamB: Pokemon[]) {
    this.myTeam = teamA;
    this.enemyTeam = teamB;

    this.myCurrentPokemon = this.myTeam[0];
    this.enemyCurrentPokemon = this.enemyTeam[0];
  }
}
