import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../components/pokemons/pokemon-image';

export default component$(() => {
    const pokemonId = useSignal(1); // use it for booleans, strings, numbers
    const showBackImage = useSignal(false);
    const changePokemonId = $((value: number) => {
        if (pokemonId.value + value <= 0) return;
        pokemonId.value += value;
    });

    return (
        <>
            <span class="text-2xl">Buscador simple</span>
            <span class="text-9xl">{pokemonId}</span>

            <PokemonImage id={pokemonId.value} backImage={showBackImage.value} />

            <div class="mt-2">
                <button
                    onClick$={() => changePokemonId(-1)}
                    class="btn btn-primary mr-2"
                    id="btnAnterior"
                    type="button">
                    Anterior
                </button>
                <button
                    onClick$={() => changePokemonId(1)}
                    class="btn btn-primary mr-2"
                    id="btnSiguiente"
                    type="button">
                    Siguiente
                </button>
                <button
                    onClick$={() => (showBackImage.value = !showBackImage.value)}
                    class="btn btn-primary"
                    id="btnVoltear"
                    type="button">
                    Voltear
                </button>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'PokeQwik',
    meta: [
        {
            name: 'description',
            content: 'Qwik app using Pokemon API',
        },
    ],
};
