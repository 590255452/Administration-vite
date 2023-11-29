<template>
    <p></p>
    <button @click="fun">点击</button>
</template>
<script lang="ts" setup>
const form: FormData = new FormData();

//添加
form.append("username", "wang");
form.append("username", "liu");
form.append("password", "1q2q3q4q");


//遍历
const keys = form.keys();
const values = form.values();

const fun = () => {
    // for (let [key, value] of form.entries()) {
    //     console.log(key + "：" + value);
    // }
    
};


</script>
