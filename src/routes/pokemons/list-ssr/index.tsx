import { component$, useComputed$ } from '@builder.io/qwik';
import { routeLoader$, useLocation, useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { getSmallPokemons } from '../helpers';
import type { SmallPokemonT } from '../types';

export const usePokemonList = routeLoader$<SmallPokemonT[]>(async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || '0');
    if (offset < 0 || isNaN(offset)) {
        throw redirect(301, pathname);
    }

    return await getSmallPokemons(offset);
});

export default component$(() => {
    const pokemons = usePokemonList();
    const location = useLocation();
    const navigate = useNavigate();

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
                <button
                    type="button"
                    disabled={currentOffset.value === 0}
                    onClick$={() => navigate(`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`)}
                    class="btn btn-primary mr-2">
                    Anteriores
                </button>
                <button
                    type="button"
                    onClick$={() => navigate(`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`)}
                    class="btn btn-primary mr-2">
                    Siguientes
                </button>
            </div>

            <div class="grid grid-cols-6 mt-5">
                {pokemons.value?.map(({ name, id }) => (
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
    title: 'Lista SSR',
};
