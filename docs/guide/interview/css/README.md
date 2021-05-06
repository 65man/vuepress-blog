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
 - 分离读写操作
 - 减少对dom的操作，能用createDocumentFragment的地方就用
 - 尽量用transform代替位移，使用visibility代替display：none

 ## 8. display的几个属性，并有什么特点
 1.diplay: block;

 - 块级元素独占一行
 - 可以设置宽和高
 - 可以设置margin和padding

 2.diplay: inline;

 - 行内元素，与其他行内元素同在一行
 - 不能设置宽高，宽高是内容撑开
 - 设置padding都有效，设置margin只有左右有效，上下无效

 3.display: inline-block;
 - 行内块级元素，就是不占一行的块级元素
 - 可以设置宽高
 - 可以设置margin和padding

 4.display: flex;
 - 弹性布局

 ## 9. position有哪些属性，分别解释下
 - static 静态定位 正常文档流
 - relative 相对定位 以自身我参照， 脱离文档流但是还在文档流中占位置
 - absolute 绝对定位 以最近的定位祖先元素为参照，脱离文档流不占位置
 - fixed 固定定位 以浏览器窗口作为参照，脱离文档流不占位置
 - stick 粘性布局 兼容性不太好

 ## 10. 常用的布局有哪些
 1. 静态布局
 - 元素从左到右，从上到下
 2. 浮动布局
 - 根据浮动方向来并排，脱离文档流
 3. 定位布局
 - 使用position来定位
 4. 弹性布局
 - 使用flex来实现
 5. 响应式布局
 - 根据设备的尺寸来显示不同的样式，根据媒体查询来实现

## 11. 页面有三列内容，左右固定宽度，中间自适应显
1. 浮动

设置左右元素的浮动，设置中间元素margin左右的距离

2. 定位

设置左右元素的定位，设置中间元素margin左右的距离

3. 负边距

设置中间元素左浮动和margin，设置左边的元素margin-left:-100%;右边元素设置margin-left:-width;

4. flex

设置容器为flex,设置左右元素flex-basic,设置中间元素flex-grow:1


## 12. flex是怎么使用的，flex:1代表什么

- 容器的属性

```
display: flex; // 设置弹性布局
flex-direction: row; // 控制主轴
flex-wrap: nowrap; // 控制是否换行
// 是上flex-direction 和 flex-wrap 的结合
flex-flow: row nowrap;
justify-content: center; // 主轴对齐方式
align-items: center; // 侧轴对齐方式
align-content: center; // 定义了多根轴线的对齐方式,只有一根轴线不起作用

```

- 项目的属性
```
flex-order: 0; // 设置项目排列顺序
flex-grow: 0; // 设置项目的放大比例，默认不放大
flex-shrink: 1; // 设置项目的缩小比例，空间不足自动缩小
flex-basic: auto; // 设置项目的大小
// 是flex-grow flex-shrink flex-basic的结合
// 两个快捷值：auto/1(1 1 auto) 和 none(0 0 auto)
flex: 0 1 auto; // 默认值
align-self: auto; // 单个项目的排列方式，可覆盖align-items属性
```

## 13. 什么是外边距重叠
1. 原因
多个相邻盒子之间的边界没有任何内容，比如边框，内容等，造成边距重叠

2. 解决
- 外层元素加上overflow：hidden，利用BFC在让元素变成一个独立隔离的容器
- 加上padding
- 设置透明的border

## 14. rem和em的区别
rem比em多了个r,这个r代表的是root，rem是根据根节点html的font-size来计算，em是先找自身的font-sieze,没有找到就去找父元素的font-size来计算

## 15. 画一条0.5px的线
利用transform：scale(0.5);
```
.box{
  width: 200px;
  height: 200px;
  position: relative;
}

.box::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid red;
  transform-origin: 0 0;
  transform: scale(0.5)
}
```

## 16. css实现一个三角形
```
.triangle-up{
  height: 0;
  width: 0;
  border-bottom: 50px solid orange;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}
```

## 17. 使用Link和@import有什么区别？
- 从属关系：link是HTML提供的标签用来链接外部资源，@import是css提供的语法规则
- 加载顺序：加载页面的时候，link引入的css被同时加载；@import引入的要等HTML加载完后再去加载
- 兼容性：link不存在兼容性；@import在低版本的浏览器存在兼容问题
- 可控性区别：link可通过js操作，@import不能

## 17. css的优化
- 使用createDocumentFragment创建dom碎片，在它上批量操作dom，操做完在添加到文档里，只会触发一次重排
- css3动画的优化，过渡尽量使用transform和opacity
- 嵌套的层级不要超过三级
- 使用合理的选择器
- 常用样式抽离成公共样式



