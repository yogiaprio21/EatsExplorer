import TheRestaurantDbSource from '../data/therestaurantdb-source.js';

const PostReview = {
    init({ form, id }) {
        if (!form) return;

        const submitHandler = async (event) => {
            event.preventDefault();
            event.stopPropagation();

            const nameInput = form.querySelector('#name');
            const reviewInput = form.querySelector('#review');

            const reviewData = {
                id,
                name: nameInput.value,
                review: reviewInput.value,
            };

            try {
                const response = await TheRestaurantDbSource.postReview(reviewData);
                if (response.error) {
                    this._showMessage('Failed to submit review');
                } else {
                    this._showMessage('Review submitted successfully');
                    this._updateReviews(response.customerReviews);
                    form.reset();
                }
            } catch (error) {
                this._showMessage('An error occurred. Please try again later.');
            }
        };

        form.addEventListener('submit', submitHandler);
    },

    _updateReviews(reviews) {
        const reviewListContainer = document.querySelector('.review-list');
        if (!reviewListContainer) return;

        let reviewsHTML = '';
        if (reviews.length > 0) {
            reviews.forEach((review) => {
                reviewsHTML += `
          <div class="review">
            <p class="review__name">${review.name}</p>
            <p class="review__date">${review.date}</p>
            <p class="review__review">${review.review}</p>
          </div>
        `;
            });
        } else {
            reviewsHTML = '<p>No reviews available</p>';
        }
        reviewListContainer.innerHTML = reviewsHTML;
    },

    _showMessage(message) {
        // eslint-disable-next-line no-alert
        alert(message);
    },
};

export default PostReview;
