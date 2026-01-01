import Home from '../views/pages/home.js';
import Detail from '../views/pages/detail.js';
import Favorite from '../views/pages/favorite.js';
import NotFound from '../views/pages/not-found.js';

const routes = {
    '/': Home,
    '/home': Home,
    '/detail/:id': Detail,
    '/favorite': Favorite,
    '/404': NotFound,
};

export default routes;
