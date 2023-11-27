<script setup lang="ts">
import { RouterView } from "vue-router";
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
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
    </div>
</template>
