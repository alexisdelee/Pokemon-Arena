import {Pokemon} from '../pokemons/Pokemon';
import {Move} from '../pokemons/Move';

export class CombatState {
  myTeam: Pokemon[];
  enemyTeam: Pokemon[];

  myCurrentPokemon: Pokemon|null;
  enemyCurrentPokemon: Pokemon|null;

  myPokemonIntent: Move|null;
  enemyPokemonIntent: Move|null;
}
