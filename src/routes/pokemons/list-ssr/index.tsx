import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation, type DocumentHead } from '@builder.io/qwik-city';
import type { PokemonListResponseT } from './pokemonListResponseT';

export const usePokemonList = routeLoader$(async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || '0');
    if (offset < 0 || isNaN(offset)) {
        throw redirect(301, pathname);
    }
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
    const data = (await resp.json()) as PokemonListResponseT;
    return data.results;
});

export default component$(() => {
    const pokemons = usePokemonList();
    const location = useLocation();

    const currentOffset = useComputed$(() => {
        const offsetString = new URLSearchParams(location.url.search);
        return Number(offsetString.get('offset')) || 0;
    });
    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Estado</span>
                <span>Offset: {currentOffset}</span>
                <span>Está cargando página: {location.isNavigating ? 'Sí' : 'No'}</span>
            </div>

            <div class="mt-10">
                <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class="btn btn-primary mr-2">
                    Anteriores
                </Link>
                <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`} class="btn btn-primary mr-2">
                    Siguientes
                </Link>
            </div>

            <div class="grid grid-cols-6 mt-5">
                {pokemons.value.map(({ name }) => (
                    <div key={name} class="m-5 flex flex-col justify-center items-center">
                        <span class="capitalize">{name}</span>
                    </div>
                ))}
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Lista SSR',
};
