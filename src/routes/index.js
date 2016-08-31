import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import Home from './Home';
import CreateDemoRoute from './CreateDemo';
import DashboardRoute from './Dashboard';
import PopUpCardRoute from './Dashboard/PopUpCard'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CreateDemoRoute(store),
    DashboardRoute(store),
    PopUpCardRoute(store),
  ],
});

export default createRoutes;
