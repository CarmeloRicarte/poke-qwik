import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

import { Footer, Navbar } from '../components/shared';
import type { PokemonGameStateT, PokemonListStateT } from '../context';
import { PokemonGameContext, PokemonListContext } from '../context';
import styles from './styles.css?inline';

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export default component$(() => {
    useStyles$(styles);

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

    return (
        <>
            <Navbar />
            <main class="flex flex-col items-center justify-center">
                <Slot />
            </main>
            <Footer />
        </>
    );
});
