import { createRestaurantListTemplate } from '../../templates/template-creator.js';

class FavoriteRestaurantSearchView {
    getTemplate() {
        return `
      <div class="content">
        <h2 class="content__heading">Your Favorite Restaurants</h2>
        <div class="search-container">
          <input id="query" type="text" class="search-input" placeholder="Search for a favorite restaurant...">
        </div>
        <div id="restaurant-list" class="restaurant-list"></div>
      </div>
    `;
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('input', (event) => {
            callback(event.target.value);
        });
    }

    showFavoriteRestaurants(restaurants = []) {
        const restaurantContainer = document.getElementById('restaurant-list');
        if (restaurants && restaurants.length) {
            restaurantContainer.innerHTML = restaurants.map(createRestaurantListTemplate).join('');
        } else {
            restaurantContainer.innerHTML = this._getEmptyRestaurantTemplate();
        }
    }

    _getEmptyRestaurantTemplate() {
        return `
      <div class="restaurants-not-found">
        <p>You don't have any favorite restaurants yet.</p>
      </div>
    `;
    }
}

export default FavoriteRestaurantSearchView;
