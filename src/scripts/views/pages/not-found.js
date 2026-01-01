const NotFound = {
    async render() {
        return `
        <div class="not-found">
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
        </div>
    `;
    },

    async afterRender() {
    // No-op
    },
};

export default NotFound;
