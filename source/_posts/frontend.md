---
title: 前端编码规范示例
date: 2022-09-09 15:30:06
tags: 前端、语法检查、编码规范
cover: https://livissnack.oss-cn-shanghai.aliyuncs.com/img/bg2.jpg
---



# 前端编码规范示例

## 一、概述

编码请严格遵循一下规范编写！

## 二、规范示例

#### 1、变量相关

##### （1）定义变量（滥用变量）

```text
  NO：滥用变量:
```

```javascript
let kpi = 4;  // 定义好了之后再也没用过
function example() {
	var a = 1;
	var b = 2;
	var c = a+b;
	var d = c+1;
	var e = d+a;
	return e;
}
```

```text
 YES: 数据只使用一次或不使用就无需装到变量中
```

```javascript
let kpi = 4;  // 没用的就删除掉，不然过三个月自己都不敢删，怕是不是那用到了
function example() {
	var a = 1;
	var b = 2;
	return 2*a+b+1;
}
```

##### （2）变量命名

```text
  NO：自我感觉良好的缩写:
```

```javascript
let fName = 'jackie'; // 看起来命名挺规范，缩写，驼峰法都用上，ESlint各种检测规范的工具都通过，But，fName是啥？这时候，你是不是想说What are you 弄啥呢？
let lName = 'willen'; // 这个问题和上面的一样
```

```text
 YES：无需对每个变量都写注释，从名字上就看懂
```

```javascript
  let firstName = 'jackie'; // 怎么样，是不是一目了然。少被喷了一次
  let lastName = 'willen';
```

##### （3）特定的变量

```text
  NO：无说明的参数:
```

```javascript
if (value.length < 8) { // 为什么要小于8，8表示啥？长度，还是位移，还是高度？Oh,my God!!
	....
}
```

```text
 YES：添加变量
```

```javascript
const MAX_INPUT_LENGTH = 8;
if (value.length < MAX_INPUT_LENGTH) { // 一目了然，不能超过最大输入长度
	....
}
```

##### （4）啰嗦的变量名称

```text
  NO：命名过于啰嗦:
```

```javascript
let nameString;
let theUsers;
```

```text
 YES：做到简洁明了
```

```javascript
let name;
let users;
```

##### （5）使用说明性的变量(即有意义的变量名)

```text
  NO：长代码不知道啥意思:
```

```javascript
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(
  address.match(cityZipCodeRegex)[1], // 这个公式到底要干嘛，对不起，原作者已经离职了。自己看代码
  address.match(cityZipCodeRegex)[2], // 这个公式到底要干嘛，对不起，原作者已经离职了。自己看代码
);
```

```text
 YES：用变量名来解释长代码的含义
```

```javascript
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```

##### （6）避免使用太多的全局变量

```text
  NO：在不同的文件不停的定义全局变量:
```

```javascript
name.js
window.name = 'a';
hello.js
window.name = 'b';
time.js
window.name = 'c';  //三个文件的先后加载顺序不同，都会使得window.name的值不同，同时，你对window.name的修改了都有可能不生效，因为你不知道你修改过之后别人是不是又在别的说明文件中对其的值重置了。所以随着文件的增多，会导致一团乱麻。
```

```text
 YES：少用或使用替代方案 你可以选择只用局部变量。通过(){}的方法
```

```javascript
如果你确实用很多的全局变量需要共享，你可以使用vuex,redux或者你自己参考flux模式写一个也行。
```

##### （7）避免使用太多的全局变量

```text
  NO：对于求值获取的变量，没有兜底:
```

```javascript
const MIN_NAME_LENGTH = 8;
let lastName = fullName[1];
if(lastName.length > MIN_NAME_LENGTH) { // 这样你就给你的代码成功的埋了一个坑，你有考虑过如果fullName = ['jackie']这样的情况吗？这样程序一跑起来就爆炸。要不你试试。
    ....
}
```

```text
 YES：对于求值变量，做好兜底
```

```javascript
const MIN_NAME_LENGTH = 8;
let lastName = fullName[1] || ''; // 做好兜底，fullName[1]中取不到的时候，不至于赋值个undefined,至少还有个空字符，从根本上讲，lastName的变量类型还是String，String原型链上的特性都能使用，不会报错。不会变成undefined。
if(lastName.length > MIN_NAME_LENGTH) {
    ....
}
其实在项目中有很多求值变量，对于每个求值变量都需要做好兜底。
let propertyValue = Object.attr || 0; // 因为Object.attr有可能为空，所以需要兜底。
但是，赋值变量就不需要兜底了。
let a = 2; // 因为有底了，所以不要兜着。
let myName = 'Tiny'; // 因为有底了，所以不要兜着。
```

#### 2、函数相关

##### （1）函数命名

```text
  NO：从命名无法知道返回值类型:
```

```javascript
function showFriendsList() {....} // 现在问，你知道这个返回的是一个数组，还是一个对象，还是true or false。你能答的上来否？你能答得上来我请你吃松鹤楼的满汉全席还请你不要当真。
```

```text
 YES：对于返回true or false的函数，最好以should/is/can/has开头
```

```javascript
function shouldShowFriendsList() {...}
function isEmpty() {...}
function canCreateDocuments() {...}
function hasLicense() {...}
```

##### （2）功能函数最好为纯函数

```text
  NO：不要让功能函数的输出变化无常:
```

```javascript
function plusAbc(a, b, c) {  // 这个函数的输出将变化无常，因为api返回的值一旦改变，同样输入函数的a，b,c的值，但函数返回的结果却不一定相同。
		var c = fetch('../api');
		return a+b+c;
}
```

```text
 YES：功能函数使用纯函数，输入一致，输出结果永远唯一
```

```javascript
function plusAbc(a, b, c) {  // 同样输入函数的a，b,c的值，但函数返回的结果永远相同。
		return a+b+c;
}
```

##### （3）函数传参

```text
  NO：传参无说明:
```

```javascript
page.getSVG(api, true, false); // true和false啥意思，一目不了然
```

```text
 YES：传参有说明
```

```javascript
page.getSVG({
	imageApi: api,
	includePageBackground: true, // 一目了然，知道这些true和false是啥意思
	compress: false,
})
```

##### （4）动作函数要以动词开头

```text
  NO：无法辨别函数意图:
```

```javascript
function emlU(user) {
	....
}
```

```text
 YES：动词开头，函数意图就很明显
```

```javascript
function sendEmailToUser(user) {
    ....
}
```

##### （5）一个函数完成一个独立的功能，不要一个函数混杂多个功能

```text
  NO：函数功能混乱，一个函数包含多个功能。最后就像能以一当百的老师傅一样，被乱拳打死（乱拳（功能复杂函数）打死老师傅（老程序员））
```

```javascript
function sendEmailToClients(clients) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client)
    if (clientRecord.isActive()) {
      email(client)
    }
  })
}
```

```text
 YES：功能拆解
```

```javascript
function sendEmailToActiveClients(clients) {  //各个击破，易于维护和复用
  clients.filter(isActiveClient).forEach(email)
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client)
  return clientRecord.isActive()
}
```

##### （6）优先使用函数式编程

```text
  NO：使用for循环编程
```

```javascript
for(i = 1; i <= 10; i++) { // 一看到for循环让人顿生不想看的情愫
   a[i] = a[i] +1;
}
```

```text
 YES：使用函数式编程
```

```javascript
let b = a.map(item => ++item) // 怎么样，是不是很好理解，就是把a的值每项加一赋值给b就可以了。现在在javascript中几乎所有的for循环都可以被map,filter,find,some,any,forEach等函数式编程取代。
```

##### （7）函数中过多的采用if else ..

```text
  NO：if else过多
```

```javascript
if (a === 1) {
	...
} else if (a ===2) {
	...
} else if (a === 3) {
	...
} else {
   ...
}
```

```text
 YES：可以使用switch替代或用数组替代
```

```javascript
switch(a) {
   case 1:
   	    ....
   case 2:
   		....
   case 3:
   		....
  default:
   	....
}
Or
let handler = {
    1: () => {....},
    2: () => {....}.
    3: () => {....},
    default: () => {....}
}

handler[a]() || handler['default']()
```

#### 3、ES6优化一些写法

##### （1）尽量使用箭头函数

```text
  NO：采用传统函数
```

```javascript
function foo() {
  // code
}
```

```text
 YES：使用箭头函数
```

```javascript
let foo = () => {
  // code
}
```

##### （2）字符串拼接

```text
  NO：传统拼接（+）
```

```javascript
let message = 'Hello ' + name + ', it\'s ' + time + ' now'
```

```text
 YES：采用模板字符
```

```javascript
let message = `Hello ${name}, it's ${time} now`
```

##### （3）解构赋值

```text
  NO：传统赋值
```

```javascript
var data = { name: 'dys', age: 1 };
var name = data.name;
var age = data.age;

var fullName = ['jackie', 'willen'];
var firstName = fullName[0];
var lastName = fullName[1];
```

```text
 YES：解构赋值
```

```javascript
const data = {name:'dys', age:1};
const {name, age} = data;   // 怎么样，是不是简单明了

let fullName = ['jackie', 'willen'];
const [firstName, lastName] = fullName;
```

##### （5）使用async、await替代then（回调地狱式）

```text
  NO：回调地狱写法
  如果嵌套4、5层根本没法写下去
```

```javascript
    handleSubmit1() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          save(this.form).then((res) => {
            if (res.data.code === 200) {
              this.$message({ type: 'success', message: '保存成功!' });
            } else {
              this.$message({ type: 'error', message: '保存失败!' });
            }
          }).then(() => {
            this.$router.push({ path: '/adBanner/list' });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
```

```text
 YES：async和await写法
```

```javascript
    async handleSubmit() {
      await this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          const { data } = await save(this.form)
          if (data.code === 200) {
            this.$message({ type: 'success', message: '保存成功!' });
            await this.$router.push({ path: '/adBanner/list' });
          } else {
            this.$message({ type: 'error', message: '保存失败!' });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
```

#### 4、语法检查、代码缩进等

##### （1）eslint语法检查
编译检查是否通过

```text
糟糕的代码编译示例
```
![糟糕示例](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=13c3aabc09526792fac74236d9a3c437)

```text
优秀的代码编译示例
```
![优秀示例](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=7d2008eff5862982eecad2ce835475b9)

##### （2）webstrom代码质量检查

```text
糟糕的代码示例
编辑器右上角四种类型代码质量图标（红色：错误、黄色：警告、灰色：弱警告、绿色：单词拼写错误）

编辑器右边颜色标线，标出问题代码位置
```

![糟糕示例](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=ece6bf153176a56aa55a44b85d141e1e)

```text
优秀的代码示例
代码检测全部ok
```

![优秀示例](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=e51f9a5f70dce8a22b4ebef1a1fd5a85)
##### （3）代码缩进等


