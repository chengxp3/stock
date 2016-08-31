#Stock APP

### `股市选股 Web App`
#### `股市选股 Web App 技术栈 : Express.js + MySql + Vue.js ，使用tushare Python脚本抓取数据`

### set up
#### `npm install`

### run base dev
#### `npm run start`

### run server build
#### `npm run build-server`

### run app dev
#### `npm run build-app`

### run all build
#### `npm run build`

### 目录结构

```
.
├── README.md           
├── webpack.config.js        // 前端Vue配置文件
├── conf                     // 前端Vue配置目录
├── build                    // server编译目录
├── dist                     // 前端打包目录
├── src                      // 前端生产目录
     ├── css                 // css目录
        ├── app.css          // 主css
        └── base.css         // 基础css

│    └── app.vue             // Vue主组件
└── server                   // server生产目录
     ├── python              // python脚本目录
          └── shell.py       // tushare python脚本
     ├── consts.js           // 域名白名单&常量定义
     ├── controller.js       // controller文件
     ├── index.js            // server入口文件
     ├── routerConf.js       // server路由配置文件
     ├── routers.js          // server路由文件
     └── utils.js            // 工具文件
.
```

## online
### 暂无

##base-dev
MIT
