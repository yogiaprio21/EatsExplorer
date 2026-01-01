class HeroApp extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="hero">
          <picture>
            <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2.jpg">
            <img class="lazyload" data-src="./images/heros/hero-image_2.jpg" alt="Restaurant Image" crossorigin="anonymous">
          </picture>
          <div class="hero__inner">
            <h1 class="hero__title">Eats Explorer</h1>
            <p class="hero__subtitle">Find the best restaurants in town</p>
          </div>
        </div>
      `;
    }
}

customElements.define('hero-app', HeroApp);
