import DrawerInitiator from '../utils/drawer-initiator.js';
import UrlParser from '../routes/url-parser.js';
import routes from '../routes/routes.js';

class App {
    constructor({ button, drawer, content }) {
        this._button = button;
        this._drawer = drawer;
        this._content = content;

        this._initialAppShell();
    }

    _initialAppShell() {
        DrawerInitiator.init({
            button: this._button,
            drawer: this._drawer,
            content: this._content,
        });
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = routes[url] || routes['/404'];

        this._content.innerHTML = await page.render();
        await page.afterRender();

        // Hide drawer after page change on mobile
        const drawer = document.querySelector('#navigationDrawer');
        if (window.innerWidth < 768 && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
            this._button.setAttribute('aria-expanded', 'false');
        }
    }
}

export default App;
