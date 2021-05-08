
# 前言

这里记录面试所遇到的 js 的一些问题，知识在于积累，量变引起质变。

## 1. js为什么是单线程
js的单线程主要是与它的用途有关。js是作为浏览器的脚步，主要的用途是与用户交互，以及操作DOM。这个就决定js是个单线程，否则会带来很多复杂的同步问题。比如，假设js是多线程，一个线程在某个节点添加内容，一个线程在删除这个节点，这个时候就不知道以谁为准。后面html5虽然提成web work,允许js创建多个线程，但是子线程还是受主线程的控制，且并不能操作dom，所有这并没有改变js单线程的本质

## 2. js由那几部分组成的
js是由ECMAScript和DOM(文档对象模型)以及BOM(浏览器对象模型)三部分组成
- ECMAScript其实就是一种标准，比如我们的ES5，ES6定义了js的语法，关键字，变量，数据类型等
- DOM就是将我们的页面映射成一棵DOM树，转化成js能识别操作的一个模型，提供了对节点的增删改查的一些api，比如createElement,doucument.getElementById,appendChiden,removeChild,repalceChid等
- BOM提供一些与浏览器交互的api，BOM的核心对象是window、location、navigator、history、screen

## 2. js的数据类型
1. 基本数据类型
- string
- number
- boolean
- undefined
- null
- symbol

2. 赋值数据类型
- Object
- Array
- Function

## 3. 如何判断js的数据类型

- 判断基本类型可用typeof，但是不能判断数组、null、object
```
typeof 1 // number
typeof '123' // string
typeof true // boolean
typeof null // object
typeof [] // object
typeof {} // object
```

- instanceof 用于判断某个对象是不是某个构造函数的实例
```
a instanceof b
instanceof (a, b) {
  // 实例对象的隐原型
  let L = a._proto__
  // 构造函数的显式原型
  let R = b.prototype
  return L === R
}
```

- Object.prototype.toString.call() 完美解决
```
function _typeof(data){
  let str = Object.prototype.toString.call(data)
  return str.match(/\[object (.*?)\]/)[1].toLowerCase();
}
```

## 4. for和forEach的区别
- for可以指定循环的起点，forEach只能默认从0开始
- forEach不能用break跳出循环(return 可以跳出)
- forEach遍历数组里是基本类型的时候，不能直接改变，因为item只是个形参，是对值复制的一份。

## 5. ES6的新特性有哪些
- let和const
- 变量的解构赋值
- 字符串模板
- promise
- async await
- class/extend(类声明和继承)
- Set和Map新的数据类型，Set是一个类数组对象，每个成员都是唯一的。Map是个键不局限于字符串的类对象，js中的对象一般都是键值对的形式出现，键都是字符串。Map数据结构，它类似对象，也是键值对的结构，但是它的键不限于字符串，各种类型的值都可以做键
- 箭头函数
- 数组的扩展
- 对象的扩展

## 6. var、let、const的区别
- var存在变量提升，let和const不存在
- var声明的全局变量会挂载在window下，let和const不会
- let和const存在暂时性死区，必须先声明再使用
- let和const不能重复声明
- const声明简单数据类型不能更改，声明复杂类型则该类型的内存地址不能更改
## 7. 对promise的理解
1. 什么是promise
- promise是ES6提出的一种异步编程的方法，解决了我们传统的回调地域问题

2. promise的特点
- promise有三个状态，fullfiled(成功的)、rejected(失败的)、pending(进行中)
- promise的状态一旦变化，无法更改
- promise是链式调用

2. promise的缺点
- promise一旦建立就立即执行，无法取消
- promise必须传入回调，不然会报错
- promise的处于pending状态的时候，不知道是哪个阶段是刚开始还是要结束了

## 8. 普通函数和箭头函数的区别，普通函数如何改变this的指向
- 箭头函数不会创建自己的this，它的this是从上级作用域继承来的，所以箭头函数的this在它定义的时候就已经确定了，之后不能改变
- 箭头函数不能使用new，不能作为构造函数
- 箭头函数没有自己的arguments
- call/apply/bind 无法修改箭头函数的指向
- 箭头函数没有原型

## 9. apply,call,bind的区别，apply怎么实现bind
1. 相同点
- 这个三个方法都是用来改变this指向的

2. 区别
- apply和call是改变this指向，然后执行函数。bind是改变this指向，然后返回函数
- apply和call第二个参数不同，apply是一个数组，call是一个一个参数

3. 场景
- 判断数据类型，Object.prototype.toString.call()
- 将伪数组转为数组 Array.prototype.slice.call(arguments)
- 继承

## 10. 解释下变量提升
1. 什么是变量提升
js是个解释执行的，会先进行预解析再执行的过程。预解析阶段就是一个编译的过程，包括词法分析，语法分析，预编译，执行。
在预解析的过程会全局搜索所有的变量和函数并且将变量或者的声明提升到当前作用域的顶端， 不改变其他的顺序

2. 变量提升的规则
- 变量提升和函数提升，函数的优先级高于变量
- 函数又分函数声明式和函数表达式，函数声明式会将内容一起提升到当前作用域的顶端


## 11. 闭包的理解
1. 什么是闭包
- 闭包会涉及到作用域，js是一个解释执行的语言，分解释和执行两个阶段，解释阶段词法分析，语法分析，作用域规则确定，也就是访问一个变量的规则。作用域又分函数作用域和全局作用域，函数中变量的作用域就是属于函数作用域，在函数执行完后作用域就会清理、内存也随之回收。但是由于闭包是建立在一个函数内部的子函数，由于它可以访问上级作用域的原因，及时上级函数执行完，作用域也不会随之销毁，这时的子函数也就是闭包，拥有了访问上级作用域中变量的权限，即使上级函数执行完后作用域内的值也不会被销毁。闭包是有权访问其他函数作用域的变量的函数，闭包相当于缓存了上级的作用域

2. 闭包的场景
- 防抖节流、设置私有变量，使用闭包设计单例模式


## 12. 深拷贝和浅拷贝
- 浅拷贝是复制一直对象的指针，并不创建新对象，新旧对象指向同一块地址。比如Object.assign(),数组的slice(),展开运算符
- 深拷贝是重新创建一个一模一样的对象，新旧对象互不影响。比如先JSON.stringify()，再JSON.parse(),缺点就是在处理空值undefined的时候会报错，lodash的deepClone()方法

```
function cloneDeep(obj) {
  // 判断不是对象
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let result
  // 判断是数组还是对象
  if (Array.isArray(obj)) {
    result = []
  } else {
    result = {}
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = cloneDeep(obj[key])
    }
  }
}
```
## 13. 原型和原型链
- 首先原型的作用是其实就是继承，是共享方法和属性的抽离，减少重复声明和空间开辟的浪费
- js把对象中公共方法或属性抽离放到一个对象中，也就是原型对象，然后再new的过程中让实例对象的隐式原型（__proto__）去引用这个原型，而且抽离公共方法的这个原型对象（prototype）也是一个对象实例，他也有隐式原型(__proto__),他的隐式原型执行也会指向一个原型对象，这样由隐式原型(__proto__)串起的路径就是就形成一个链路，也就是原型链
- 当我们访问对象的某个属性的时候，先回去本身查找，如果找不到就会根据隐式原型找到原型对象上找，找不到就继续往上找。最后回到达Object prototype,它的隐式原型指向null，若均无结果返回undefined

## 14. 作用域的理解
1.什么是作用域
- 作用域其实就是JS引擎如何寻找变量以及会在何处找到变量的规则，作用域分全局作用域、函数作用域、块级作用域
- 当我们一个变量当前作用域定义，它就成了一个自由变量
- 自由变量会一直往父级作用域去，形成一个链式结构
## 15. new关键字的作用
1. 创建一个空对象
2. 将新创建的对象隐式原型执行我们构造函数的显示原型，这样就有了obj->Animal.prototype->Object.prototype->null的原型链
3. 通过call改变this的执行为新创建的对象，传入参数，执行构造函数，进行属性和方法的赋值操作
4. 根据构造函数的返回的结果，如果返回的是一个基本类型，就返回当前的生成的对象。如果返回的是一个引用类型，就直接返回

```
function Animal(name){
  this.name = name

  this.say = function () {
        console.log(`my name is ${this.name}`)
    }
}

let bird = new Animal('bird');
```

伪代码模拟new的过程
```
var obj = {}
obj.__proto__ = Animal.prototype
var result = Animal.call(obj,'bird')
return typeof result === 'object' ? result : obj
```
## 16. js是实现继承的几种方式
1. 原型链继承
- 核心
  - 子类的原型指向父类的实例
- 优点
  - 由于方法是定义在父类的原型对象上，复用了构造函数的方法
- 缺点
  - 子类无法传参
  - 子类的实例共享了构造函数中的引用属性
  - 无法实现多继承

```
function Person(name) {
  this.name = name
  this.house = [1,3]
}

Person.prototype.say = function() {
  console.log('hello')
}

function Child(age) {
  this.age = age
}
// 子类的原型指向父类的实例
Child.prototype = new Person()
// 修正constructor的指向
CHild.prototype.constructor = Child
```

2. 借用构造函数
- 核心
  - 子类构造函数里借用父类构造函数，等于复制父类的实例给子类
- 优点
  - 实例之间独立，不共享属性
  - 子类可以传参
  - 可以实现多继承，利用call或者apply继承多个父类
- 缺点
  - 父类的方法不能复用，每次创建子类实例都会要将方法重新创建一遍，性能浪费
  - 无法继承父类原型上的属性，因为没有用到原型

```
function Person(name) {
  this.name = name
  this.house = [1,3]
  this.say = function() {
    console.log('hello')
  }
}

function Child(name, age) {
  // 核心拷贝了父类实例的属性和方法
  Person.call(this, name)
  this.age = age
}
```

3. 组合继承
- 核心
  - 通过调用父类构造函数，继承父类的属性并保留传参；然后通过将父类的实例作为子类的构造函数，实现函数复用
- 优点
  - 保留了构造函数的特点，可传参
  - 保留了原型链的特点，父类的方法定义在父类的原型对象上，实现了函数的复用
  - 不共享父类属性，实例独立
- 缺点
  - 调用了两次父类构造函数的方法，会存多余的一份实例属性(call调用了一次，指定原型对象的时候调用第二次)

```
function Person(name) {
  this.name = name
}

Person.prototype.say = function() {
  console.log('hello')
}

function Child(name, age) {
  // 第一次调用
  Person.call(this,name)
  this.age = age
}

// 第二次调用
Child.prototype = new Parent()
Child.prototype.constructor = Child

```

4. 组合继承优化
- 核心
  - 子类构造函数调用父类构造函数，子类的原型直接指向父类构造函数的原型
- 优点
  - 避免了两次调用构造函数
  - 保留了构造函数的特点，创建实例并且可以传参
  - 保留了原型链的特点，父类的实例方法定义在原型对象上，实现方法复用
- 缺点
  - 修改了原型的指向，父类的原型也会发生变化

```
function Person(name) {
  this.name = name
}

Person.prototype.say = function() {
  console.log('hello')
}

function Child(name, age) {
  Person.call(this,name)
  this.age = age
}
// 核心 子类原型和父类原型是同一个
Child.prototype = Parent.prototype

<!-- 修正构造函数指向的代码 -->
Child.prototype.constructor = Child
let c1 = new Child('张三'，'18')
let p1 = new Person('李四')

console.log(c1.constructor); // Child
console.log(p1.constructor); // Child
// 这个时候父类的构造函数的指向也会发生改变

```

4. 寄生组合继承
- 核心
  - 通过Object.create()创建中间对象，子类原型和父类原型隔离，不是同一个就能避免constructor的问题
- 优点
  - 保留了构造函数的特点，创建一个实例，传入参数
  - 保留原型链的特点，父类的实例方法定义在原型对象上，实现方法复用
  - 创建的实例独立
- 缺点
  - 完美

```
  function Person(name) {
    this.name = name
  }

  Person.prototype.say = function() {
    console.log('hello')
  }

  function Child(name, age){
    Person.call(this, name)
    this.age = age
  }

  Child.prototype = Object.create(Person.prototype)

  // 修复构造函数的指向
  Child.prototype.constructor = Child
```

5. ES6的继承
- 核心
  - ES6中引入了class关键字，class可以通过extends关键字实现继承
- 优点
  - 简单明了
- 缺点
 - 并不是所有的浏览器都支持class关键字
- 注意和ES5继承的区别
 - ES5的继承是先创建子类的实例对象的this，然后把父类的方法加上；ES6继承实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this

```
class Person {
  constructor(name){
    this.name = name
  }

  say() {
    console.log('hello')
  }
}

class Child extends Person {
  constructor(name, age){
    super(name)
    this.age = age
  }

  eat() {
    console.log('eat')
  }
}

let c = new Child('张三',19);


```



## 17. js的垃圾回收机制
1. 什么是垃圾回收机制
- js会定期对我们那些不在被使用的变量和对象所占用的内存进行释放

2. 垃圾回收的方式
- js垃圾回收有两种方式，一是标记清除，二是引用计数
- 标记清除是当变量进入执行栈的时候，会标记一个“进入环境”。当变量离开执行环境，会标记一个“离开环境”。被标记“进入环境”的不能被回收，因为正在被引用。“离开环境”的就可以被回收
- 引用计数，就是计算变量被引用的次数，当次数我0就可以回收了。
- 内存泄露就是不在需要的内存，因为某些原因，不能被释放，例如定时器和全局变量


## 18. 防抖和节流
- 防抖和节流都是控制函数频率的一个函数
- 防抖函数是值在一段时间内连续触发，只有最后一次执行。就比如生活中的公交车，在一段时间内有人一直上车那么公交车就不会启动，只要没人上传了，司机才会开车
```
function debounce(fn, delay) {
  let timer = null
  return function() {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this,arguments)
    }, delay)
  }
}
```
- 节流函数是在一定时间内函数只执行一次

```
function throttle(fn, delay){
  let timer = null
  return function() {
    if(timer){
      return
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      },delay)
    }
  }
}
```


## 19. event loop的理解
1. 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数
2. 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
3. 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
4. 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

- 微任务：Promise、process.nextTick、Object.observe(已废弃)、MutationObserver
- 宏任务：script、setTimeout、setInterval、setImmediate

## 20. ES6 Module 和 commonJs区别

## 21. 对设计模式的了解





