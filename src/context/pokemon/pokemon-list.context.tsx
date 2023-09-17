import { createContextId } from '@builder.io/qwik';
import type { SmallPokemonT } from '../../routes/pokemons/types';

export type PokemonListStateT = {
    currentPage: number;
    pokemons: SmallPokemonT[];
    isLoading: boolean;
    isFinalPage: boolean;
};

export const PokemonListContext = createContextId<PokemonListStateT>('pokemon-list.context');
