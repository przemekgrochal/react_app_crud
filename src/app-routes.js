import { withNavigationWatcher } from "./contexts/navigation";
import { HomePage, DisplayDataPage, ProfilePage, UsersPage } from "./pages";

const routes = [
    {
        exact: true,
        path: "/display-data",
        component: DisplayDataPage,
    },
    {
        exact: true,
        path: "/profile",
        component: ProfilePage,
    },
    {
        exact: true,
        path: "/home",
        component: HomePage,
    },
    // Users
    {
        exact: true,
        path: "/users",
        component: UsersPage,
    },
];

export default routes.map((route) => {
    return {
        ...route,
        component: withNavigationWatcher(route.component),
    };
});
