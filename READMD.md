# Calendar

####原生 javascript 编写的日历组件
![截图](http://waterbearblog.sinaapp.com/2015/calendar.png "")

**使用说明**

 * 将 `public/css/calendar.css` 和 `public/css/calendar.js` 引入项目中。
 
 *   在 `html` 文件 中添加如下代码
 
```html

    <div id="calendar" ><div>
    
```


*  初始化日历

```javascript

    var callback = function(date) {
        //doSomething
    }    

    Calendar.init('calendar', new Date(), callback);

```

