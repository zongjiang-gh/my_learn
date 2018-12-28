## SDK

### 1.使用的技术

- typescript + webpack + react 

  typescript,：https://ts.xcatliu.com/basics/primitive-data-types.html

  react-webpack-typescript：https://www.tslang.cn/docs/handbook/react-&-webpack.html

  react-router-dom: https://reacttraining.com/react-router/core/guides/philosophy

- 原生js的一些API，如：Object.assign();将参数中的对象合并为一个对象

  API查询网址：http://devdocs.io/

- ployfill库和vconsole库

  ployfill库用来打补丁兼容一些方法：https://polyfill.io/v2/docs/examples

  vconsole主要是移动端输出调试： https://www.qianduan.net/vconsole-open-source/

- 使用的SDK有facebook的sdk：https://developers.facebook.com/docs/javascript/reference/v2.8，主要用于facebook的登录和其他一些问题

- 使用google的API，主要用来登录和打点：https://developers.google.com/gtagjs/?hl=zh-cn

- 测试时可以输入的appId等：http://localhost:7000/?appId=10120&advChannel=30001

- material-ui谷歌的UI库具体可以看：https://material-ui.com/getting-started/usage/

- resetcss的库是https://github.com/kossnocorp/reset.css

- Crypto-JS 库主要是为了使用加密，https://blog.zhengxianjun.com/2015/05/javascript-crypto-js/

### 2.文件

1. package.json文件主要使用脚本  dev：http协议，devs使用https协议。@type/xxx主要是用来在TypeScript中提示；crypto-js包主要是和md5配合进行加密解密的；@material-ui是google的一个关于react的ui素材库

2. webpack.config.js主要是一些webpack配置，definePlugin是用来替换文件中的这些关键字，在tsconfig.json中也有定义，主要是为了防止编译报错

3. tsconfig.json主要是用来做一些typescript的解析规则

4. postcss.config.js主要是用来做兼容给css添加自动前缀的

5. index.html文件中主要是用来做测试假设一些参数，和用作react的挂载页面

6. index.d.ts文件主要是用来定义几乎所有的变量和声明接口等

   interface主要约束类型无实际意义，declare

   - ~~~typescript
     /// <reference path="./node_modules/@types/react/index.d.ts" />
     /// <reference path="./node_modules/@types/history/index.d.ts" />
     //主要是用来引入额外的文件
     ~~~

   - RG将来要暴露的接口文件，他的方法主要都是全局挂载的SDK上的方法，在Base.ts文件中，也利用不同的平台的sdk的支付和install方法，install主要是用来解决登录https与支付接口http的问题。

   - declare 用来声明文件 声明window中有这些方法或属性

   - NativeToJs原生唤起web端的接口（须有一定的混合式开发经验）

   - initSDKParams 初始化SDK需要携带的数据

   - JsToNativeDeviceMsg：页面端到原生需要的设备信息数据

   - JsToNative：页面到原生可调用的方法

   - CryptoJS：crypto-js库暴露的接口，简化加密解密

   - HTMLElement：主要确保有这么两个函数用来对元素显示隐藏

   - 时间值有一个format方法，在Utils中的格式化时间的函数在Date的原型上

   - PREFIX，在webpack中解析时替换的变量，主要是为了tsc解析不报错

   - CONFIG主要是配置对象，主要使用config.ts文件中的信息

   - AvialableIp有效的IP，未发现使用

   - declare var 定义一些变量以在全局使用它们

   - type主要是用作定义联合类型，SDKs主要实在Base.ts文件中引入自定义的一些sdk文件的一种

   - ~~~typescript
     interface RoyalGames {//定义sdk接口的属性的类型
       RoyalGames//属性：属性值类型any
       Login()//方法：返回值类型any
     }//不允许少写一个方法和属性
     ~~~

   - FinishOrderParams ，完成订单的参数

   - base0，就是Base文件中类中的属性和方法的类型

   - namespace主要是用来供一个命名空间，

   - FBInstant，是使用facebookInstantGame的接口的sdk但现在未使用，后面可能会编写

   - 定义RG中命名空间，主要是为了防止FBWeb中的支付时的参数和其他的冲突

   - OrderRes订单的返回的值

   - OrderingData，开始订单后需的数据

   - SDK。即Base文件

   - Product产品（游戏）的类型

   - PlatformLoginParam平台登录参数

7. config文件主要是一些游戏的数据

8. Base.ts文件是核心文件，它在执行时自动new了自己，完成了程序的初始

   1. 从new 将实例挂载在window的SDK上并实现了很多的方法（如获取用户的信息，支付啊这些），在到执行Polyfill.instance.init()中的为方法实现打补丁，它的地址有一个callback，当他加载完成时会自动调用SDK.polyfilled()来实现初始化；

      当不需要补丁时直接初始化，使用模块是polyfill.ts

   2. 然后执行初始化的代码，先获取debugger，并初始化它，以便于调试；再获取游戏的配置文件，使用的文件是config.ts和DOM中的 i18n.ts文件

   3. 当这些文件都加载完成后，并且这些文件中获取了正确的配置后，将配置都挂载在SDK上。

   4. 完成后加载facebook的js的sdk和加载自己的这几种SDK根据地址上参数advChannel的值来加载，并执行自己的ExposeApis方法来将一些SDK上的方法和自己的方法挂载到RG上，并执行Mark的init方法，（使用模块：一个平台的sdk和mark.ts）初始化打点，

   5. 以上都加载完成后执行sdk加载完成打点操作，并执行sdk的login方法（如：RoyalGame.ts的login（）方法）

   6. 地址值中传递了用户信息过来，则直接登录否则看一下localStorage中有没有，有直接登录，没有的就执行弹出登录界面的逻辑（逻辑较为复杂，有dom中的还有base中的方法，流程较长，变量多）

   7. 执行完成后就开始执行DOM的页面绘制等，看路由跳转，后面全是一些业务逻辑，主要用来测试，路由中的MemoryRouter主要是将路径等信息储存在本地的历史记录中。

9. Base中的Accounts.ts主要是从localStorage中来设置和获取userInfo，还有删除当前用户，修改密码的逻辑

10. Base中的Api.ts中主要是进行绑定区服的操作，需要将一些参数连接成字符串，md5加密后使用（方法是Utils.ts中的signed）

11. Base中的Constant.ts中主要是一些要用的参数，localStorage中的key值，和修改密码的路由，和绑定区服的路由，还有是支付用的路由，绑定游客的路由

12. Http.ts中主要是用于请求的发送，可以发get和post请求

13. Mark文件主要是打点

14. Share文件是利用fb的sdk接口来做分享

15. payment支付的一些方法，挂载在sdk上和rg上使用

16. 在src下的ts这些文件是最终将接口暴露出去的文件，现在使用的主要是有三种，facebookWebGames.ts，NativeGame.ts，和RoyalGames.ts，将要使用的是facebookInstantGame.ts,主要是要暴露的是支付这些接口，能使用Base中的方法就使用，如不能使用怎重新写一个方法来使用

##### 原生支付方法

1. 主要是在支付的时候,要将https的协议改为http协议
2. 支付的方式也是不一样的

混合开发 Electron,

### 3.sdk中的整体的结构

sdk中主要是将一些公共的平台的接口整合起来，形成一个平台来供游戏的研发来进行整合在游戏中以便于对支付，登录注册这些来提供一些功能，也在游戏中提供一些跳转等的操作，

登录主要是token的获取，然后再到游戏中将token这些信息发送给游戏，以便于游戏服务器去验证，然后主要就是支付的一些问题，订单的生成，订单的支付和订单的取消，主要就是要收到钱之后再对游戏内进行充值操作等。

它的主要功能是将其他平台的接口和自有的服务整合起来用来和游戏交互

Base中的文件主要是对自己的后台的请求的发送，在base.ts文件中主要是加载不同的平台的sdk，和采集一些数据。
使用游戏的渠道是什么，然后根据渠道来做出响应的反应，在原生端，就是你给我什么，我会做什么

在原生的游戏上玩

在网页上玩

在facebookwebgame上玩，facebook的网页游戏上玩

支付的时候并不需要你做什么，你只需要创建订单之后拿到返回值中的链接就可以了，他会自动的进行充值，如果是平台服务器的话

### 4.sdk的功能需求分析

1.sdk是用来与其他的平台来进行交互的，

2.主要使用的平台有google商店，facebook网页游戏和苹果的商店，还有就是自营的网页游戏。

3.需要提供给研发的主要功能是登录，绑定区服（研发来绑定区服），我们主要是做一些验证，前端的功能主要是调起一些接口，来进行一些特定的操作，

### sdk功能实现的分析

1.首先在window上挂载一个SDK属性，指向Base这个模块，然后判断window上有没有JsToNative这个属性。如果有的话，直接开始初始化加载Polyfill来确保Promise这些函数的可用，如果没有就添加一个JsToNative这个属性，里面有获取设备信息的同步和异步方法，并执行Polyfill的初始化，当这些执行完成后准备工作就已经完成了。

执行SDK.polyfilled()这个方法来做进一步的初始化

执行SDK.init()方法，第一步拿到手机平台的系统是Anfroid4.4以上吗，然后判断window上有debugger和本地url地址查询参数中含有debugger这个字段，

如有就判断是否安卓机和系统是否4.4以上，如果是就加在debugger

然后加载游戏配置共有三部分

- appId，advChannel渠道
- src下的config文件
- Dom下的i18n根据国家来确定翻译

都加载完成后，将SDK.config中的参数补全，

然后加载facebook的js的sdk，最后根据渠道加载不同的文件，将RG挂载在window上并给RG上面填充要使用的方法，然后使用RG打点，最后调起登录

登录共有两种登录方式，facebook登录和平台登录

剩下的全是一些具体的业务逻辑的接口了，页面是在Dom中

最终使用sdk是将其加载到游戏包中

## SDK最终的上传

主机：52.221.145.234

目录结构： /data/platform/platform-sdk-v2/webapp/jssdk

iplist ----> changic -----> 3  ------> 2 -------> 4

原生打包地址：https://cdn-xianlingji.bilivfun.com/quick/index_tw.html?appId=10120&sdkVersion=v2.2&advChannel=40&BID=com.xianwuyu&v=110

test-sg，新加坡，港台、印尼等

vn越南：东南亚

de :德国，欧洲

dev 本地

test 测试服

