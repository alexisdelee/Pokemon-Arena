import {Pokemon} from '../pokemon/pokemon.model';
import {Move} from '../pokemon/move.model';
import {Intent} from './turn-order.model';

export class CombatState {
  myTeam: Pokemon[] = [];
  enemyTeam: Pokemon[] = [];

  myCurrentPokemon: Pokemon|null;
  enemyCurrentPokemon: Pokemon|null;

  myPokemonIntent: Intent|null;
  enemyPokemonIntent: Intent|null;

  constructor() {
  }
}
