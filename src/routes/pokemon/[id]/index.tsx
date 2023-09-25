import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { usePokemonGame } from '../../../hooks/usePokemonGame';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    const id = Number(params.id);
    if (isNaN(id) || id <= 0 || id > 1000) {
        throw redirect(301, '/');
    }
    return id;
});

export default component$(() => {
    const pokemonId = usePokemonId();
    const { isBackImageShowed, isPokemonVisible, toggleFromBack, toggleFromVisible } = usePokemonGame();

    return (
        <>
            <span class="text-5xl">Pokemon: {pokemonId.value}</span>
            <PokemonImage id={pokemonId.value} isVisible={isPokemonVisible.value} backImage={isBackImageShowed.value} />

            <div>
                <button onClick$={toggleFromBack} class="btn btn-primary mr-2" id="btnVoltear" type="button">
                    Voltear
                </button>
                <button onClick$={toggleFromVisible} class="btn btn-primary" id="btnRevelar" type="button">
                    {isPokemonVisible.value ? 'Ocultar' : 'Revelar'}
                </button>
                <Link href="/" class="btn btn-primary ml-2">
                    Atrás
                </Link>
            </div>
        </>
    );
});
