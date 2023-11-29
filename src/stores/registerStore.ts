import { getLoginApi } from "@/server/api/loginApi";
import { defineStore } from "pinia";
import router from "@/router";

export const useRegisterStore = defineStore(
    "register",
    () => {

        async function Register(form: any): Promise<any> {
            try {
                const data = await getLoginApi(form);
                router.replace("/login");
            } catch (error: any) {
                return Promise.reject(new Error(error));
            }
        }

        return { Register };
    }
);
