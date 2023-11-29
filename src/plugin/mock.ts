import Mock from "mockjs";
import qs from "qs";

const Random = Mock.Random;

//返回信息
interface ContainerProps {
    code: number;
    msg: string;
    data: any;
}

const Result: ContainerProps = <ContainerProps>{
    code: 200,
    msg: "操作成功",
    data: {
        token: "",
        capImage: ""
    }
};
let verification: string = "";

//用户信息
const user: FormData = new FormData();
user.append("username", "wangluqi");
user.append("password", "1q2q3q4q");

const isAuthenticated = (username: string, password: string): boolean => {
    let hasUsername: boolean = false;
    let hasPassword: boolean = false;
    for (const value of user.getAll("username")) {
        if (value === username) {
            hasUsername = true;
        }
    }
    for (const value of user.getAll("password")) {
        if (value === password) {
            hasPassword = true;
        }
    }
    return hasUsername && hasPassword;
};

const hasUsername = (username: string): boolean => {
    for (const value of user.getAll("username")) {
        if (value === username) {
            return true;
        }
    }
    return false;
};

//请求验证码
Mock.mock("/capImage", "get", () => {
    verification = Mock.mock(/\w{4}/);
    Result.data.capImage = Random.dataImage("120x40", verification);
    return Result;
});

//请求登录
Mock.mock("/login", "post", (data: any) => {
    const obj = qs.parse(data.body);
    if (obj.verify !== verification.toLowerCase()) {
        Result.msg = "验证码有误！";
        Result.code = 403;
        Result.data.token = "";
    } else if (!isAuthenticated(obj.username, obj.password)) {
        Result.msg = "账号或密码输入错误！";
        Result.code = 403;
        Result.data.token = "";
    } else {
        Result.msg = "登录成功";
        Result.code = 200;
        Result.data.token = Random.string(32);
    }
    return Result;
});

//请求注册数据
Mock.mock("/register", "post", (data: any) => {
    const obj = qs.parse(data.body);
    if (obj.verify !== verification.toLowerCase()) {
        Result.msg = "验证码有误！";
        Result.code = 403;
        Result.data.token = "";
    } else if (hasUsername(obj.username)) {
        Result.msg = "账号已存在，请返回登录！";
        Result.code = 403;
        Result.data.token = "";
    } else {
        user.append("username", obj.username);
        user.append("password", obj.password);
        Result.msg = "注册成功";
        Result.code = 200;
        Result.data.token = "";
    }
    return Result;
});
