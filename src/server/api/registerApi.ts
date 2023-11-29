import serviceAxios from "../index";
export const getRegisterApi = (params: any) => {
    return serviceAxios({
        url: "/register",
        method: "post",
        data: params                                            // post请求时的属性，并且需要删除headers属性
    });
};
