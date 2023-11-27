<script setup lang="ts">
import { RouterView } from "vue-router";
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";</script>

<template>
    <el-container>
        <el-aside width="auto">
            <Menu />
        </el-aside>
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped lang="less">
.el-container {
    height: 100vh;
}

.el-header {
    padding: 0;
    margin: 0;
}
</style>
