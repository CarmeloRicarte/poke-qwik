import { $, component$ } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../components/pokemons/pokemon-image';
import { usePokemonGame } from '../hooks/usePokemonGame';

export default component$(() => {
    const nav = useNavigate();
    const {
        pokemonId,
        isBackImageShowed,
        isPokemonVisible,
        nextPokemonId,
        previousPokemonId,
        toggleFromBack,
        toggleFromVisible,
    } = usePokemonGame();

    const goToPokemon = $(async (id: number) => await nav(`/pokemon/${id}`));

    return (
        <>
            <span class="text-2xl">Buscador simple</span>
            <span class="text-9xl">{pokemonId.value}</span>

            <div class="cursor-pointer" onClick$={async () => goToPokemon(pokemonId.value)}>
                <PokemonImage
                    id={pokemonId.value}
                    backImage={isBackImageShowed.value}
                    isVisible={isPokemonVisible.value}
                />
            </div>

            <div class="mt-2">
                <button onClick$={previousPokemonId} class="btn btn-primary mr-2" id="btnAnterior" type="button">
                    Anterior
                </button>
                <button onClick$={nextPokemonId} class="btn btn-primary mr-2" id="btnSiguiente" type="button">
                    Siguiente
                </button>
                <button onClick$={toggleFromBack} class="btn btn-primary mr-2" id="btnVoltear" type="button">
                    Voltear
                </button>
                <button onClick$={toggleFromVisible} class="btn btn-primary" id="btnRevelar" type="button">
                    {isPokemonVisible.value ? 'Ocultar' : 'Revelar'}
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
