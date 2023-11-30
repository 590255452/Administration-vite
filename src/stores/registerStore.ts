import { defineStore } from "pinia";
import router from "@/router";
import { getRegisterApi } from "@/server/api/registerApi";

export const useRegisterStore = defineStore("register", () => {
    async function Register(form: any): Promise<any> {
        try {
            await getRegisterApi(form);
            router.replace("/login");
        } catch (error: any) {
            location.reload();
            return Promise.reject(new Error(error));
        }
    }

    return { Register };
});
