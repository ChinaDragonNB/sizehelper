# 简介

sizehelper，尺码助手，用于记录服装的尺码信息参数

# 背景

我以前买服饰的时候都是买L码，但有些店铺的L码尺寸参数有所不同，比如A店商品XXX，L码衣长60，B店商品XXX，L码衣长55（可以上某宝搜索下T恤，看看有多少家在卖同样的东西），
相差5CM，但穿着体验却大有不同，自从遇到过这种事后，我买服饰前都会先看看以前购买到的合身服饰的尺码参数，但手机APP买东西不能像浏览器那样
有多标签页，切换来切换去还是太麻烦，所以开发出了此应用，边看电脑的服饰参数，边看手机的进行对照，觉得合适再购买。

# 技术使用

* Node
* Vue
* Ant-Design-Vue
* Electron
* IndexedDB

# 技术说明

1. 数据库

此应用为单机版应用，不需要联网，而electron内置一个浏览器，故此可以使用IndexedDB作为数据存储

2. 封装IndexedDB API

封装的API在 `src/indexedDB/index.js`文件中可查看，需要注意的是`tableNames`属性值，该值存储了本应用所涉及到的表名，会在
第一次打开数据库时创建他们（一个一个创建会出错，我前端技术不行，也不知道为什么）。

3. 图片上传

由于我是后端开发，对于将文件上传到服务器中我很熟，但没做过这种单机版的VUE应用，所以在上传的图片的时候将图片转成了Base64进行存储。

# 运行

```bash
1. git clone https://github.com/ChinaDragonNB/sizehelper.git
2. cd sizehelper
3. npm install
4. npm run electron:sreve
```

# 打包

```bash
npm run electron:build
```

