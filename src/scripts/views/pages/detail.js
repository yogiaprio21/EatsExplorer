import TheRestaurantDbSource from '../../data/therestaurantdb-source.js';
import UrlParser from '../../routes/url-parser.js';
import { createRestaurantDetailTemplate } from '../templates/template-creator.js';
import LikeButtonInitiator from '../../utils/like-button-initiator.js';
import PostReview from '../../utils/post-review.js';

const Detail = {
    async render() {
        return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurantContainer = document.querySelector('#restaurant');

        try {
            const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
            restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

            LikeButtonInitiator.init({
                likeButtonContainer: document.querySelector('#likeButtonContainer'),
                restaurant: {
                    id: restaurant.id,
                    name: restaurant.name,
                    description: restaurant.description,
                    pictureId: restaurant.pictureId,
                    rating: restaurant.rating,
                    city: restaurant.city,
                },
            });

            const reviewForm = document.querySelector('#reviewForm');
            if (reviewForm) {
                PostReview.init({
                    form: reviewForm,
                    id: restaurant.id,
                });
            }
        } catch (error) {
            console.error('Error fetching restaurant detail:', error);
            restaurantContainer.innerHTML = '<p class="error-message">Failed to load restaurant details. Please try again later.</p>';
        }
    },
};

export default Detail;
