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
    // target: ['modules', 'commonJS'],
    lib: {
      // 入口
      entry: './src/index.ts',
      name: 'ZpCommonUtils',
      formats: ['es', 'cjs', 'umd'],
      fileName: 'zp-common-utils',
    },
    outDir: 'lib',
    sourcemap: false,
    rollupOptions: {
      external: ['spark-md5'],
    },
  },
  optimizeDeps: {
    exclude: ['vue', 'spark-md5'],
  },
});