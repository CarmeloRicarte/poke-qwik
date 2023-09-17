import { $, component$, useContext } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../components/pokemons/pokemon-image';
import { PokemonGameContext } from '../context';

export default component$(() => {
    const pokemonGameContext = useContext(PokemonGameContext);
    const nav = useNavigate();
    const changePokemonId = $((value: number) => {
        if (pokemonGameContext.pokemonId + value <= 0) return;
        pokemonGameContext.pokemonId += value;
    });

    const goToPokemon = $(async () => await nav(`/pokemon/${pokemonGameContext.pokemonId}`));

    return (
        <>
            <span class="text-2xl">Buscador simple</span>
            <span class="text-9xl">{pokemonGameContext.pokemonId}</span>

            <div class="cursor-pointer" onClick$={async () => goToPokemon()}>
                <PokemonImage
                    id={pokemonGameContext.pokemonId}
                    backImage={pokemonGameContext.isBackImageShowed}
                    isVisible={pokemonGameContext.isPokemonVisible}
                />
            </div>

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
                    onClick$={() => (pokemonGameContext.isBackImageShowed = !pokemonGameContext.isBackImageShowed)}
                    class="btn btn-primary mr-2"
                    id="btnVoltear"
                    type="button">
                    Voltear
                </button>
                <button
                    onClick$={() => (pokemonGameContext.isPokemonVisible = !pokemonGameContext.isPokemonVisible)}
                    class="btn btn-primary"
                    id="btnRevelar"
                    type="button">
                    {pokemonGameContext.isPokemonVisible ? 'Ocultar' : 'Revelar'}
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
