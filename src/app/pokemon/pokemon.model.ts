import { ApiID } from './apiid.model';
import { Move } from '../move/move.model';
import { Type } from './type.model';

export interface Ability {
    is_hidden: boolean;
    slot: number;
    ability: ApiID;
}

export interface GameIndice {
    game_index: number;
    version: ApiID;
}

export interface HeldItemVersionDetail {
    rarity: number;
    version: ApiID;
}

export interface HeldItem {
    item: ApiID;
    version_details: HeldItemVersionDetail[];
}

export interface Sprites {
    back_female: string;
    back_shiny_female: string;
    back_default: string;
    front_female: string;
    front_shiny_female: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: ApiID;
}

export interface Pokemon {
    id: number;
    hp: number;
    level: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: ApiID[];
    game_indices: GameIndice[];
    held_items: HeldItem[];
    moves: Move[];
    pickedMoves: Move[];
    species: ApiID;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
}
