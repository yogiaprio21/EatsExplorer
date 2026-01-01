import CONFIG from '../../globals/config.js';

const createRestaurantDetailTemplate = (restaurant) => `
  <article class="restaurant">
    <h2 class="restaurant__title">${restaurant.name}</h2>
    <img class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous" />
    
    <div class="restaurant__info">
      <h3>Information</h3>
      <h4>Address</h4>
      <p>${restaurant.address}</p>
      <h4>City</h4>
      <p>${restaurant.city}</p>
      <h4>Description</h4>
      <p>${restaurant.description}</p>
    </div>

    <div class="restaurant__menu">
      <div class="menu__foods">
        <h3>Foods</h3>
        <ul>
          ${restaurant.menus && restaurant.menus.foods ? restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('') : '<li>No foods available</li>'}
        </ul>
      </div>
      <div class="menu__drinks">
        <h3>Drinks</h3>
        <ul>
          ${restaurant.menus && restaurant.menus.drinks ? restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('') : '<li>No drinks available</li>'}
        </ul>
      </div>
    </div>

    <div class="restaurant__reviews">
      <h3>Customer Reviews</h3>
      <div class="review-list">
        ${restaurant.customerReviews ? restaurant.customerReviews.map((review) => `
          <div class="review">
            <p class="review__name">${review.name}</p>
            <p class="review__date">${review.date}</p>
            <p class="review__review">${review.review}</p>
          </div>
        `).join('') : '<p>No reviews available</p>'}
      </div>
      <form id="reviewForm" class="review-form">
        <h4>Leave a Review</h4>
        <input type="text" id="name" name="name" placeholder="Your name" required>
        <textarea id="review" name="review" placeholder="Your review" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  </article>
`;

const createRestaurantListTemplate = (restaurant) => `
  <article class="restaurant-item">
    <a href="#/detail/${restaurant.id}" class="restaurant-item__link-overlay"></a>
    <img class="restaurant-item__thumbnail lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous">
    <div class="restaurant-item__content">
      <p class="restaurant-item__city">${restaurant.city}</p>
      <h3 class="restaurant-item__title">${restaurant.name}</h3>
      <p class="restaurant-item__rating">Rating: ${restaurant.rating}</p>
      <p class="restaurant-item__description">${restaurant.description}</p>
    </div>
  </article>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
    createRestaurantDetailTemplate,
    createRestaurantListTemplate,
    createLikeButtonTemplate,
    createUnlikeButtonTemplate,
};
