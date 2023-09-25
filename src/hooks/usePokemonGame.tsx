import { $, useComputed$, useContext } from '@builder.io/qwik';
import { PokemonGameContext } from '../context';

export const usePokemonGame = () => {
    const pokemonGameContext = useContext(PokemonGameContext);

    const changePokemonId = $((value: number) => {
        if (pokemonGameContext.pokemonId + value <= 0) return;
        pokemonGameContext.pokemonId += value;
    });

    const toggleFromBack = $(() => {
        pokemonGameContext.isBackImageShowed = !pokemonGameContext.isBackImageShowed;
    });

    const toggleFromVisible = $(() => {
        pokemonGameContext.isPokemonVisible = !pokemonGameContext.isPokemonVisible;
    });

    return {
        pokemonId: useComputed$(() => pokemonGameContext.pokemonId),
        isBackImageShowed: useComputed$(() => pokemonGameContext.isBackImageShowed),
        isPokemonVisible: useComputed$(() => pokemonGameContext.isPokemonVisible),
        nextPokemonId: $(() => changePokemonId(1)),
        previousPokemonId: $(() => changePokemonId(-1)),
        toggleFromBack,
        toggleFromVisible,
    };
};
