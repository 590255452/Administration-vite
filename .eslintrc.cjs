require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
    root: true,
    "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript"
    ],
    parserOptions: {
        ecmaVersion: "latest"
    },
    rules: {
        semi: [2, 'always'],                              // 末尾加分号
        quotes: [2, 'double'],                            // 使用双引号字符串(single)
        indent: [2, 4],                                   // 缩进格式
        eqeqeq: [2, 'always'],                            // 使用全等符号
        camelcase: 1,                                     // 变量驼峰命名
        'vue/multi-word-component-names': 0,              // 组件驼峰命名
        'padded-blocks': 0,                               // 块语句内行首行尾是否要空行
        "object-curly-spacing": [2, 'always'],            // 花括号内有空格
        'no-multiple-empty-lines': [1, {'max': 2}],       // 最多空行
        'no-var': 2,                                      // 禁用var
        'max-len': [1, 180],                              // 代码最大长度
        'no-console': 1,                                  // 禁用console
        'no-unused-vars': 1,                              // 未使用的变量
        'no-alert': 1,                                    // 禁用alert
        'prefer-arrow-callback': 1,                       // 使用箭头函数
    }
};
