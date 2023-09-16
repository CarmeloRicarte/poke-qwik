import type { SmallPokemonT } from '../types';

export type PokemonPageStateT = {
    currentPage: number;
    pokemons: SmallPokemonT[];
};
