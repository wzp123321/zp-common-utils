import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [vue()],
  // 打包配置
  build: {
    // 设置最终构建的浏览器兼容目标。
    target: ['es2020'],
    lib: {
      // 入口
      entry: './src/index.ts',
      name: 'ZpCommonUtils',
      formats: ['es', 'cjs', 'umd'],
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
          vue: 'ZpCommonUtils',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue'],
  },
});
