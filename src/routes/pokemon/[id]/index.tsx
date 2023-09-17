import { component$, useContext } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { PokemonGameContext } from '../../../context';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    const id = Number(params.id);
    if (isNaN(id) || id <= 0 || id > 1000) {
        throw redirect(301, '/');
    }
    return id;
});

export default component$(() => {
    const pokemonId = usePokemonId();
    const pokemonGameContext = useContext(PokemonGameContext);

    return (
        <>
            <span class="text-5xl">Pokemon: {pokemonId.value}</span>
            <PokemonImage
                id={pokemonId.value}
                isVisible={pokemonGameContext.isPokemonVisible}
                backImage={pokemonGameContext.isBackImageShowed}
            />

            <div class="mt-10">
                <Link href="/" class="btn btn-primary mr-2">
                    Atrás
                </Link>
            </div>
        </>
    );
});
