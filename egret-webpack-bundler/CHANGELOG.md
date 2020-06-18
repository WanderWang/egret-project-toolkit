# Change Log - @egret/egret-webpack-bundler

This log was last generated on Thu, 18 Jun 2020 03:16:26 GMT and should not be manually modified.

## 1.1.6
Thu, 18 Jun 2020 03:16:26 GMT

### Patches

- update docs

## 1.1.5
Wed, 17 Jun 2020 07:07:35 GMT

### Patches

- 支持直接使用webpack调用

## 1.1.4
Wed, 17 Jun 2020 06:47:26 GMT

### Patches

- 添加tslib,降低编译尺寸

## 1.1.2
Tue, 16 Jun 2020 06:53:28 GMT

### Patches

- 添加 subpackages 功能

## 1.1.1
Tue, 09 Jun 2020 10:09:34 GMT

### Patches

- 修复排序模块不正常工作的问题

## 1.1.0
Tue, 09 Jun 2020 08:03:17 GMT

### Minor changes

- 添加 exml-loader
- 添加 srcLoader

### Patches

- 添加 exml-loader
- 添加依赖机制
- 向下兼容不引入exml.watch
- 添加 legacy 模式

## 1.0.8
Wed, 03 Jun 2020 08:56:49 GMT

### Patches

- bundler发布代码不再使用 UglifyJS

## 1.0.7
Wed, 03 Jun 2020 08:04:29 GMT

### Patches

- 解决 DevServer Manifest.json 生成错误的问题

## 1.0.6
Wed, 03 Jun 2020 07:52:14 GMT

### Patches

- 修复manifest.json的一些问题

## 1.0.5
Wed, 03 Jun 2020 06:25:40 GMT

### Patches

- 修复 bundle 不应生成 sourcemap 的问题
- 输出文件名修改为 main.js

## 1.0.4
Wed, 03 Jun 2020 05:50:11 GMT

### Patches

- 整合egret的发布libs功能
- 改进对外API

## 1.0.3
Tue, 02 Jun 2020 08:17:59 GMT

### Patches

- startDevServer 会自动打开浏览器

## 1.0.2
Sun, 31 May 2020 13:52:51 GMT

### Patches

- 重构 build 函数，允许自定义 emitter 以便整合egret构建管线

## 1.0.1
Sun, 31 May 2020 13:11:52 GMT

### Patches

- 初始提交，封装 webpack

