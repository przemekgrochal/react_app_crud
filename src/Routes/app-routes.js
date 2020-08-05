import { withNavigationWatcher } from '../contexts/navigation';
import {
  HomePage,
  CennikiPage,
  SklepyPage,
  WalutyPage,
  UzytkownicyPage,
  PromocjePage
} from '../pages';
import { paths } from './app-paths';

const routes = [
  {
    path: paths.WalutyPage,
    component: WalutyPage
  },
  {
    path: paths.PromocjePage,
    component: PromocjePage
  },
  {
    path: paths.UzytkownicyPage,
    component: UzytkownicyPage
  },
  {
    path: paths.SklepyPage,
    component: SklepyPage
  },
  {
    path: paths.CennikiPage,
    component: CennikiPage
  },
  {
    path: '/home',
    component: HomePage
  }
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
