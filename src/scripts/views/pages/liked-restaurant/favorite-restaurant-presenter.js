class FavoriteRestaurantPresenter {
    constructor({ view, favoriteRestaurants }) {
        this._view = view;
        this._favoriteRestaurants = favoriteRestaurants;

        this._listenToSearchRequestByUser();
        this._showInitialRestaurants();
    }

    _listenToSearchRequestByUser() {
        this._view.runWhenUserIsSearching(async (latestQuery) => {
            if (latestQuery.trim() === '') {
                this._showInitialRestaurants();
            } else {
                const foundRestaurants = await this._favoriteRestaurants.searchRestaurants(latestQuery);
                this._displayRestaurants(foundRestaurants);
            }
        });
    }

    async _showInitialRestaurants() {
        const restaurants = await this._favoriteRestaurants.getAllRestaurants();
        this._displayRestaurants(restaurants);
    }

    _displayRestaurants(restaurants) {
        this._view.showFavoriteRestaurants(restaurants);
    }
}

export default FavoriteRestaurantPresenter;
