import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ViteRestart from "vite-plugin-restart";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ["vue", "vue-router"],
            dts: "src/auto-import.d.ts"
        }),
        Components({
            dirs: ["src/components"],
            resolvers: [ElementPlusResolver()]
        }),
        ViteRestart({
            restart: ["vite.config.ts"]
        }),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), "public/icons")], // icon存放的目录
            symbolId: "icon-[name]", // symbol的id
        })
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
});
