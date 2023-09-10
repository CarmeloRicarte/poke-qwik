import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import type { PokemonListResponseT } from './pokemonListResponseT';

export const usePokemonList = routeLoader$(async () => {
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    const data = (await resp.json()) as PokemonListResponseT;
    return data.results;
});

export default component$(() => {
    const pokemons = usePokemonList();
    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Estado</span>
                <span>Página actual: XXXX</span>
                <span>Está cargando página: xxxx</span>
            </div>

            <div class="mt-10">
                <Link class="btn btn-primary mr-2">Anteriores</Link>
                <Link class="btn btn-primary mr-2">Siguientes</Link>
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
