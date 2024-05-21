<p align="center">
一个Vue工具库，收集了一些用于日常开发工具方法
</p>

## 🦄 维护

```ts
// 安装依赖
pnpm install
// 启动
pnpm dev
// 打包&esno 执行update脚本更新版本，如果打包报错，可能是你没有全局安装esno，可npm i esno -g进行全局安装
npm run build
```

<p >
如果你愿意一起维护，可以联系我，谢谢！
</p>

## 📦 Install

```bash
npm i zp-common-utils
```

## 📦 使用

```ts
import { thousandSeparation, convertNumberToAmountInWords } from 'zp-common-utils';

export default {
  setup() {
    thousandSeparation(123213213);
    convertNumberToAmountInWords(1232132);
  },
};
```

## 🚀 待开发

- 实现自动生成文档功能
- 通过指令实现一键发布功能
- 集成 eslint、stylelint、prettier、commitlint、husky、lint-staged 等工具-----https://juejin.cn/post/7118294114734440455

## 🚀 更新日志

##### 2024-05-20

- 新增 vue 过滤指令开发
- 学习使用 esno 执行 ts 脚本
- 新增自动更新版本号脚本，实现打包版本自动更新，新增 npm run update 命令

##### 2024-05-18

- 新增加密解密工具方法
- 修改 package.json 配置文件，实现工具库安装后 typescript 类型提示功能

##### 2024-05-15

- 新增多个工具方法

##### 2024-05-10

- 安装并配置 vite-plugin-dts 插件实现自动生成.d.ts 类型声明文件

##### 2024-05-07

- 创建功能，补充打包配置
