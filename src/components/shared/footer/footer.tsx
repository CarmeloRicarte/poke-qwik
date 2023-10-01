import { component$ } from '@builder.io/qwik';
import styles from './Footer.module.css';

export const Footer = component$(() => {
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
