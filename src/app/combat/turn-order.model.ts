import {Pokemon} from '../pokemon/pokemon.model';
import {Move} from '../pokemon/move.model';

export class Intent {
  constructor(public pokemon: Pokemon, public move: Move) {
  }
}
