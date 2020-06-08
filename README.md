# Egret-Project-Toolkit

该项目提供了一系列为白鹭引擎项目准备的命令行工具。



## 如何构建

Egret-Project-Toolkit 是个 Monorepo 项目，使用微软提供的开源Monorepo管理器 [Rush](https://rushjs.io/) 进行管理。

```
npm install @microsoft/rush -g
git clone https://github.com/WanderWang/egret-project-toolkit.git
cd egret-project-toolkit
rush update
rush build
```


## 如何使用

Egret-Project-Toolkit 中提供了一个名为 test-egret-project 的项目，可以通过执行 ```egret build``` 执行该项目进行测试