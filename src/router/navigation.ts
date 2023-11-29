import { useLoginStore } from "@/stores/loginStore";
import router from "@/router/index";
const whiteList = ["/login", "/register"];                      // 白名单，即没有登录也能访问的页面
router.beforeEach((to, from, next) => {
    const store = useLoginStore();                  // 在守卫中使用pinia一定要定义在守卫内部
    if (store.token !== "") {
        if (to.path === "/login") {
            next("/");
        } else {
            next();
        }
    } else {
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next("/login");
        }
    }
});
