# JSX

在 React 中使用 JSX 语法描述用户界面，它是一种 JavaScript 语法扩展。

在 React 代码执行之前，Babel 会将 JSX 语法转换为标准的 JavaScript API。

JSX 语法就是一种语法糖，让开发人员使用更加舒服的代码构建用户界面。

## 在 JSX 中使用表达式

```jsx
const user = {
  firstName: "xiao",
  lastName: "mimg",
};
function formatName(user) {
  return user.firstName + " " + user.lastName;
}
const element = <h1>Hello, {formatName(user)}!</h1>;
```

JSX 本身其实也是一种表达式，将它赋值给变量，当作参数传入，作为返回值都可以。

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

## 属性

如果属性值为字符串类型，需要加引号，属性名称推荐采用驼峰式命名法。

```jsx
const element = <div greeting="hello"></div>;
```

如果属性值为 JavaScript 表达式，属性值外面加大括号。

```jsx
const element = <img src={user.avatarUrl} />;
// 注意大括号外面不能加引号，JSX 会将引号当中的内容识别为字符串而不是表达式
```

## className

为 JSX 标记添加类名需要使用 className，而不是 class。

```jsx
const element = <img src={user.avatarUrl} className="rounded" />;
```

## 自动展开数组

```jsx
const ary = [<p>第一</p>, <p>第二</p>, <p>第三</p>];
const element = <div>{ary}</div>;
// 解析后
/*
	<div>
		<p>第一</p>
		<p>第二</p>
		<p>第三</p>
	</div>
*/
```

## 三元运算

```jsx
{
  boolean ? <div>Hello React</div> : null;
}
{
  boolean && <div>Hello React</div>;
}
```

## 循环

```js
const persons = [
  {
    id: 1,
    name: "张三",
    age: 20,
  },
  {
    id: 2,
    name: "李四",
    age: 15,
  },
  {
    id: 3,
    name: "王五",
    age: 22,
  },
];
```

```jsx
<ul>
  {persons.map((person) => (
    <li key={person.id}>
      {person.name} {person.age}
    </li>
  ))}
</ul>
```

## 事件

```jsx
/* 第一个参数即是事件对象 不需传递 */
<button onClick={this.eventHandler}>按钮</button>;
/* 需要传递事件对象 */
<button onClick={(e) => this.eventHandler("arg", e)}>按钮</button>;
/* 最后一个参数即是事件对象 不需传递 */
<button onClick={this.eventHandler.bind(null, "arg")}>按钮</button>;
```

```jsx
constructor () {
  this.eventHandler = this.eventHandler.bind(this)
}
eventHandler () {}
<button onClick={this.eventHandler}>按钮</button>
```

## 样式

### 行内样式

```jsx
class App extends Component {
  render() {
    const style = { width: 200, height: 200, backgroundColor: "red" };
    return <div style={style}></div>;
  }
}
```

### 外链样式

```jsx
// Button.js
import styles from "./Button.module.css";
class Button extends Component {
  render() {
    return <button className={styles.error}>Error Button</button>;
  }
}
```

### 全局样式

```jsx
import "./styles.css";
```

## ref 属性

### createRef

```jsx
class Input extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }
  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
        <button onClick={() => console.log(this.inputRef.current)}>
          {" "}
          button{" "}
        </button>
      </div>
    );
  }
}
```

### 函数参数

```jsx
class Input extends Component {
  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.input = input)} />
        <button onClick={() => console.log(this.input)}>button</button>
      </div>
    );
  }
}
```

### ref 字符串

```jsx
class Input extends Component {
  render() {
    return (
      <div>
        <input type="text" ref="username" />
        <button onClick={() => console.log(this.refs.username)}>button</button>
      </div>
    );
  }
}
```

### 获取组件实例

::: tip 获取组件实例
点击按钮让 input 文本框获取焦点。

input 文本框以及让文本框获取焦点的方法定义在 Input 组件中，在 App 组件中引入 Input 组件，按钮定义在 App 组件中。
:::

```jsx
// Input.js
class Input extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.focusInput = this.focusInput.bind(this);
  }
  focusInput() {
    this.inputRef.current.focus();
  }
  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
      </div>
    );
  }
}
```

```jsx
// App.js
class App extends Component {
  constructor() {
    super()
    this.InputComponentRef = React.createRef()
  }
  render() {
    return (
      <div className="App">
        <Input ref={this.InputComponentRef} />
        <button onClick={() => this.InputComponentRef.current.focusInput()}>button</button>
      </div>
    )
}
```
