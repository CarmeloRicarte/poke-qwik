import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../../components/pokemons/pokemon-image';
import { PokemonListContext } from '../../../../context';
import { getSmallPokemons } from '../helpers';

export default component$(() => {
    const pokemonState = useContext(PokemonListContext);

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
                <span>Página actual: {pokemonState.currentPage} </span>
                <span>Está cargando: {pokemonState.isLoading ? 'Sí' : 'No'}</span>
            </div>

            <div class="mt-10">
                <button type="button" onClick$={() => pokemonState.currentPage++} class="btn btn-primary mr-2">
                    Siguientes
                </button>
            </div>

            <div class="grid min-[320px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
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
