import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            children: [
                {
                    path: "user",
                    name: "user",
                    component: () => import("@/views/UserView.vue")
                },
                {
                    path: "role",
                    name: "role",
                    component: () => import("@/views/RoleView.vue")
                },
            ]
        },
    ]
});

export default router;
