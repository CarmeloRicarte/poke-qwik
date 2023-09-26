import type { PropFunction } from '@builder.io/qwik';
import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import ModalStyles from './Modal.css?inline';

type ModalPropsT = {
    isVisible: boolean;
    closeFn: PropFunction<() => void>;
    size?: 'sm' | 'md' | 'lg';
    isPersistent?: boolean;
};

export const Modal = component$(({ isVisible, closeFn, isPersistent = false, size = 'md' }: ModalPropsT) => {
    useStylesScoped$(ModalStyles);

    return (
        <div onClick$={() => !isPersistent && closeFn} class={isVisible ? 'modal-background' : 'hidden'}>
            <div class={`modal-content modal-${size}`} onClick$={(event) => event.stopPropagation()}>
                <div class="mt-3 text-center">
                    <h3 class="modal-title">
                        <Slot name="title" />
                    </h3>

                    <div class="mt-2 px-7 py-3">
                        <div class="modal-content-text">
                            <Slot name="content" />
                        </div>
                    </div>

                    <div class="items-center px-4 py-3">
                        <button type="button" onClick$={closeFn} id="ok-btn" class="modal-button">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
