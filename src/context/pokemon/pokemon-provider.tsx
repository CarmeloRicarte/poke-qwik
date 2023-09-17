import { Slot, component$, useContextProvider, useStore } from '@builder.io/qwik';
import { PokemonGameContext, type PokemonGameStateT } from './pokemon-game.context';
import { PokemonListContext, type PokemonListStateT } from './pokemon-list.context';

export const PokemonProvider = component$(() => {
    const pokemonGameStore = useStore<PokemonGameStateT>({
        pokemonId: 1,
        isBackImageShowed: false,
        isPokemonVisible: true,
    });

    const pokemonListStore = useStore<PokemonListStateT>({
        currentPage: 0,
        pokemons: [],
        isLoading: false,
        isFinalPage: false,
    });

    useContextProvider(PokemonGameContext, pokemonGameStore);
    useContextProvider(PokemonListContext, pokemonListStore);
    return <Slot />;
});
