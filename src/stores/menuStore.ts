import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", () => {
    const isCollapse = ref(false);

    return { isCollapse };
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: "menu",
                storage: localStorage,
                paths: ["isCollapse"],
            },
        ],
    },
});
