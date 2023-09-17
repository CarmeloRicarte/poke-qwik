import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { PokemonGameContext, type PokemonGameStateT } from './pokemon-game.context';
import { PokemonListContext, type PokemonListStateT } from './pokemon-list.context';

export const PokemonProvider = component$(() => {
    const POKEMON_GAME_KEY = 'pokemon-game';
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

    useVisibleTask$(() => {
        if (localStorage.getItem(POKEMON_GAME_KEY)) {
            const {
                pokemonId = 10,
                isBackImageShowed = false,
                isPokemonVisible = true,
            } = JSON.parse(localStorage.getItem(POKEMON_GAME_KEY)!) as PokemonGameStateT;
            pokemonGameStore.pokemonId = pokemonId;
            pokemonGameStore.isBackImageShowed = isBackImageShowed;
            pokemonGameStore.isPokemonVisible = isPokemonVisible;
        }
    });

    useVisibleTask$(({ track }) => {
        track(() => [
            pokemonGameStore.pokemonId,
            pokemonGameStore.isBackImageShowed,
            pokemonGameStore.isPokemonVisible,
        ]);
        localStorage.setItem(POKEMON_GAME_KEY, JSON.stringify(pokemonGameStore));
    });

    return <Slot />;
});
