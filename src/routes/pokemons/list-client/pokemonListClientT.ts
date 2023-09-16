import type { SmallPokemonT } from '../types';

export type PokemonPageStateT = {
    currentPage: number;
    pokemons: SmallPokemonT[];
    isLoading: boolean;
    isFinalPage: boolean;
};
