<script lang="ts" setup>
import menuList from "@/plugin/menuList.json";
import SvgIcon from "@/plugin/SvgIcon.vue";
import { useMenuStore } from "@/stores/menuStore.ts";

const menuStore = useMenuStore();

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};

const defaultActive = ref(JSON.parse(localStorage.getItem("menu"))?.menuPath || "/");    // localStorage｜sessionStorage存储的是json数据

const test = () => {
    console.log(JSON.parse(localStorage.getItem("menu")).menuPath);
}
</script>

<template>
    <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo select-none"
        @open="handleOpen"
        @close="handleClose"
        style="height: 100%"
        :collapse="menuStore.isCollapse"
        router>
        <button @click="test">测试</button>
        <template
            v-for="item in menuList"
            :key="item.id">
            <template v-if="item.children">
                <el-sub-menu :index="item.id">
                    <template #title>
                        <el-icon>
                            <svg-icon
                                :name="`menu-${item.icon}`"
                                iconStyle="height: 20px;width: 20px" />
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item
                        :index="itemChild.path"
                        v-for="itemChild in item.children"
                        :key="itemChild.id"
                        @click="menuStore.menuPath = itemChild.path">
                        <el-icon>
                            <svg-icon
                                :name="`menu-${itemChild.icon}`"
                                iconStyle="height: 20px;width: 20px" />
                        </el-icon>
                        <span>{{ itemChild.title }}</span>
                    </el-menu-item>
                </el-sub-menu>
            </template>
            <template v-else>
                <el-menu-item
                    :index="item.path"
                    @click="menuStore.menuPath = item.path">
                    <el-icon>
                        <svg-icon
                            :name="`menu-${item.icon}`"
                            iconStyle="height: 20px;width: 20px" />
                    </el-icon>
                    <span>{{ item.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
}
</style>
