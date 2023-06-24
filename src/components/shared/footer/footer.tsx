import { component$ } from '@builder.io/qwik';
import styles from './footer.module.css';

export default component$(() => {
    return (
        <footer>
            <div class="container">
                <a href="https://www.linkedin.com/in/camelo-ricarte-rocamora/" target="_blank" class={styles.anchor}>
                    <span>Made with ♡ by Carmelo Ricarte Rocamora</span>
                </a>
            </div>
        </footer>
    );
});
