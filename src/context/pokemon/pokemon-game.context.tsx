import { createContextId } from '@builder.io/qwik';

export type PokemonGameStateT = {
    pokemonId: number;
    isBackImageShowed: boolean;
    isPokemonVisible: boolean;
};

export const PokemonGameContext = createContextId<PokemonGameStateT>('pokemon-game.context');
