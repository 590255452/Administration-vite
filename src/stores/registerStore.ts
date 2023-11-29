import { defineStore } from "pinia";
import router from "@/router";
import { getRegisterApi } from "@/server/api/registerApi";

export const useRegisterStore = defineStore(
    "register",
    () => {

        async function Register(form: any): Promise<any> {
            try {
                const data = await getRegisterApi(form);
                console.log(data);
                // router.replace("/login");
            } catch (error: any) {
                return Promise.reject(new Error(error));
            }
        }

        return { Register };
    }
);
