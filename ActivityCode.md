#### 发行活动API返回code码


 **后端统一返回JSON格式：** 

```javascript
{
    code:200,
    state:[],
    msg:'success'
}
```

---

CODE值| 返回msg | 详细描述 
---|---|---
200a | success | 请求正常 
301 | 系统错误，请稍候再试| 不支持的sdk版本 
302 | 系统错误，请稍候再试 | fb登陆失败 
400 | 系统错误，请稍候再试 | 请求参数有误 
401 | 系统错误，请稍候再试 | 活动未开始 
402 | 系统错误，请稍候再试 | 活动已结束 
403 | 系统错误，请稍候再试 | 奖励不足 
404 | 系统错误，请稍候再试 | 缺失参数 
405 | 系统错误，请稍候再试 | 请求方法不支持 
500 | 系统错误，请稍候再试 | 服务器错误 
1000a | 系统错误，请稍候再试 | 条件未达成 
1001a | 系统错误，请稍候再试  | 登陆次数不满足 
1002 | 系统错误，请稍候再试  | 参与人数不满足 
1003 | 系统错误，请稍候再试  | 在线时长不满足 
1004 | 系统错误，请稍候再试  | 未达到指定邀请数量 
1005a | 系统错误，请稍候再试  | 参与次数达到上限 
1101 | 系统错误，请稍候再试  | 游戏接口错误,（邮件发送失败） 
2001 | 系统错误，请稍候再试  | 礼品ID不存在 
2002 | 系统错误，请稍候再试  | 礼品不能重复发送 
 |  |  
