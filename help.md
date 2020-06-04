## Examiner密钥验证系统



### 支持功能

- **批量生成密钥**
> 一次性支持生成数量：1 ~ 1000
- **上传Excel进行验证**
> 支持选择路径上传和拖拽上传
- **查看验证历史**
> 进入验证统计页面。支持自定义数据导出、删除
- **查看未验证密钥**
> 进入验证统计页面，点击未验证密钥。支持自定义数据导出、删除
- **单个密钥验证/检测**
> 可以验证或检测单个密钥。注意：验证单个密钥时会消耗该密钥，而检测单个密钥不会消耗密钥
- **密钥颜色区分**
> 蓝色：未验证； 绿色：通过验证； 黄色：已验证过；红色：密钥不存在

---

### 导入Excel格式要求

本系统会读取导入Excel表格中的四列信息，分别是：
- 姓名
- 系统id
- 解黑券码
- 问卷提交时间

导入的Excel必须符合以下格式：**至少包含四列，每列的首行单元格中的文字分别包含上述四个字符串。**

比如某一列是用户的姓名，这一列第一行单元格可以命名为 “您的姓名” 、“输入的姓名” 等等，只要包含 “姓名” 就可以。其他三个相同。

---


### 密钥会不会重复

密钥重复的几率为36的32次方分之一，如果不放心的话可以拿计算器按一按看这个几率是多大。因此，完全不用担心之前的密钥不用了但没有删除之类的问题，因为是不可能重复的。

### 数据本地存储路径
```bash
C:\Users\你的用户名\AppData\Roaming\examiner\config.json
```
就像游戏的存档一样，该路径下的文件非常重要，删除这个软件数据并不会丢失，但若删除或移动了上述文件那就没了。需要将数据导出为excel的话在软件内操作。另外请完全不要管这个文件，除非换电脑或者格式化C盘。

### 换电脑

这个系统不是联网的，要是非要换电脑那数据不可能跟着exe安装包过去。如果换电脑了，需要将上面路径的文件迁移到新电脑的相同路径。如果遇到问题到时候再联系我。








