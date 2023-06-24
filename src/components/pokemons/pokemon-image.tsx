import { component$ } from '@builder.io/qwik';
type PokemonImageProps = {
    id: number;
    size?: number;
    backImage?: boolean;
};
export const PokemonImage = component$<PokemonImageProps>(({ id, size = 200, backImage = false }) => {
    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    if (backImage) {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
    }

    return <img src={imageUrl} alt="Pokemon Image" width={size} height={size} />;
});
