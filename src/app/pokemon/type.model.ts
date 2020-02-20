import { ApiID } from './apiid.model';

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
  generation: ApiID;
}

interface Name {
  name: string;
  language: ApiID;
}

export interface Type {
  id: number;
  slot: number;
  type: ApiID;
  url: string;
  name: string;
  damage_relations: DamageRelations;
  game_indices: GameIndice[];
  names: Name[];
}
