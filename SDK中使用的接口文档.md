## SDK中使用的接口文档

正式的接口前缀：https://sdk-sg.pocketgamesol.com/pocketgames/client

测试的接口缀：https://sdk-test.changic.net.cn/pocketgames/client

### 1.登录的接口

1. 请求地址：http://ip:port/pocketgames/client/user/v3/login
2. 请求方式：POST
3. 返回值格式: JSON
4. 请求参数


|    属性名    | 参数类型长度 |                           参数说明                           |
| :----------: | :----------: | :----------------------------------------------------------: |
|    appId     |     int      |                    平台分配给游戏的appId                     |
|    source    |     int      |           注册来源0=ios；1=android；2=原生；3=其他           |
|  advChannel  |     int      | <30000原生；30000-31000网页；31000-32000facebookWebGame；32000-33000暂无使用（预计使用在facebookinstantGame上） |
|   network    |     int      |                  网络0=wifi；1= 3g；2=其他                   |
|    model     |  String(50)  |                             机型                             |
|  operatorOs  |  String(50)  |                           操作系统                           |
|   deviceNo   |  String(50)  |               设备号（ANDROID=IMEI,IOS-IDFV）                |
|    device    |  String(50)  |            设备（Android=MAC#ANDRIDID,IDS=IDFA）             |
|   version    |  String(30)  |                           游戏版本                           |
|  sdkVersion  |  String(30)  |                           sdk版本                            |
|  clientTime  |    string    |                    "2018-09-01 02-01-00"                     |
| firstInstall |    number    |          0=第一次安装/1非第一次安装（猜测，未证实）          |
|     sign     |  String(32)  |        参数签名结果(appId+userName+source+advChannel)        |

返回值：

~~~js
{
    code:200，//200代表成功，具体见错误表
    error_msg:''，//错误信息
    message: {
        loginMessageUrl:String,
        isHasLogin: String,
        isHasPause: String,
        pauseMessageUrl:String
     },
     handlerBtns: [{
        btnName: string,
         btnNormalIcon: string,
         btnNormalPressIcon: string,
         btnRedIcon: Icon,
         btnRedPressIcon: string,
         btnUrl: string,
         showRedSpots: string
     }],
     loginMethods: [{
          loginMethod: string
          iconUrl: string
          loginUrl: string
          callBackUrl: string
          index: string
          rotate: number
      }  ]  
}
~~~

### 2.注册的接口

1. 请求地址：http://ip:port/pocketgames/client/user/v3/register
2. 请求方式：POST
3. 返回值格式: JSON
4. 请求参数

|    属性名    | 参数类型长度 |                           参数说明                           |
| :----------: | :----------: | :----------------------------------------------------------: |
|    appId     |     int      |                    平台分配给游戏的appId                     |
|   userName   |  String(50)  |                           用户名称                           |
|   password   |  String(50)  |                       用户密码md5加密                        |
|   nickName   |    String    |                           用户昵称                           |
| accountType  |     int      |                           账户类型                           |
| thirdPartyId |  String(30)  |            第三发用户ID，如果非第三方用户，则传''            |
|     sex      |     int      |                       性别，0=男 1=女                        |
|   birthday   |  String(50)  |                             生日                             |
|    email     |  String(50)  |                           电子邮箱                           |
|  telephone   |    String    |                           电话号码                           |
|    source    |     int      |           注册来源0=ios；1=android；2=原生；3=其他           |
| userChannel  |    String    |            用户渠道 0=默认渠道，1=appota，2=mwork            |
|  advChannel  |     int      | <30000原生；30000-31000网页；31000-32000facebookWebGame；32000-33000暂无使用（预计使用在facebookinstantGame上） |
|   network    |     int      |                  网络0=wifi；1= 3g；2=其他                   |
|    model     |  String(50)  |                             机型                             |
|  operatorOs  |  String(50)  |                           操作系统                           |
|   deviceNo   |  String(50)  |               设备号（ANDROID=IMEI,IOS-IDFV）                |
|    device    |  String(50)  |            设备（Android=MAC#ANDRIDID,IDS=IDFA）             |
|   version    |  String(30)  |                           游戏版本                           |
|  sdkVersion  |  String(30)  |                           sdk版本                            |
|    exInfo    | String(500)  | 额外参数如果FB用户，则传[{"scopeId":"1459051407752747","fbId":"426352630876651"}] |
|     sign     |  String(32)  |     参数签名结果(appId+userName+password+source+appKey)      |

返回值：

```js
{
    code:200，//200代表成功，具体见错误表
    error_msg:''，//错误信息
    token：''，//用于游戏服务器验证
    data: {
        userId: Number,//用户ID
        userName: String,//用户名
        userType: 0,//1或者0,1正式账号，0游客账号
        accountType: int, //账户类型0普通用户，1Email用户，2fb账号，3gamecent账号，4Google账号，5line账号，6vk账号
        email: '',//电子邮箱
        emailValid: int,//电子邮箱是否验证 0=未设置，1未验证，2=已验证
        telephone: String, //电话号码
        firstLogin: int //0登录，1注册    
    }
    
}
```

### 3.初始化的接口

(接口用来为原生应用进行初始化)

1. 请求地址：http://ip:port/pocketgames/client/config/v3.1/initSDK
2. 请求方式：POST
3. 返回值格式: JSON
4. 请求参数

|    属性名    | 参数类型长度 |                           参数说明                           |
| :----------: | :----------: | :----------------------------------------------------------: |
|    appId     |     int      |                    平台分配给游戏的appId                     |
|    source    |     int      |           注册来源0=ios；1=android；2=原生；3=其他           |
|  advChannel  |     int      | <30000原生；30000-31000网页；31000-32000facebookWebGame；32000-33000暂无使用（预计使用在facebookinstantGame上） |
|   network    |     int      |                  网络0=wifi；1= 3g；2=其他                   |
|    model     |  String(50)  |                             机型                             |
|  operatorOs  |  String(50)  |                           操作系统                           |
|   deviceNo   |  String(50)  |               设备号（ANDROID=IMEI,IOS-IDFV）                |
|    device    |  String(50)  |            设备（Android=MAC#ANDRIDID,IDS=IDFA）             |
|   version    |  String(30)  |                           游戏版本                           |
|  sdkVersion  |  String(30)  |                           sdk版本                            |
|  clientTime  |    String    |                    'yyyy-MM-dd hh:mm:ss'                     |
| firstInstall |    number    |                             0/1                              |
|     sign     |  String(32)  |            参数签名结果(appId+source+advChannel)             |

返回值：

```js
{
    code:200，//200代表成功，具体见错误表
    error_msg:''，//错误信息
    message: {
        loginMessageUrl: '',//string
        isHasLogin: '',//string
    	isHasPause: ''//string
    },
	handlerBtns: [{
    	btnName:'',//string
        btnNormalIcon: '',//string
        btnNormalPressIcon:'',//string
        btnRedIcon: '',
        btnRedPressIcon:'',
        btnUrl: '',
        showRedSpots: ''
    }],
    loginMethods: [{
        loginMethod: '',
        iconUrl: '',
        loginUrl: '',
        callBackUrl: '',
        index: '',
        rotate: 000000//number
    }],
    verifys: {
       gpVerify: '',
       gpProduct: ''    
    },
    advChannels: {
       facebookAppId: '',
       appsFlyerDevKey: '',
       talkAppKey: '',
       charboostAppId: '',
       charboostAppSignature: '',
       ewayAppId: '',
       mobvistaSDKAppId: '',
       admobConversionID: '',
       admobValue: ''    
    }
}
```

### 4.绑定区服的接口

1. 请求地址：http://ip:port/pocketgames/client/user/v3/bindZone
2. 请求方式：POST
3. 返回值格式: JSON
4. 请求参数

|   属性名   | 参数类型长度 |                   参数说明                   |
| :--------: | :----------: | :------------------------------------------: |
|   userId   |    number    |                    用户id                    |
| gameZoneId |    number    |                    区服id                    |
| createRole |    number    |                 是否创建角色                 |
|   roleId   |    number    |                    角色id                    |
|   level    |    number    |                   角色等级                   |
|    gaid    |    string    |        Android的Google advertising ID        |
|   device   |    string    |    设备（Android=MAC#ANDRIDID,IDS=IDFA）     |
|  deviceNo  |    string    |       设备号（ANDROID=IMEI,IOS-IDFV）        |
|  version   |    string    |                   游戏版本                   |
|   model    |    string    |                     机型                     |
| operatorOs |    string    |                   操作系统                   |
|   source   |    number    |   注册来源0=ios；1=android；2=原生；3=其他   |
|  network   |    number    |         // 网络 0=wifi 1 = 3g 2=其他         |
|    sign    |  String(32)  | 参数签名结果(userId+appId+gameZoneId+source) |

返回值：

```js
{
    code:200，//200代表成功，具体见错误表
    error_msg:''，//错误信息
}
```

### 5.修改密码的接口

1. 请求地址：http://ip:port/pocketgames/client/user/changePwd
2. 请求方式：POST
3. 返回值格式: JSON
4. 请求参数

|   属性名    | 参数类型长度 |                    参数说明                    |
| :---------: | :----------: | :--------------------------------------------: |
|    appId    |     int      |             平台分配给游戏的appId              |
|   userId    |     int      |                     用户id                     |
|  password   |    string    |                   绑定的密码                   |
| newPassword |    string    |                    新的密码                    |
|    sign     |  String(32)  | 参数签名结果(appId+userName+source+advChannel) |

返回值：

```js
{
    code:200，//200代表成功，具体见错误表
    error_msg:''，//错误信息
}
```

### 6.升级游客账号的接口

1. 请求地址：http://ip:port/pocketgames/client/user/bindVisitor
2. 请求方式：POST
3. 返回值格式: JSON
4. 请求参数

|  属性名  | 参数类型长度 |             参数说明             |
| :------: | :----------: | :------------------------------: |
|  appId   |     int      |      平台分配给游戏的appId       |
|  userId  |    number    |              用户id              |
| userName |    string    |             用户账户             |
| password |    string    |             用户密码             |
|  email   |    string    |             电子邮箱             |
|   sign   |  String(32)  | (appId+userId+userName+password) |

返回值：

```js
{
    code:200，//200代表成功，具体见错误表
    error_msg:''，//错误信息
    data: {
        userId:0000,//用户IDint
        userName:'',
        email: '',
        phoneNumber: '',//电话号码
        emailValid： 0,//电子邮箱是否验证0=未设置1=未验证，2=已验证
        userType： 0,//1正式账号，0游客账号
        accountType: 0, //0普通账户，1Email用户，2=fb账号，3=gamecent账号，4=Google账号，5=line账号，6=vk账号    
    }
}
```

### 7.请求支付配置的接口

1. 请求地址：http://ip:port/pocketgames/client/config/paymentConfig/v4.0

2. 请求方式：POST

3. 返回值格式: JSON

4. 请求参数

   ~~~typescript
   interface PaymentConfigParams {
     /** 平台方分配给游戏的appId */
     appId: number
     /** 0=appstore 1=google play 具体查看包常量表 */
     advChannel: number
     /** 平台用户ID */
     userId: number
     /** 游戏内角色id */
     roleId: number
     /** 0=ios 1=android */
     source: number
     // 网络 0=wifi 1 = 3g 2=其他
     network: number
     /** 角色等级 */
     level: number
     /** 游戏版本 控制每种支付方式的开关 */
     version: string
     /** 游戏币数量 */
     gameCoin: number
     /** 额外参数 */
     exInfo?: string
     /** 验证参数MD5(appId+ advChannel+userId+gameCoin+level +source+ network +appKey) */
     sign: string
   }
   ~~~


返回值：

```typescript
interface PaymentConfigRes {
  code: number
  error_msg: string  
    payments: [{
        isFacebook?: boolean
  		nodes?: PaymentChannel[]
  		channel: number
  		code: number
  		codeImg: string
  		description: string
  		exInfo: string
  		isOfficial: number
  		name: string
        products: [{
        amount: number
  		currency: string
  		discountDesc?: string
  		gameCoin: number
  		gameCurrency: string
  		itemType: number
  		productDesc: string
  		productName: string
  		shortCurrency: string
    }]
    selectedProduct: {
        amount: number
  		currency: string
  		discountDesc?: string
  		gameCoin: number
  		gameCurrency: string
  		itemType: number
  		productDesc: string
  		productName: string
  		shortCurrency: string
    }
  		showMethod: number
  		showProductList: number
    }]
}
```

### 8.创建订单的接口

1. 请求地址：http://ip:port/pocketgames/order/create/v4.0
2. 请求方式：POST
3. 返回值格式: JSON
4. 请求参数

~~~typescript
interface CreateOrderParams {
  /** 平台方分配给游戏的appId */
  appId: number
  /** 0=appstore 1=google play 具体查看包常量表 */
  advChannel: number
  /** 平台用户ID */
  userId: number
  /** 游戏订单ID */
  gameOrderId: string
  /** 游戏区服ID */
  gameZoneId: string
  /** 角色ID */
  roleId: string
  /** 角色ID */
  roleName: string
  /** 角色等级 */
  level: string
  /** 充值来源 0=ANDROID客户端 1=IOS客户端 2=网页 */
  source: number
  /** 支付渠道 0=appstore 1=google play 2=vnpt 3=1pay 4=mol,具体见渠道常量表 */
  channel: number
  /** CODE值，具体见支付方式常量表 */
  code: number
  /** 金额 */
  amount: string
  /** 货币 */
  currency: string
  /** 商品名称 */
  productName: string
  /** 商品类型：0=普通商品，1=月卡，2=年卡.... */
  itemType: number
  /** 0=第三方，1=官方 */
  isOfficial: number
  /** 设备号 */
  deviceNo: string
  /** Android:MAC地址 IOS:IDFA */
  device: string
  /** 网络 0=wifi 1 = 3g 2=其他 */
  network: number
  /** 机型 */
  model: string
  /** 操作系统，例如Android4.4 */
  operatorOs: string
  /** 游戏版本 */
  version: string
  /** SDK版本号 */
  sdkVersion: string
  /** 客户端提交时间 "yyyy-MM-dd hh:mm:ss" */
  clientTime: string
  /** 额外的信息，如果是刮刮卡,它的格式是{“serialNo”:””,”pin”:””}JSON字符串 */
  exInfo: string
  /** 参数签名结果 MD5(appId+advChannel+userId+roleId+gameOrderId+gameZoneId+code+source+channel+amount+currency+productName + exInfo +appKey)
  */
  sign: string
}
~~~



返回值：

```typescript
interface OrderRes {
  code: number
  error_msg: string
  data: {
    currency: string
    money: number
    transactionId: string
    returnInfo: {
      url: string
    }
  }
}
```

### 9.获取订单列表的接口

1. 请求地址：http://ip:port/pocketgames/client/order/getOrderList
2. 请求方式：POST
3. 返回值格式: GET
4. 请求参数

|  属性名  | 参数类型长度 |              参数说明              |
| :------: | :----------: | :--------------------------------: |
|  appId   |     int      |       平台分配给游戏的appId        |
|  userId  |     int      | 注册来源0=ios；1=android；2=其他； |
| lastTime |     int      |     1525771365401（2018/5/18）     |
|   sign   |  String(32)  |     参数签名结果(appId+useId)      |

返回值：

```js
{
    code:200，//200代表成功，具体见错误表
    error_msg:''，//错误信息
    //服务器返回的最后一条订单的时间
    lastTime: '',
    data：{
        data: [
           amount:'',//金额
           currency:'', //货币
           transactionId:'', //交易流水
           clientDate:'',//客户端时间
           status：200,// 成功
            /** 支付方式 0=appstore 1=google play 2=vnpt 3=1pay 4=mol 28=facebook */
  			channel: number
        ]
    }
}
```

### 10.完成订单和消单的接口

1. 请求地址：http://ip:port/pocketgames/client/official/order/finish/v4.0
2. 请求方式：POST
3. 返回值格式: JSON
4. 请求参数

~~~typescript
interface FinishOrderPostData {
  /** 交易流水 */
  transactionId: string
  /** APPSTORE单据或者Google play signatureData */
  receipt: string
  /** Google play signature */
  signature: String
  /** 支付方式 0=appstore 1=google play 2=vnpt 3=1pay 4=mol 28=facebook */
  channel: number
  /** 包ID */
  advChannel: number
  /** SDK版本 */
  sdkVersion: string
  /** 客户端提交时间 "yyyy-MM-dd hh:mm:ss" */
  clientTime: string
  /** 参数签名结果 MD5(transactionId + receipt + signature + channel + advChannel + appKey) */
  sign: string
  /** 设备号 */
  deviceNo: string
  /** Android: MAC地址 IOS: IDFA */
  device: string
  /** 网络 0 = wifi 1 = 3g 2 = 其他 */
  network: number
  /** 机型 */
  model: string
  /** 操作系统，例如Android4.4 */
  operatorOs: string
  /** 游戏版本 */
  version: string
  /** 额外的信息 */
  exInfo?: string
}
~~~



返回值：

```js
{
    code:200，//200代表成功，具体见错误表
    error_msg:''，//错误信息
}
```

### 11.localStorage的存储

- userInfo
- usersInfo
- loginData



