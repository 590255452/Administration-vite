import axios from "axios";
import qs from "qs";
import { useLoginStore } from "@/stores/loginStore";
import router from "@/router";
import { ElMessage } from "element-plus";

const serverConfig: any = {
    baseURL: import.meta.env.BASE_URL, // import.meta.env.BASE_URL当前路径
    timeout: 2000,
    withCredentials: false,
    responseType: "json",
    headers: { "Content-Type": "application/json; charset=utf-8" }
};
const serviceAxios = axios.create(serverConfig);

//请求拦截
serviceAxios.interceptors.request.use(
    config => {
        // 如果开启token认证
        if (localStorage.getItem("token") !== null) {
            config.headers.Authorization = JSON.parse(localStorage.getItem("token")).token; // 请求头携带token
        }
        // 如果没有设置请求头
        if (!config.headers["content-type"]) {
            if (config.method === "post") {
                config.headers["content-type"] = "application/x-www-form-urlencoded"; // post请求 序列化
                config.data = qs.stringify(config.data);
            } else {
                config.headers["content-type"] = "application/json"; // 默认属性
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截
serviceAxios.interceptors.response.use(
    res => {
        // 响应数据经过此处做中间操作(如数据过滤)
        res = res.data;
        if (res.code === 200) {
            return res.data;
        } else {
            ElMessage.error(res.code + "：" + res.msg);
            return Promise.reject(res.code + "：" + res.msg);
        }
    },
    error => {
        if (error.response.data) {
            error.message = error.response.data.msg;
        }
        const store = useLoginStore();
        let message = "";
        if (error && error.response) {
            switch (error.response.status) {
                case 302:
                    message = "接口重定向了！";
                    break;
                case 400:
                    message = "参数不正确！";
                    break;
                case 401:
                    store.token = "";
                    router.replace("/login");
                    message = "您未登录，或者登录已经超时，请先登录！";
                    break;
                case 403:
                    message = "您没有权限操作！";
                    break;
                case 404:
                    message = `请求地址出错: ${error.response.config.url}`;
                    break;
                case 408:
                    message = "请求超时！";
                    break;
                case 409:
                    message = "系统已存在相同数据！";
                    break;
                case 500:
                    message = "服务器内部错误！";
                    break;
                case 501:
                    message = "服务未实现！";
                    break;
                case 502:
                    message = "网关错误！";
                    break;
                case 503:
                    message = "服务不可用！";
                    break;
                case 504:
                    message = "服务暂时无法访问，请稍后再试！";
                    break;
                case 505:
                    message = "HTTP 版本不受支持！";
                    break;
                default:
                    message = "异常问题，请联系管理员！";
                    break;
            }
        }
        ElMessage.error(error.response.status + "：" + message);
        return Promise.reject(error.response.status + "：" + message);
    }
);
export default serviceAxios;
