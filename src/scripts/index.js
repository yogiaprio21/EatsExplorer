import 'regenerator-runtime';
import 'lazysizes';
import '../styles/main.css';
import './components/footer-app.js';
import './components/hero-app.js';
import './components/skip-link.js';
import App from './views/app.js';
import swRegister from './utils/sw-register.js';

const app = new App({
    button: document.querySelector('#hamburgerButton'),
    drawer: document.querySelector('#navigationDrawer'),
    content: document.querySelector('#main-content'),
});

const main = () => {
    app.renderPage();
    swRegister();
};

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', main);
