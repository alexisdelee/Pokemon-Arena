import { Pokemon } from '../pokemon/pokemon.model';
import {CombatState} from '../combat/CombatState';

export interface Store {
  myTeam: Pokemon[];
  enemyTeam: Pokemon[];
  combatState: CombatState;
}
