import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            children: [
                {
                    path: "userList",
                    name: "userList",
                    component: () => import("@/views/UserView.vue")
                },
                {
                    path: "roleList",
                    name: "roleList",
                    component: () => import("@/views/RoleView.vue")
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: LoginView
        },
        {
            path: "/register",
            name: "register",
            component: () => import("@/views/RegisterView.vue")
        },
        {
            path: "/test",
            component: () => import("/test/test.vue")
        }
    ]
});

export default router;
