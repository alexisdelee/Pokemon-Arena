import {IApiID} from './IApiID';
import {Type} from './Type';

interface EffectEntry {
    effect: string;
    short_effect: string;
    language: IApiID;
}

interface Meta {
    ailment: IApiID;
    category: IApiID;
    min_hits?: any;
    max_hits?: any;
    min_turns?: any;
    max_turns?: any;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
}

interface Name {
    name: string;
    language: IApiID;
}

interface SuperContestEffect {
    url: string;
}

interface FlavorTextEntry {
    flavor_text: string;
    language: IApiID;
    version_group: IApiID;
}

export interface MoveVersionGroupDetail {
    level_learned_at: number;
    version_group: IApiID;
    move_learn_method: IApiID;
}

export interface Move {
    id: number;
    move: IApiID;
    version_group_details: MoveVersionGroupDetail[];
    name: string;
    accuracy: number;
    effect_chance?: any;
    pp: number;
    priority: number;
    power: number;
    damage_class: IApiID;
    effect_entries: EffectEntry[];
    effect_changes: any[];
    generation: IApiID;
    meta: Meta;
    names: Name[];
    past_values: any[];
    stat_changes: any[];
    super_contest_effect: SuperContestEffect;
    target: IApiID;
    type: Type;
    flavor_text_entries: FlavorTextEntry[];
}
