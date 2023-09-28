import { Slot, component$ } from '@builder.io/qwik';
import { Footer, Navbar } from '../../components/shared';
import { PokemonProvider } from '../../context';

export default component$(() => {
    return (
        <PokemonProvider>
            <Navbar />
            <main class="flex flex-col items-center justify-center">
                <Slot />
            </main>
            <Footer />
        </PokemonProvider>
    );
});
