export type PokemonListResponseT = {
    count: number;
    next: string;
    previous?: any;
    results: BasicPokemonInfoT[];
};

export type BasicPokemonInfoT = {
    name: string;
    url: string;
};

export type SmallPokemonT = {
    id: string;
    name: string;
};

export type PokemonDetailResponseT = {
    base_happiness: number;
    capture_rate: number;
    colorT: ColorT;
    egg_groups: ColorT[];
    evolution_chain: EvolutionChainT;
    evolves_from_species: null;
    flavor_text_entries: FlavorTextEntryT[];
    form_descriptions: any[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: GenusT[];
    generation: ColorT;
    growth_rate: ColorT;
    habitat: ColorT;
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: NameT[];
    order: number;
    pal_park_encounters: PalParkEncounterT[];
    pokedex_numbers: PokedexNumberT[];
    shape: ColorT;
    varieties: VarietyT[];
};

export type ColorT = {
    name: string;
    url: string;
};

export type EvolutionChainT = {
    url: string;
};

export type FlavorTextEntryT = {
    flavor_text: string;
    language: ColorT;
    version: ColorT;
};

export type GenusT = {
    genus: string;
    language: ColorT;
};

export type NameT = {
    language: ColorT;
    name: string;
};

export type PalParkEncounterT = {
    area: ColorT;
    base_score: number;
    rate: number;
};

export type PokedexNumberT = {
    entry_number: number;
    pokedex: ColorT;
};

export type VarietyT = {
    is_default: boolean;
    pokemon: ColorT;
};
