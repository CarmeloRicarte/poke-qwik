import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$, type DocumentHead } from '@builder.io/qwik-city';

export const usePokemonList = routeLoader$(async () => {
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    const data = await resp.json();
    return data;
});

export default component$(() => {
    const pokemonResp = usePokemonList();
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
                <div class="m-5 flex flex-col justify-center items-center"></div>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Lista SSR',
};
