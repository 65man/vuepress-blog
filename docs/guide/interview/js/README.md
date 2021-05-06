
# 前言

这里记录面试所遇到的 js 的一些问题，知识在于积累，量变引起质变。

## 1. js为什么是单线程
js的单线程主要是与它的用途有关。js是作为浏览器的脚步，主要的用途是与用户交互，以及操作DOM。这个就决定js是个单线程，否则会带来很多复杂的同步问题。比如，假设js是多线程，一个线程在某个节点添加内容，一个线程在删除这个节点，这个时候就不知道以谁为准。后面html5虽然提成web work,允许js创建多个线程，但是子线程还是受主线程的控制，且并不能操作dom，所有这并没有改变js单线程的本质

## 2. js由那几部分组成的
js是由ECMAScript和DOM(文档对象模型)以及BOM(浏览器对象模型)三部分组成
- ECMAScript其实就是一种标准，比如我们的ES5，ES6定义了js的语法，关键字，变量，数据类型等
- DOM就是将我们的页面映射成一棵DOM树，转化成js能识别操作的一个模型，提供了对节点的增删改查的一些api，比如createElement,doucument.getElementById,appendChiden,removeChild,repalceChid等
- BOM

## 2. js的数据类型
1. 基本数据类型
- string
- number
- boolean
- undefined
- null
- symbol

2. 复制数据类型
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

## 3. for和forEach的区别
- for可以指定循环的起点，forEach只能默认从0开始
- forEach不能用break跳出循环(return 也不行)
-
