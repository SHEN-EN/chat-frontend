import { defineConfig} from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
export default defineConfig({
    server:{
        proxy: {
            '^/v1': {
              target: 'http://127.0.0.1:3000',
              changeOrigin: true,
            },
          },
    },
  plugins: [vue(), electron({
      // 配置 Electron 入口文件
      entry: "electron/index.ts"
  })],
  resolve:{
    alias:{
        '@':path.resolve(__dirname,'./src')
    }
  }
})