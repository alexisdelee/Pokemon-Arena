import {Pokemon} from '../pokemon/pokemon.model';
import {Move} from '../move/move.model';

export class Intent {
  constructor(public pokemon: Pokemon, public move: Move) {
  }
}
