import { component$, useSignal, useTask$ } from '@builder.io/qwik';
type PokemonImageProps = {
    id: number;
    size?: number;
    backImage?: boolean;
};
export const PokemonImage = component$<PokemonImageProps>(({ id, size = 200, backImage = false }) => {
    const isImageLoaded = useSignal(false);
    useTask$(({ track }) => {
        track(() => id); // se dispara cuando se cambia el id
        isImageLoaded.value = false;
    });

    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    if (backImage) {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
    }

    return (
        <div class="flex items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
            {!isImageLoaded.value && <span>Cargando...</span>}
            <img
                src={imageUrl}
                alt="Pokemon Image"
                width={size}
                height={size}
                onLoad$={() => {
                    isImageLoaded.value = true;
                }}
                class={{
                    hidden: !isImageLoaded.value,
                }}
            />
        </div>
    );
});
