import { getLoginApi } from "@/server/api/loginApi";
import { defineStore } from "pinia";
import router from "@/router";

export const useLoginStore = defineStore(
    "login",
    () => {
        const token = ref("");

        async function Login(form: any): Promise<any> {
            try {
                const data = await getLoginApi(form);
                token.value = data.token;
                router.replace("/");
            } catch (error: any) {
                return Promise.reject(new Error(error));
            }
        }

        return { token, Login };
    },
    {
        persist: {
            enabled: true,
            strategies: [
                {
                    key: "token",
                    storage: localStorage,
                    paths: ["token"]
                }
            ]
        }
    }
);
