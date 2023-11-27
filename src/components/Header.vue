`
<script setup lang="ts">
import SvgIcon from "@/plugin/SvgIcon.vue";</script>

<template>
    <div class="flex items-center justify-between">
        <div class="p-3 border border-gray-150 rounded-full">
            <svg-icon name="menu-fold-line" iconStyle="height: 20px;width: 20px" />
        </div>
        <div>
            <p>VUE后台管理</p>
        </div>
        <div class="flex flex-row-reverse gap-3">
            <el-avatar
                src="/images/Fenke.jpg"
            />
            <svg-icon name="a-b" iconStyle="height: 30px;width: 30px" />
            <svg-icon name="notification-2-line" iconStyle="height: 30px;width: 30px" />
        </div>
    </div>
</template>

<style scoped></style>
`
