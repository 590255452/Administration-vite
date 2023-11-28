import serviceAxios from "../index";
export const getLoginApi = (params: any) => {
    return serviceAxios({
        url: "/login",
        method: "post",
        data: params                                            // post请求时的属性，并且需要删除headers属性
    });
};
