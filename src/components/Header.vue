<script setup lang="ts">
import { ref } from "vue";
import SvgIcon from "@/plugin/SvgIcon.vue";
import { useMenuStore } from "@/stores/menuStore.ts";
import { useUserStore } from "@/stores/userStore.ts";

const menuStore = useMenuStore();
const userStore = useUserStore();
console.log(userStore?.user.color);
const isHover = ref(false);
const isShow = ref(false);
const divBlur = () => {
    isShow.value = false;
};

const logOut = () => {
    localStorage.clear();
    location.reload();
};
</script>

<template>
    <div class="flex items-center justify-between py-3 px-8 border-b border-gray-300">
        <div
            class="p-3 border border-gray-150 rounded-full cursor-pointer"
            @click="menuStore.isCollapse = !menuStore.isCollapse">
            <svg-icon
                :name="menuStore.isCollapse ? 'header-off' : 'header-on'"
                color="#7F8C9B"
                iconStyle="height: 15px;width: 15px" />
        </div>
        <div>
            <p class="font-NotoSerifSC-Regular text-2xl select-none">VUE后台管理</p>
        </div>
        <div class="flex flex-row-reverse gap-3 items-center">
            <div
                hidefocus="true"
                tabIndex="-1"
                @blur="divBlur">
                <el-avatar
                    @click="isShow = !isShow"
                    class="border rounded-full border-gray-200 select-none cursor-pointer"
                    :style="`background-color: ${userStore?.user.color}`">
                    <span>{{ userStore?.user.username.charAt(0).toUpperCase() || "ME" }}</span>
                </el-avatar>
<!--                <el-avatar-->
<!--                    @click="isShow = !isShow"-->
<!--                    class="border rounded-full border-gray-200 select-none cursor-pointer"-->
<!--                    src="/images/Fenke.jpg" />-->

                <transition name="run">
                    <span
                        class="fixed w-[200px] p-2 shadow-lg border border-gray-200 z-50 rounded-lg top-[65px] right-8 bg-white select-none"
                        v-show="isShow">
                        <ul class="font-normal text-[14px] text-gray-600">
                            <li class="px-3 py-2.5 rounded-lg hover:bg-[#F2F3F6] flex items-center cursor-pointer">
                                <button>个人中心</button>
                            </li>
                            <div class="border-[1px] border-gray-100 my-2"></div>
                            <li class="px-3 py-2.5 rounded-lg hover:bg-[#F2F3F6] flex items-center cursor-pointer">
                                <button @click="logOut">退出</button>
                            </li>
                        </ul>
                    </span>
                </transition>
            </div>
            <div
                class="p-3 rounded-full cursor-pointer hover:bg-[#EAF2FF]"
                @mouseenter="isHover = true"
                @mouseleave="isHover = false">
                <svg-icon
                    name="header-more"
                    :color="isHover ? '#377DFF' : '#7F8C9B'"
                    iconStyle="height: 20px;width: 20px" />
            </div>
            <div
                class="p-3 rounded-full cursor-pointer hover:bg-[#EAF2FF]"
                @mouseenter="isHover = true"
                @mouseleave="isHover = false">
                <svg-icon
                    name="header-notice"
                    :color="isHover ? '#377DFF' : '#7F8C9B'"
                    iconStyle="height: 20px;width: 20px" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
// 元素开始进入的状态 | 元素离开结束的状态
.run-enter-from,
.run-leave-to {
    opacity: 0;
}

// 元素进入结束的状态 ｜ 元素开始离开的状态。 这里不写也可以！！！！！！
.run-enter-to,
.run-leave-from {
    opacity: 1;
}

// 元素进入 ｜ 结束时，过渡的效果
.run-enter-active,
.run-leave-active {
    // 过渡动画的使用
    transition: opacity 0.1s ease-in-out;
}
</style>
