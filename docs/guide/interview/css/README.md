# 前言

这里记录面试所遇到的 css 的一些问题，知识在于积累，量变引起质变。

## 1. 一个盒子垂直水平居中有哪些方法

1. flex 布局

```
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}

```

2. 绝对定位 + transform

```
.father{
  position: relative;
}
.son{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% ,-50%);
}
```

3. 绝对定位 + margin: auto

```
.father {
  position: relative;
}

.son {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```

4. 绝对定位 + 负 margin

```
.father {
  position: relative;
}

.son {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

## 2. 两种盒子模型

- 标准盒模型：box-sizing: content-box;

- 怪异盒模型: box-sizing: border-box;

- 区别是标准盒模型的宽度是指的内容 content 的宽度，怪异盒模型是指 content + border + padding 的宽度

## 3. 对 BFC 的理解

1. 什么是BFC
- 可以将 BFC 看做元素的一个属性，一旦元素触发 BFC,那么这个元素可以看做是一个独立隔离的容器，容器里的布局不会影响容器外的容器，比如浮动布局，绝对定位，固定定位
2. 触发BFC条件
- 浮动、绝对定位、固定定位、overflow 值不为 visible 等都可以触发 BFC
3. BFC的应用场景
- 清除浮动，上下边距重叠，阻止元素被浮动元素覆盖

## 4. 清除浮动的方法及优缺点

1. 在尾部增加子元素添加 clear:both

缺点：增加了无效的标签

```
<div class="box">
     <div class="son1"></div>
     <div class="clearboth1"></div>
</div>

.clearboth1 {
  clear: both;
}
```

2. 利用overflow：hidden来触发BFC

缺点：无法配合position使用，超出会隐藏

```
.box {
  overflow: hidden;
}
```

3. 在父元素添加伪元素(推荐)
```
.box::after{
  content: '';
  display: block;
  height: 0;
  clear: both;
}
```

## 5. 伪类和伪元素的区别
- 伪类是定义的一种状态，比如:hover,:active,:visited
- 伪元素是用来创建一些dom树不存在的元素，比如::after,::before
- 写法上伪类是一个冒号，伪元素是两个冒号

## 6. css中哪些属性可以继承
- 字体相关的属性，font、font-size、font-family等
- 文本相关的属性，color、direction、text-aligin
- 可见属性，visibility

## 7. 重排和重绘
1.浏览器渲染的过程
- 页面渲染的时候会将html解析成DOM树，css解析成CSSOM树(css对象模型)，然后DOM树和CSSOM树结合生成渲染树(render tree)，然后浏览器根据渲染树进行重排进行布局，最后进行重绘绘制显示页面


2.重排和重绘的触发条件
- 页面布局或者大小发生改变触发重排，比如DOM的增加和删除，改变元素的位置大小，访问某些属性width,offsetWidth等
- 当元素的外观发生改变就会触发重绘，例如改变元素的color，boder,visibility等
- 重排一定引起重绘

3.优化
 - js尽量减少对样式的操作，能用css就用css
 - 减少对dom的操作，能用createDocumentFragment的地方就用
 - 尽量用transform代替位移，使用visibility代替display：none

 ## 8.display的几个属性，并有什么特点
 1.diplay: block;

 - 块级元素独占一行
 - 可以设置宽和高
 - 可以设置margin和padding

 2.diplay: inline;

 - 行内元素，与其他行内元素同在一行
 - 不能设置宽高，宽高是内容撑开
 - 

 3.display: inline-block;
 - 行内块级元素，就是不占一行的块级元素
 - 可以设置宽高
 - 可以设置margin和padding


