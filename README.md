# Calendar

####原生 javascript 编写的日历组件
![截图](http://waterbearblog.sinaapp.com/2015/calendar.png "")

**支持浏览器**
* Chrome 29+
* Firefox 28+
* opera 17+
* IE 10+

<br/>

**使用说明**

 * 将 `public/css/calendar.css` 和 `public/css/calendar.js` 引入项目中。
 
 *   在 `html` 文件 中添加如下代码
 
```html

    <div id="calendar" ><div>
    
```




*  初始化日历

```

    var callback = function(date) {
        //doSomething
    }    
    // 点击某个日期后会执行回调函数
    Calendar.init('calendar', new Date(), callback); 

```
<br/>

**Todo**
* IE 10+ 上日期面板不能撑满剩下的高度
* 移动设备的适配
