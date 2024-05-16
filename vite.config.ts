import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
// 配置参考vueuse
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [
    vue(),
    // 生成ts声明文件
    dts({
      include: './src',
    }),
  ],
  // 打包配置
  build: {
    // 设置最终构建的浏览器兼容目标。
    target: ['es2020'],
    // 构建为库
    lib: {
      // 作为入口
      entry: './src/index.ts',
      // 暴露的全局变量
      name: 'ZpCommonUtils',
      formats: ['es', 'cjs', 'umd'],
      // 输出的包文件名
      fileName: 'zp-common-utils',
    },
    //
    outDir: 'lib',
    sourcemap: false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue'],
  },
});
