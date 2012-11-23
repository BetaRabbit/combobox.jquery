RequireJS
=========

RequireJS是一个JavaScript文件和模块加载器。除了可以在浏览器中使用外，还可以用Node或Rhino等Server端环境。

最新版可以在[这里](http://requirejs.org/docs/download.html)下载。

基本用法
-----
假设你的工程目录结构如下：

- project
    - index.html
    - js
        - lib
            - jquery.js
        - app
            - sub_app.js
        - app.js

首先，将`requirejs.js`放入`js/lib`目录。

- project
    - index.html
    - js
        - lib
            - jquery.js
            - require.js
        - app
            - sub_app.js
            - app.js

然后，在`index.html`中引入`<script>`tag用来加载`require.js`。

    <script data-main="js/app" src="js/lib/require.js"></script>

在`app.js`中，使用`require`方法加载其他脚本

```js
requirejs.config({
    // 默认从js/lib目录加载
    baseUrl: 'js/lib',
    // 如果模块ID以app开头，则从js/app目录加载
    // paths相对于baseUrl设定
    // 不要指定".js"后缀，因为paths可以是一个目录
    paths: {
        app: '../app',
        jquery: 'jquery.min',
    }
});

// app入口
require(['app/sub_app'], function (sub) {
    sub.hello();
});
```

在`sub_app.js`中定义一个module

```js
// define相对于baseUrl设定
define(['jquery'], function ($) {
    return {
        log: function (msg) {
            if (window.console && console.log) {
                console.log(msg);
            } else {
                alert(msg);
            }
        },
        hello: function () {
            this.log("hello, I'm powered by jQuery " + $().jquery + "!");
        }
    };
});
```