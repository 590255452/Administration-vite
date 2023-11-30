const form: FormData = new FormData();
//添加
form.append("username", "wang");
form.append("password", "1q2q3q4q");
form.append("username", "liu");
form.append("password", "123456");

const formDataObject = {};
for (const [key, value] of form.entries()) {
    if (!formDataObject[key]) {
        formDataObject[key] = value;
    } else {
        if (!Array.isArray(formDataObject[key])) {
            formDataObject[key] = [formDataObject[key]];
        }
        formDataObject[key].push(value);
    }
}

// 使用 console.table 打印对象
console.table(formDataObject);

// //获取
// const username: FormDataEntryValue[] = form.getAll("username");
// const password: FormDataEntryValue = form.get("password");
//
// //修改
// form.set("password", "123456");
// console.log(form.get("password"));
//
// //删除
// // form.delete("password");
//
//
// //包含
// console.log(form.has("username"));
