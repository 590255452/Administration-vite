import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
    const user: Ref<Object | null> = ref(null);

    function User(data: Object): void {
        user.value = data;
    }

    return { user, User };
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: "user",
                storage: localStorage
            }
        ]
    }
});
