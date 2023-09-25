import { $, useComputed$, useSignal } from '@builder.io/qwik';

export const useCounter = (initialValue: number) => {
    const counter = useSignal(initialValue);

    const increaseCounter = $(() => {
        counter.value++;
    });

    const decreaseCounter = $(() => {
        if (counter.value === 0) {
            return;
        }
        counter.value--;
    });

    return {
        counter: useComputed$(() => counter.value), // readonly signal
        increase: increaseCounter,
        decrease: decreaseCounter,
    };
};
