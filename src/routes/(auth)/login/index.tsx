import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';
import styles from './login.css?inline';

export const useLoginUserAction = routeAction$(
    (data, { cookie, redirect }) => {
        const { email, password } = data;

        if (email === 'carmelo@google.com' && password === '123456') {
            cookie.set('jwt', 'esto_es_mi_jwt', { secure: true, path: '/', sameSite: true });
            redirect(302, '/');

            return {
                success: true,
            };
        }

        return {
            success: false,
        };
    },
    zod$({
        email: z.string().email('Formato email inválido'),
        password: z.string().min(6, 'Minimo 6 caracteres'),
    }),
);

export default component$(() => {
    useStylesScoped$(styles);
    const action = useLoginUserAction();

    return (
        <Form action={action} class="login-form mt-5">
            <div class="relative">
                <label for="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    class={action.value?.fieldErrors?.email ? 'not-valid' : ''}
                />
                {action.value?.fieldErrors?.email ? (
                    <span class="not-valid">{action.value?.fieldErrors?.email}</span>
                ) : (
                    <></>
                )}
            </div>
            <div class="relative">
                <label for="password">Contraseña</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    class={action.value?.fieldErrors?.password ? 'not-valid' : ''}
                />
                {action.value?.fieldErrors?.password ? (
                    <span class="not-valid">{action.value?.fieldErrors?.password}</span>
                ) : (
                    <></>
                )}
            </div>
            <div class="relative">
                <button type="submit" disabled={action.isRunning}>
                    Acceder
                </button>
            </div>
        </Form>
    );
});
