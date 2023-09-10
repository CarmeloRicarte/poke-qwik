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
