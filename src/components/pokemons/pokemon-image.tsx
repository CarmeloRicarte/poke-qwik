import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';
type PokemonImageProps = {
    id: number | string;
    size?: number;
    backImage?: boolean;
    isVisible?: boolean;
};
export const PokemonImage = component$<PokemonImageProps>(({ id, size = 200, backImage = false, isVisible = true }) => {
    const isImageLoaded = useSignal(false);
    useTask$(({ track }) => {
        track(() => id); // se dispara cuando se cambia el id
        isImageLoaded.value = false;
    });

    const imageUrl = useComputed$(() => {
        if (id === '') return '';

        return backImage
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    });

    return (
        <div class="flex items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
            {!isImageLoaded.value && <span>Cargando...</span>}
            <img
                src={imageUrl.value}
                alt="Pokemon Image"
                width={size}
                height={size}
                onLoad$={() => {
                    isImageLoaded.value = true;
                }}
                class={[
                    {
                        hidden: !isImageLoaded.value,
                        'brightness-0': !isVisible,
                    },
                    'transition-all',
                ]}
            />
        </div>
    );
});
