import { withNavigationWatcher } from "./contexts/navigation";
import { HomePage, DisplayDataPage, ProfilePage, UsersPage } from "./pages";

const routes = [
    {
        path: "/display-data",
        component: DisplayDataPage,
    },
    {
        path: "/profile",
        component: ProfilePage,
    },
    {
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
