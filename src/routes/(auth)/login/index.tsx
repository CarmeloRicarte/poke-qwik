import { $, component$, useComputed$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './login.css?inline';

export default component$(() => {
    useStylesScoped$(styles);
    const formState = useStore({
        email: '',
        password: '',
        isFormPosted: false,
    });

    const emailError = useComputed$(() => {
        if (formState.email.includes('@')) {
            return '';
        }

        return 'not-valid';
    });

    const passwordError = useComputed$(() => {
        if (formState.password.length >= 6) {
            return '';
        }

        return 'not-valid';
    });

    const isFormValid = useComputed$(() => {
        if (emailError.value === 'not-valid' || passwordError.value === 'not-valid') {
            return false;
        }
        return true;
    });

    const onSubmit = $(() => {
        formState.isFormPosted = true;
    });

    return (
        <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
            <div class="relative">
                <input
                    id="email"
                    onInput$={(ev) => (formState.email = (ev.target as HTMLInputElement).value)}
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={formState.email}
                    class={formState.isFormPosted ? emailError.value : ''}
                />
                <label for="email">Email</label>
            </div>
            <div class="relative">
                <input
                    id="password"
                    onInput$={(ev) => (formState.password = (ev.target as HTMLInputElement).value)}
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={formState.password}
                    class={formState.isFormPosted ? passwordError.value : ''}
                />
                <label for="password">Contraseña</label>
            </div>
            <div class="relative">
                <button type="submit" disabled={!isFormValid.value}>
                    Acceder
                </button>
            </div>
        </form>
    );
});
