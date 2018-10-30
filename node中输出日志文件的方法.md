### node中输出日志文件的方法

通常我们在写Node.js程序时，都习惯使用console.log打印日志信息，但这也仅限于控制台输出，有时候我们需要将信息输出到日志文件中，实际上利用console也可以达到这个目的的，今天就来简单介绍一下。

我们首先创建如下文件：

```js
`// index.js` `let fs = require(``'fs'``);` `let options = {``  ``flags: ``'a'``,     ``// append模式``  ``encoding: ``'utf8'``,  ``// utf8编码``};` `let stdout = fs.createWriteStream(``'./stdout.log'``, options);``let stderr = fs.createWriteStream(``'./stderr.log'``, options);` `// 创建logger``let logger = ``new` `console.Console(stdout, stderr);` `for` `(let i = 0; i < 100; i++) {``  ``logger.log(`log message ${i}`);``  ``logger.error(`err message ${i}`);``}`
```

在上面代码中，我们其实是创建了一个console.Console类的实例，该类需要指定两个参数，即标准输出流和标准错误输出流，正常情况下，实际上是对应了process.stdout和process.stderr，以上的代码中，我们将这两个输出流改为了文件输出流，并指定为文件追加模式，这样即可将日志信息输出到指定的文件中去。运行上面的代码，会生成stdout.log和stderr.log两个文件。

stdout.log文件内容如下：

```cmd
`log message 0``log message 1``log message 2``log message 3``log message 4``log message 5``log message 6``log message 7``log message 8``log message 9``log message 10``...`
```

stderr.log文件内容如下：

```
`err message 0``err message 1``err message 2``err message 3``err message 4``err message 5``err message 6``err message 7``err message 8``err message 9``err message 10``...`
```

看上去信息还比较简单，不像是日志文件的样子，我们或许得为每条日志添加一个时间才行，下面先为Date对象添加一个format的原型方法：

```js
`// 添加format方法``Date.prototype.format = ``function` `(format) {` `  ``if` `(!format) {``    ``format = ``'yyyy-MM-dd HH:mm:ss'``;``  ``}``  ` `  ``// 用0补齐指定位数``  ``let padNum = ``function` `(value, digits) {``    ``return` `Array(digits - value.toString().length + 1).join(``'0'``) + value;``  ``};` `  ``// 指定格式字符``  ``let cfg = {``    ``yyyy: ``this``.getFullYear(),             ``// 年``    ``MM: padNum(``this``.getMonth() + 1, 2),        ``// 月``    ``dd: padNum(``this``.getDate(), 2),           ``// 日``    ``HH: padNum(``this``.getHours(), 2),          ``// 时``    ``mm: padNum(``this``.getMinutes(), 2),         ``// 分``    ``ss: padNum(``this``.getSeconds(), 2),         ``// 秒``    ``fff: padNum(``this``.getMilliseconds(), 3),      ``// 毫秒``  ``};` `  ``return` `format.replace(/([a-z]|[A-Z])(\1)*/ig, ``function` `(m) {``    ``return` `cfg[m];``  ``});``}`
```

然后再改写前面的主文件：

```
`// index.js` `let fs = require(``'fs'``);` `let options = {``  ``flags: ``'a'``,     ``// append模式``  ``encoding: ``'utf8'``,  ``// utf8编码``};` `let stdout = fs.createWriteStream(``'./stdout.log'``, options);``let stderr = fs.createWriteStream(``'./stderr.log'``, options);` `// 创建logger``let logger = ``new` `console.Console(stdout, stderr);` `// 添加format方法``Date.prototype.format = ``function` `(format) {` `  ``if` `(!format) {``    ``format = ``'yyyy-MM-dd HH:mm:ss'``;``  ``}``  ` `  ``// 用0补齐指定位数``  ``let padNum = ``function` `(value, digits) {``    ``return` `Array(digits - value.toString().length + 1).join(``'0'``) + value;``  ``};` `  ``// 指定格式字符``  ``let cfg = {``    ``yyyy: ``this``.getFullYear(),             ``// 年``    ``MM: padNum(``this``.getMonth() + 1, 2),        ``// 月``    ``dd: padNum(``this``.getDate(), 2),           ``// 日``    ``HH: padNum(``this``.getHours(), 2),          ``// 时``    ``mm: padNum(``this``.getMinutes(), 2),         ``// 分``    ``ss: padNum(``this``.getSeconds(), 2),         ``// 秒``    ``fff: padNum(``this``.getMilliseconds(), 3),      ``// 毫秒``  ``};` `  ``return` `format.replace(/([a-z]|[A-Z])(\1)*/ig, ``function` `(m) {``    ``return` `cfg[m];``  ``});``}` `for` `(let i = 0; i < 100; i++) {` `  ``let time = ``new` `Date().format(``'yyyy-MM-dd HH:mm:ss.fff'``);` `  ``logger.log(`[${time}] - log message ${i}`);``  ``logger.error(`[${time}] - err message ${i}`);``}`
```

重新运行程序，然后查看两个日志文件的内容。

stdout.log内容如下：

```cmd
`[2018-04-27 07:30:54.309] - log message 0``[2018-04-27 07:30:54.312] - log message 1``[2018-04-27 07:30:54.312] - log message 2``[2018-04-27 07:30:54.312] - log message 3``[2018-04-27 07:30:54.312] - log message 4``[2018-04-27 07:30:54.312] - log message 5``[2018-04-27 07:30:54.312] - log message 6``[2018-04-27 07:30:54.312] - log message 7``[2018-04-27 07:30:54.312] - log message 8``[2018-04-27 07:30:54.312] - log message 9``[2018-04-27 07:30:54.312] - log message 10``...`
```

stderr.log内容如下：

```cmd
`[2018-04-27 07:30:54.309] - err message 0``[2018-04-27 07:30:54.312] - err message 1``[2018-04-27 07:30:54.312] - err message 2``[2018-04-27 07:30:54.312] - err message 3``[2018-04-27 07:30:54.312] - err message 4``[2018-04-27 07:30:54.312] - err message 5``[2018-04-27 07:30:54.312] - err message 6``[2018-04-27 07:30:54.312] - err message 7``[2018-04-27 07:30:54.312] - err message 8``[2018-04-27 07:30:54.312] - err message 9``[2018-04-27 07:30:54.312] - err message 10``...`
```

这样一个简单的日志输出就完成了。

参考资料：<https://nodejs.org/api/console.html>

日志处理：https://www.jb51.net/article/91414.htm