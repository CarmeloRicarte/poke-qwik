import type { PokemonListResponseT, SmallPokemonT } from '../types';

export const getSmallPokemons = async (offset: number = 0, limit: number = 10): Promise<SmallPokemonT[]> => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = (await resp.json()) as PokemonListResponseT;
    const POKEMON_ID_POSITION = -2;
    return data.results.map(({ url, name }) => {
        const segments = url.split('/');
        const id = segments.at(POKEMON_ID_POSITION)!;
        return {
            id,
            name,
        };
    });
};
