import Mock from "mockjs";
import qs from "qs";

const Random = Mock.Random;
interface ContainerProps {
    code: number;
    msg: string;
    data: any;
}

const Result = <ContainerProps>{
    code: 200,
    msg: "操作成功",
    data: {
        token: "",
        capImage: ""
    }
};
let verification = "";
const user = {
    username: "wangluqi",
    password: "1q2q3q4q"
};

//生成验证码
Mock.mock("/capImage", "get", () => {
    verification = Mock.mock(/\w{4}/);
    Result.data.capImage = Random.dataImage("120x40", verification);
    return Result;
});

//登录数据
Mock.mock("/login", "post", (data: any) => {
    const obj = qs.parse(data.body);
    if (obj.verify !== verification.toLowerCase()) {
        Result.msg = "验证码有误！";
        Result.code = 403;
        Result.data.token = "";
    } else if (obj.username !== user.username || obj.password !== user.password) {
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
