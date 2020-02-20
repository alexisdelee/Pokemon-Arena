import { ApiID } from './apiid.model';
import { Type } from './type.model';

interface EffectEntry {
    effect: string;
    short_effect: string;
    language: ApiID;
}

interface Meta {
    ailment: ApiID;
    category: ApiID;
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
    language: ApiID;
}

interface SuperContestEffect {
    url: string;
}

interface FlavorTextEntry {
    flavor_text: string;
    language: ApiID;
    version_group: ApiID;
}

export interface MoveVersionGroupDetail {
    level_learned_at: number;
    version_group: ApiID;
    move_learn_method: ApiID;
}

export interface Move {
    id: number;
    move: ApiID;
    version_group_details: MoveVersionGroupDetail[];
    name: string;
    accuracy: number;
    effect_chance?: any;
    pp: number;
    priority: number;
    power: number;
    damage_class: ApiID;
    effect_entries: EffectEntry[];
    effect_changes: any[];
    generation: ApiID;
    meta: Meta;
    names: Name[];
    past_values: any[];
    stat_changes: any[];
    super_contest_effect: SuperContestEffect;
    target: ApiID;
    type: Type;
    flavor_text_entries: FlavorTextEntry[];
}
