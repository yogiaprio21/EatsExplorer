const DrawerInitiator = {
    init({ button, drawer, content }) {
        if (!button || !drawer || !content) {
            console.error('Button, drawer, or content element not found in the DOM.');
            return;
        }

        button.setAttribute('aria-expanded', 'false');

        button.addEventListener('click', (event) => {
            this._toggleDrawer(event, drawer, button);
        });

        content.addEventListener('click', (event) => {
            this._closeDrawer(event, drawer, button);
        });

        document.addEventListener('click', (event) => {
            const isClickInsideDrawer = drawer.contains(event.target);
            const isClickInsideButton = button.contains(event.target);
            if (!isClickInsideDrawer && !isClickInsideButton) {
                this._closeDrawer(event, drawer, button);
            }
        });
    },

    _toggleDrawer(event, drawer, button) {
        event.stopPropagation();
        const isExpanded = drawer.classList.toggle('open');
        button.setAttribute('aria-expanded', isExpanded);
    },

    _closeDrawer(event, drawer, button) {
        event.stopPropagation();
        drawer.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
    },
};

export default DrawerInitiator;
