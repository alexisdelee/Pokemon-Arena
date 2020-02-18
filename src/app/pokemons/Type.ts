import {IApiID} from './IApiID';

interface NoDamageTo {
  name: string;
  url: string;
}

interface HalfDamageTo {
  name: string;
  url: string;
}

interface DoubleDamageTo {
  name: string;
  url: string;
}

interface NoDamageFrom {
  name: string;
  url: string;
}

interface HalfDamageFrom {
  name: string;
  url: string;
}

interface DoubleDamageFrom {
  name: string;
  url: string;
}

interface DamageRelations {
  no_damage_to: NoDamageTo[];
  half_damage_to: HalfDamageTo[];
  double_damage_to: DoubleDamageTo[];
  no_damage_from: NoDamageFrom[];
  half_damage_from: HalfDamageFrom[];
  double_damage_from: DoubleDamageFrom[];
}

interface GameIndice {
  game_index: number;
  generation: IApiID;
}

interface Name {
  name: string;
  language: IApiID;
}

export interface Type {
  id: number;
  slot: number;
  type: IApiID;
  name: string;
  damage_relations: DamageRelations;
  game_indices: GameIndice[];
  names: Name[];
}
