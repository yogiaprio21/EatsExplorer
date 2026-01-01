import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb.js';
import { createLikeButtonTemplate, createUnlikeButtonTemplate } from '../views/templates/template-creator.js';

const LikeButtonInitiator = {
    async init({ likeButtonContainer, restaurant }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurant;

        if (await this._isRestaurantLiked(id)) {
            this._renderUnlike();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantLiked(id) {
        const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
        return !!restaurant;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

        const likeButton = this._likeButtonContainer.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
            await this._renderButton();
        });
    },

    _renderUnlike() {
        this._likeButtonContainer.innerHTML = createUnlikeButtonTemplate();

        const likeButton = this._likeButtonContainer.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
            await this._renderButton();
        });
    },
};

export default LikeButtonInitiator;
