### SDK中控

https://github.com/Akryum/vue-cli-plugin-apollo

https://docs.rollbar.com/docs/projects

{}在js中会被解释为代码块

#### vue-class-component

vue-class-component 以class的模式写vue组件

地址 ： https://www.cnblogs.com/crazycode2/p/7821089.html

`npm install --save vue-class-component`

1.methods，钩子都可以直接写作class的方法

2.computed属性可以直接通过get来获得

3.初始化data可以声明为class的属性

4.其他的都可以放到Component装饰器里

~~~vue
@Component({
    props: {
        firstName: String,
        lastName: String
    },
    components: {
        'component-a': ComponentA
    }
})
export class XXXX extends Vue {
    firstName: string;
    lastName: string;
     
    //初始data
    middleName = 'middle';
     
    //computed 属性
    get fullName() {
        return this.firstName + this.lastName;
    }
     
    //method
    hello() {
        alert(`Hello ${this.fullName}!`);
    }
     
    //钩子
    mounted() {
        this.hello();
    }
}
//，要想获取好的代码提示还得是原语言啊，js代码在.ts,.js文件写，scss在.scss写,html在.html写。

import Vue from 'vue';
import Componet from 'vue-class-component';
 
require('./XXX.template.scss');
 
@Component({
    template: require('./XXX.template.html'),
    props: {
        firstName: String,
        lastName: String
    },
    components: {
        'component-a': ComponentA
    }
})
export class XXXX extends Vue {
    firstName: string;
    lastName: string;
     
    //初始data
    middleName = 'middle';
     
    //computed 属性
    get fullName() {
        return this.firstName + this.lastName;
    }
     
    //method
    hello() {
        alert(`Hello ${this.fullName}!`);
    }
     
    //钩子
    mounted() {
        this.hello();
    }
}
//如果[Vue warn]: You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build.打包时在webpack配置文件中加上：
alias: {
    'vue': 'vue/dist/vue.esm.js'
}
~~~

#### vue-property-decorator 

vue-property-decorator 提供 OO（Object oriented） 面向对象的风格 Vue Component 方便类型声明,此库完全依赖于上面的库

地址：https://www.cnblogs.com/crazycode2/p/7821389.html

`npm install --save vue-property-decorator`

##### props父子组件之间的传值

Child：

~~~vue
<template>
  <div>
      {{fullMessage}}
  </div>
</template>
 
<script lang="ts">
 
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
 
@Component({})
export default class Child extends Vue {
    message: string = "Hello";
    @Prop({
        type: String,
        default: 'Default Value'
    }) msg: string;
 
    get fullMessage() {
        return `${this.message},${this.msg}`;
    }
}
</script>
~~~

Parent：

~~~vue
<template>
  <div class="hello">
    <h1 v-colorDirective="{color: 'red', backgroundColor: 'blue'}">{{ message }}</h1>
    <button @click="clicked">Click</button>
    <ChildComp msg="'What a good day!'"/>
    <router-link to="/hello-ts">Hello Ts</router-link>
  </div>
</template>
 
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import colorDirective from '../color-directive';
 
import ChildComp from './Child.vue';
 
@Component({
  directives: {
    colorDirective
  },
  components: {
    ChildComp
  }
})
export default class Hello extends Vue {
  message: string = 'Welcome to Your Vue.js App'
 
  get fullMessage() {
    return `${this.message} from Typescript`
  }
 
  created() {
    console.log('created');
  }
 
  beforeRouteEnter(to, from, next) {
    console.log("Hello: beforeRouteEnter")
    next()
  }
 
  beforeRouteLeave(to, from, next) {
    console.log("Hello: beforeRouteLeave")
    next()
  }
 
  clicked() {
    console.log('clicked');
  }
}
</script>
~~~

##### @model 数据双向绑定

checkbox:

~~~vue
<template>
  <div>
      <input type="checkbox" :id="id" :checked=checked @change="changed"/> {{label}}
  </div>
</template>
 
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Model } from 'vue-property-decorator'
@Component
export default class MyCheckbox extends Vue {
  @Prop() label: string
  @Prop() id: string
 
  @Prop()
  @Model('change') checked: boolean
 
  changed(ev) {
    this.$emit('change', ev.target.checked)
  }
}
</script>
~~~

Parent Component:

~~~vue
<template>
    <div>
        <MyCheckbox :label="checkbox.label" :id="checkbox.id" v-model="checkbox.checked"/>
 
        {{JSON.stringify(checkbox)}}
    </div>
</template>
<script lang="ts">
 
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import MyCheckbox from './MyCheckBox.vue'
 
@Component({
    components: {
        MyCheckbox
    }
})
export default class HelloTs extends Vue {
 
    checkbox = {
        label: 'Fancy checkbox',
        id: 'checkbox-id',
        checked: true
    }
}
</script>
~~~

##### watch 监听数据变化

~~~vue
<template>
  <div class="hello">
    <button @click="clicked">Click</button> {{sum.acum}}
  </div>
</template>
 
<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
 
@Component({
})
export default class Hello extends Vue {
 
  sum = {
    acum: 0
  }
  @Watch('sum', {deep: true})
  watchCount(newVal, oldVal) {
    console.log("newVal", newVal, "oldVal", oldVal)
  }
 
  clicked() {
    this.sum.acum++;
  }
}
</script>
~~~

##### @Provide  提供  /  @Inject  注入

Parent ： 

~~~vue
<template>
  <div class="hello">
    <ChildComp :msg="'What a good day!'"/>
  </div>
</template>
 
<script lang="ts">
import Vue from 'vue'
import {Component, Provide} from 'vue-property-decorator'
 
import ChildComp from './Child.vue';
 
@Component({
})
export default class Hello extends Vue {
 
  @Provide('users')
  users = [
    {
      name: 'test',
      id: 0
    }
  ]
 
}
~~~

child:

~~~vue
<template>
  <div>
      {{users}}
  </div>
</template>
 
<script lang="ts">
 
import Vue from 'vue'
import {Component, Inject} from 'vue-property-decorator'
 
@Component({})
export default class Child extends Vue {
    message: string = "Hello";
 
    @Inject('users') users;
}
</script>
~~~

##### typescript中的装饰器

~~~js
const Log = (msg) => {
  return createDecorator((component, key) => {
    console.log("#Component", component);
    console.log("#Key", key); //log
    console.log("#Msg", msg); //App
  })
}
@Log('fullMessage get called')
get fullMessage() {
  return `${this.message} from Typescript`
}
//输出
//#Component Object {directives: Object, components: Object, name: "Hello", methods: Object, computed: Object…}
//#Key fullMessage
//#Msg fullMessage get called
~~~

库：

request：https://github.com/request/request    超级简单易用 请求被设计为进行http调用的最简单方法。它支持HTTPS并默认遵循重定向。

cron-scheduler：  https://github.com/rstacruz/cron-scheduler     cron-scheduler是一种在一天中的特定时间运行函数的方法。它在Node.js和浏览器中运行。

|       *       |      *      |     *      |      *       |           *            |
| :-----------: | :---------: | :--------: | :----------: | :--------------------: |
| Minute(0--59) | Hour(0--24) | Day(1--31) | Month(1--12) | Weekday(0==sun--6=sat) |

|     代码     |        解释        |
| :----------: | :----------------: |
|  0 * * * *   |   每小时跟新一次   |
| */15 * * * * |  没15分钟更新一次  |
| 0 */2 * * *  |  每两小时更新一次  |
|  0 0 * * 0   | 没周日午夜跟新一次 |

graphql-type-json ： https://github.com/taion/graphql-type-json     GraphQL.js的JSON标量类型。

register-service-worker：https://github.com/yyx990803/register-service-worker  注册一个浏览器的线程，小型服务器

shortid：https://github.com/dylang/shortid    用于创建短的唯一的表示符

lowdb：https://github.com/typicode/lowdb   一个小的json数据库，支持NodeElectron 和Browser

mkdirp:https://segmentfault.com/a/1190000011832060    递归的创建目录



这几天遇到的问题：

1.vue-apollo的变量不变，不能更新的问题，解决方式，设置一个参数，当要不改变参数更新试，将这个参数放在参数中，然后在需要更新的点自增就可以了



