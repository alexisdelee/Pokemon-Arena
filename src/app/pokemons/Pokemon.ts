import {IApiID} from './IApiID';
import {Move} from './Move';
import {Type} from './Type';

export interface Ability {
    is_hidden: boolean;
    slot: number;
    ability: IApiID;
}

export interface GameIndice {
    game_index: number;
    version: IApiID;
}

export interface HeldItemVersionDetail {
    rarity: number;
    version: IApiID;
}

export interface HeldItem {
    item: IApiID;
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
    stat: IApiID;
}

export interface Pokemon {
    id: number;
    hp: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: IApiID[];
    game_indices: GameIndice[];
    held_items: HeldItem[];
    moves: Move[];
    species: IApiID;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
}
