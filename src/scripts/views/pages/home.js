import TheRestaurantDbSource from '../../data/therestaurantdb-source.js';
import { createRestaurantListTemplate } from '../templates/template-creator.js';

const Home = {
    async render() {
        return `
      <div class="content">
        <h2 class="content__heading">Explore Restaurants</h2>
        <div id="restaurant-list" class="restaurant-list"></div>
      </div>
    `;
    },

    async afterRender() {
        const restaurantContainer = document.getElementById('restaurant-list');
        try {
            const restaurants = await TheRestaurantDbSource.getRestaurants();

            if (restaurants.length === 0) {
                restaurantContainer.innerHTML = '<p class="restaurants-not-found">No restaurants found.</p>';
                return;
            }

            restaurantContainer.innerHTML = restaurants.map(createRestaurantListTemplate).join('');
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            restaurantContainer.innerHTML = '<p class="error-message">Failed to load restaurants. Please try again later.</p>';
        }
    },
};

export default Home;
