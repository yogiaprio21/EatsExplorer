import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb.js';
import FavoriteRestaurantPresenter from './liked-restaurant/favorite-restaurant-presenter.js';
import FavoriteRestaurantSearchView from './liked-restaurant/favorite-restaurant-search-view.js';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
    async render() {
        return view.getTemplate();
    },

    async afterRender() {
        new FavoriteRestaurantPresenter({
            view,
            favoriteRestaurants: FavoriteRestaurantIdb,
        });
    },
};

export default Favorite;
