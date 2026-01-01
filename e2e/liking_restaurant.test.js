const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
    I.seeElement('#query');
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found p');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found p');

    I.amOnPage('/');
    I.waitForElement('.restaurant-title a', 5);
    I.seeElement('.restaurant-title a');
    const firstRestaurant = locate('.restaurant-title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.waitForElement('#likeButton', 10);  // Increased waiting time
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForElement('.restaurant-item', 5);
    I.seeElement('.restaurant-item');
    const likedRestaurantTitle = await I.grabTextFrom('.restaurant-title a');

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});


Scenario('unliking one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found p');

    I.amOnPage('/');
    I.waitForElement('.restaurant-title a', 5);
    I.seeElement('.restaurant-title a');

    const firstRestaurant = locate('.restaurant-title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForElement('.restaurant-item', 5);
    I.seeElement('.restaurant-item');

    const likedRestaurantTitle = await I.grabTextFrom('.restaurant-title a');
    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

    I.click(locate('.restaurant-title a').first());

    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForText('Tidak ada restaurant untuk ditampilkan', 5, '.restaurant-item__not__found p');
    const FavoriteRestaurantIsEmpty = await I.grabTextFrom('.restaurant-item__not__found p');
    assert.strictEqual(FavoriteRestaurantIsEmpty, 'Tidak ada restaurant untuk ditampilkan');
});


Scenario('searching restaurants', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found p');

    I.amOnPage('/');

    I.waitForElement('.restaurant-title a', 5);
    I.seeElement('.restaurant-title a');

    const titles = [];
    for (let i = 1; i <= 3; i++) {
        I.click(locate('.restaurant-title a').at(i));
        I.waitForElement('#likeButton', 5);
        I.seeElement('#likeButton');
        I.click('#likeButton');
        titles.push(await I.grabTextFrom('.restaurant__title'));
        I.amOnPage('/');
    }

    I.amOnPage('/#/favorite');
    I.waitForElement('#query', 5);
    I.seeElement('#query');

    const searchQuery = titles[1].substring(1, 3);
    const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);
    I.fillField('#query', searchQuery);
    I.pressKey('Enter');

    const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
    assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

    for (let i = 0; i < matchingRestaurants.length; i++) {
        const visibleTitle = await I.grabTextFrom(locate('.restaurant-item__title').at(i + 1));
        assert.strictEqual(matchingRestaurants[i], visibleTitle);
    }
});
