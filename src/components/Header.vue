<script setup lang="ts">
import { ref } from "vue";
import SvgIcon from "@/plugin/SvgIcon.vue";
import { useMenuStore } from "@/stores/menu.ts";
const menuStore = useMenuStore();

const isHover = ref(false);
</script>

<template>
    <div class="flex items-center justify-between p-3 border-b border-gray-300">
        <div class="p-3 border border-gray-150 rounded-full cursor-pointer" @click="menuStore.isCollapse = !menuStore.isCollapse">
            <svg-icon :name="menuStore.isCollapse ? 'header-off': 'header-on'" color="#7F8C9B" iconStyle="height: 15px;width: 15px" />
        </div>
        <div>
            <p class="font-NotoSerifSC-Regular text-2xl select-none">VUE后台管理</p>
        </div>
        <div class="flex flex-row-reverse gap-3 items-center">
            <el-avatar
                class="border rounded-full border-gray-200 select-none cursor-pointer"
                src="/images/Fenke.jpg"
            />
            <div class="p-3 rounded-full cursor-pointer hover:bg-[#EAF2FF]" @mouseenter="isHover = true" @mouseleave="isHover = false">
                <svg-icon name="header-more" :color="isHover ? '#377DFF': '#7F8C9B'" iconStyle="height: 20px;width: 20px" />
            </div>
            <div class="p-3 rounded-full cursor-pointer hover:bg-[#EAF2FF]" @mouseenter="isHover = true" @mouseleave="isHover = false">
                <svg-icon name="header-notice" :color="isHover ? '#377DFF': '#7F8C9B'" iconStyle="height: 20px;width: 20px" />
            </div>
        </div>
    </div>
</template>
