import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore(
    "menu",
    () => {
        const isCollapse = ref(false);
        const menuPath = ref("/");
        return { isCollapse, menuPath };
    },
    {
        persist: {
            enabled: true,
            strategies: [
                {
                    key: "menu",
                    storage: localStorage,
                    paths: ["isCollapse", "menuPath"]
                }
            ]
        }
    }
);
