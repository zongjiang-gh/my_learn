## [GraphQL](http://graphql.cn/learn/)

http://graphql.cn/graphql-js/object-types/

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

- 变量的定义使用$来作为前缀，后跟其类型。所有的声明的变量都必须是标量、没举行或者输入对象类型，变量的定义是可选的或者必要的，当类型后面加上！时表示是必要的

- 默认变量在类型的后面直接加=来进行赋值

  `query HeroNameAndFriends($episode: Episode = "JEDI")`

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

#### 指令  Directives

- `@include(if: Boolean)` 仅在参数为 `true` 时，包含此字段。
- `@skip(if: Boolean)` 如果参数为 `true`，跳过此字段。

~~~js
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
//变量
{
  "episode": "JEDI",
  "withFriends": false
}
//结果
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
//变量
{
  "episode": "JEDI",
  "withFriends": true
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
~~~

#### 变更Mutations

~~~js
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
//variables
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
//result
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
//查询字段时，是并行执行，而变更字段时，是线性执行，一个接着一个。
//review输入对象类型
~~~

#### 内联片段Inline Fragments

~~~js
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
//变量
{
  "ep": "JEDI"
}
//结果
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "primaryFunction": "Astromech"
    }
  }
}
//根据不同的类型来选择不同的查询属性
~~~

#### 元字段  Meta fields

某些情况下，你并不知道你将从 GraphQL 服务获得什么类型，这时候你就需要一些方法在客户端来决定如何处理这些数据。GraphQL 允许你在查询的任何位置请求 `__typename`，一个元字段，以获得那个位置的对象类型名称。

~~~js
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}

{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo"
      },
      {
        "__typename": "Human",
        "name": "Leia Organa"
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1"
      }
    ]
  }
}
~~~

### Schema和类型

#### 对象类型和字段（Object Types and Fields）

~~~tex
type Character {
  name: String!
  appearsIn: [Episode]!
}
Character表示一个拥有一些字段的类型，name和appearsIn是Character上的字段，String表示类型，！表示是非空的，[Episode]表示是数组里面有0个或者多个元素
~~~

#### 参数

~~~tex
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
~~~

#### 查询和变更类型

~~~tex
schema {
  query: Query
  mutation: Mutation
}
一个schema中有两个特殊类型query和mutation表示查询和变更
每一个 GraphQL 服务都有一个 query 类型，可能有一个 mutation 类型。这两个类型和常规对象类型无差，但是它们之所以特殊，是因为它们定义了每一个 GraphQL 查询的入口。
服务：
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}
查询：
query {
  hero {
    name
  }
  droid(id: "2000") {
    name
  }
}
结果：
{
  "data": {
    "hero": {
      "name": "R2-D2"
    },
    "droid": {
      "name": "C-3PO"
    }
  }
}
自带默认标量类型（基本类型）
Int 有符号32位整数
Float 有符号的双精度浮点值
String  UTF-8字符序列
Boolean true或者false
ID 唯一标识符与String一样
自定义标量类型
scalar Date
然后就取决于我们的实现中如何定义将其序列化、反序列化和验证。
~~~

#### 枚举

~~~tex
enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
}
这表示无论我们在 schema 的哪处使用了 Episode，都可以肯定它返回的是 NEWHOPE、EMPIRE 和 JEDI 之一。
而对于JavaScript 这样没有枚举支持的语言，这些枚举值可能就被内部映射成整数值。
~~~

#### 列表和非空（Lists and Non-Null）

~~~tex
type Character {
  name: String!
  appearsIn: [Episode]!
}
[String!]
[]!
~~~

#### 接口

~~~tex
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
一个接口是一个抽象类型
任何实现接口的类型都要具有这些字段
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
要查询位于特定的类型上的字段，必须使用内敛片段
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
~~~

#### 联合类型

~~~
union SearchResult = Human | Droid | Starship；联合类型成员必须是具体对象类型
{
  search(text: "an") {
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
必须使用条件片段
~~~

#### 输入类型

~~~tex
input ReviewInput{
    stars: Int!
    commentary: String
}
mutation CreateReviewForEpisode($ep: Episode! ReviewInput){
    createReview(episode:$ep,review:$review){
        stars
        commentary
    }
}

{
    "ep":"JEDI"
    "review": {
        "stars": 5
        "commentary": "This is a great movie!"
    }
}

{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
~~~







