## [GraphQL](http://graphql.cn/learn/)

GraphQL是一个用于API的查询语言，是一个基于类型系统来执行查询的服务端运行服务（类型系统由你的数据定义），一个GraphQL服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数。当一个服务运行起来（通常是一个URL）就能接收查询，并验证和执行。

~~~js
type Query {
    me: User
}
type User {
	id: ID
	name: String
}
function Query_me(request){
    return request.auth.user;
}
function User_name(user){
    return user.getName();
}
//查询
{
    me: {
        name
    }
}
//结果JSON字符串
{
    "me": {
        "name": "bb"
    }
}
~~~

### 查询

~~~js
{
    hero {
        name
    }
}
//结果和查询的结构总是相同的
{
    "data": {
        "hero": {
            "name": "cc"
        }
    }
}
//可交互的
{
    hero {
        name
        appearsIn
    }
}
{
    "data": {
        "hero": {
            "name": "cc"
            "appearsIn": [
                "NEWHOPE",
       			 "EMPIRE",
       			 "JEDI"
            ]
        }
    }
}
//次级选择
//查询
{
  hero {
    name
    # 查询可以有备注！
    friends {
      name
    }
  }
}
//结果
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
//参数
{
  human(id:1001){
    name
    height
  }
}
//结果
{
  "data": {
    "human": {
      "name": "Darth Vader",
      "height": 2.02
    }
  }
}
{
  human(id: "1001") {
    name
    height(unit: FOOT)
  }
}

{
  "data": {
    "human": {
      "name": "Darth Vader",
      "height": 6.6272968
    }
  }
}
//别名
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
//片段
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
//结果
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        },
        {
          "name": "C-3PO"
        },
        {
          "name": "R2-D2"
        }
      ]
    },
    "rightComparison": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
//以上均为简写语法，省略query关键字和查询名称
~~~

#### 操作名称和操作类型

1. 操作类型可以是query、mutation或者subscription，描述被你打算做什么类型的操作。
2. 操作名称是操作的有意义和明确的名称，主要用于调试和服务端的日志。

~~~js
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}

{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
~~~

#### 变量Variables

- 变量的定义使用$来作为前缀，后跟其类型

~~~reStructuredText
# { "graphiql": true, "variables": { "episode": JEDI } }
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
~~~



