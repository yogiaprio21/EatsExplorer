class FooterApp extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="footer">
            <p>Yogi Aprio &copy; Front-End Web Developer Expert</p>
        </div>
    `;
    }
}

customElements.define('footer-app', FooterApp);
