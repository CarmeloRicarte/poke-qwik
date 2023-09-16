import { $, component$, useOnDocument, useStore, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { getSmallPokemons } from '../helpers';
import type { PokemonPageStateT } from './pokemonListClientT';

export default component$(() => {
    const pokemonState = useStore<PokemonPageStateT>({
        currentPage: 0,
        pokemons: [],
        isLoading: false,
        isFinalPage: false,
    });

    const GRACE_MARGIN_CURRENT_SCROLL = 200;
    const POKEMONS_PER_PAGE = 10;

    useTask$(async ({ track }) => {
        track(() => pokemonState.currentPage);
        const pokemons = await getSmallPokemons(pokemonState.currentPage * POKEMONS_PER_PAGE);
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
        pokemonState.isLoading = false;
        pokemonState.isFinalPage = pokemons.length === 0;
    });

    useOnDocument(
        'scroll',
        $(() => {
            const maxScroll = document.body.scrollHeight;
            const currentScroll = window.scrollY + window.innerHeight;

            if (
                currentScroll + GRACE_MARGIN_CURRENT_SCROLL >= maxScroll &&
                !pokemonState.isLoading &&
                !pokemonState.isFinalPage
            ) {
                pokemonState.isLoading = true;
                pokemonState.currentPage++;
            }
        }),
    );

    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Estado</span>
                <span>P;agina actual: {pokemonState.currentPage} </span>
                <span>Está cargando: {pokemonState.isLoading}</span>
            </div>

            <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
                {pokemonState.pokemons?.map(({ name, id }) => (
                    <div key={name} class="m-5 flex flex-col justify-center items-center">
                        <PokemonImage id={id} />
                        <span class="capitalize">{name}</span>
                    </div>
                ))}
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Lista Cliente',
};
