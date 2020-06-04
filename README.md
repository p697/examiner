## 基于electron的密钥验证系统

#### 开发

> 需要电脑有nodejs环境，没有的话需要先安装nodejs

```
// cd到项目路径，依次输入以下指令：
npm install
npm start (输入这个之后新建或者拆分一个终端)
npm run electron-start
```



#### 部分约定语义

- 'check' ： 验证密钥（会消耗密钥）
- 'test' ： 检测密钥（不消耗密钥）
- 'freshKey' ： 已经生成了但未消耗的密钥
- 'finishKey' : 已经消耗了的密钥

#### finishKey结构

```
{
    key: '',  // 已经完成验证的密钥
    checkTime: '',  // 验证时间
    name: '',  // 问卷星上的姓名
    sysId: '',  // 问卷星上的系统id
    submitTime: '',  // 问卷星上的提交时间
}
```







