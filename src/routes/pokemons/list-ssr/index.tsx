import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$, useLocation, useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { Modal } from '../../../components/shared';
import { getSmallPokemons } from '../helpers';
import { getDetailByPokemonId } from '../helpers/getDetailByPokemonId';
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
    const isModalVisible = useSignal(false);
    const modalPokemon = useStore({
        id: '',
        name: '',
        funFact: '',
    });

    const currentOffset = useComputed$(() => {
        const offsetString = new URLSearchParams(location.url.search);
        return Number(offsetString.get('offset')) || 0;
    });

    const showModal = $((id: string, name: string) => {
        modalPokemon.id = id;
        modalPokemon.name = name;
        isModalVisible.value = true;
    });

    const closeModal = $(() => {
        isModalVisible.value = false;
    });

    useVisibleTask$(async ({ track }) => {
        track(() => modalPokemon.name);
        modalPokemon.funFact = '';
        if (modalPokemon.name.length > 0) {
            const resp = await getDetailByPokemonId(+modalPokemon.id);
            modalPokemon.funFact = resp ?? '';
        }
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
                    <div
                        key={name}
                        onClick$={() => showModal(id, name)}
                        class="m-5 flex flex-col justify-center items-center">
                        <PokemonImage id={id} />
                        <span class="capitalize">{name}</span>
                    </div>
                ))}
            </div>

            <Modal isVisible={isModalVisible.value} closeFn={closeModal} isPersistent>
                <div q:slot="title">{modalPokemon.name}</div>
                <div q:slot="content" class="flex flex-col justify-center items-center">
                    {modalPokemon.id !== '' && <PokemonImage id={modalPokemon.id} />}
                    <span>{modalPokemon.funFact === '' ? 'Cargando un detalle curioso' : modalPokemon.funFact}</span>
                </div>
            </Modal>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Lista SSR',
};
