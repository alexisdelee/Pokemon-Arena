import { Pokemon } from '../pokemon/pokemon.model';

export interface Store {
  myTeam: Pokemon[];
  enemyTeam: Pokemon[];
}
