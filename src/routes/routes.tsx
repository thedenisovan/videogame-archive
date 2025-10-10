import App from '../components/App';
import Authorization from '../components/main/auth/Authorization';
import Discover from '../components/main/discoverPage/Discover';
import Favorites from '../components/main/favoritesPage/Favorites';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Discover />,
      },
      {
        path: 'fav',
        element: <Favorites />,
      },
      {
        path: 'auth',
        element: <Authorization />,
      },
    ],
  },
];

export default routes;
