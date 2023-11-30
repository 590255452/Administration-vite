// const Koa = require("koa");
// const KoaRouter = require("koa-router");
// const BodyParser = require("koa-bodyparser");
// const cors = require("koa2-cors");
// const Mock = require("mockjs");
// const qs = require("qs");

import Koa from "koa";
import KoaRouter from "koa-router";
import BodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import Mock from "mockjs";
import qs from "qs";

const app = new Koa();
const router = new KoaRouter();
const Random = Mock.Random;

app.use(BodyParser()).use(router.routes()).use(router.allowedMethods()).use(cors());

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
        capImage: "",
        color: "#000000"
    }
};
let verification: string = "";

//用户信息
const user: FormData = new FormData();
user.append("username", "wangluqi");
user.append("password", "1q2q3q4q");

//判断逻辑
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
router.get("/capImage", (ctx: any) => {
    // ctx.set("Access-Control-Allow-Origin", "*");
    Mock.mock(() => {
        verification = Mock.mock(/\w{4}/);
        Result.data.capImage = Random.dataImage("120x40", verification);
    });
    return Result;
});

//请求登录
router.post("/login", (data: any): void => {
    Mock.mock(() => {
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
            Result.data.username = obj.username;
            Result.data.password = obj.password;
            Result.msg = "登录成功";
            Result.code = 200;
            Result.data.token = Random.string(32);
        }
        return Result;
    });
});

//请求注册
router.post("/register", (data: any) => {
    Mock.mock(() => {
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
            Result.data.color = Random.color();
            Result.msg = "注册成功";
            Result.code = 200;
            Result.data.token = "";
        }
        return Result;
    });
});

app.listen(3000, () => console.log("Server is running at http://localhost:3000"));
