# Hooks

`16.8`版本及以上

对函数型组件进行增强，让函数型组件可以存储状态，可以拥有处理副作用的能力，让开发者在不使用类组件的情况下，实现相同功能。

## useState()

用于为函数组件引入状态

```js
import React, { useState } from 'react'

function App (props) {
  const [count, setCount] = useState(0)
  const [person, setPerson] = useState({name: "张三", age: 20})
  const [name, setName] = useState(() => {
    return props.name || '张三'
  })
  return (
    <div>
      <div>
        <span>{count}</span>
        <button onClick={ () => { setCount(count + 1) } }>+ 1</button>
        <button onClick={ () => { setCount(count => count + 1) } }>+ 1</button>
      </div>
      <div>
        {person.name}-{person.age}
        <button onClick={ () => { setPerson(...person, name: "李四") } }>改变</button>
      </div>
    </div>
  )
}
```

- 接受唯一的参数即初始状态值，初始值可以是任意数据类型
- 返回值为数组，数组中存储状态值和改变状态值的方法，方法名称约定以`set`开头，后面加上状态名称
- 方法可以被调用多次，用以保存不同的状态值
- 参数可以是一个函数，函数返回什么，初始状态就是什么，函数只会被调用一次，用在初始值是动态值的情况
- 设置状态值的方法可以说一个值，也可以是一个函数
- 设置状态值的方法本身是异步的

## useEffect()

让函数型组件拥有处理副作用的能力，类似生命周期函数

- `useEffect(() => {})`            => `componentDidMount、componentDidUpdate`
- `useEffect(() => {}, [])`        => `componentDidMount`
- `useEffect(() => {} => {})`      => `componentWillUnMount`

1. 按照用途将代码进行分类(将一组相关的业务逻辑放到同一个副作用函数中)
2. 简化重复代码，使组件内部代码更加清新
3. 只有指定数据发生变化时触发`effect`(第二个参数)

## useReducer()

## useRef()

### 获取`DOM`元素对象

```js
import React, { useRef } from 'react'

function App () {
  const username = useRef()
  const handler = () => {
    console.log(username.current)
  }
  return (
    <input ref={usernam} onChange={() => { handler() }} />
  )
}

```

### 父组件调用子组件方法

```js
// 子组件
import React, { useImperativeHandle } from 'react'

export default const Child = ({childRef}) => {
  useImperativeHandle(childRef, () => ({
    refresh: () => {
      console.log('刷新')
    }
  }))
  return (
    <span>child</span>
  )
}
```

```js
// 父组件
import React, { useRef } from 'react'

export default const Rarent = () => {
  const childRef = useRef()

  const getRefresh = () => {
    childRef.current.refresh()
  }

  return (
    <button onClick={() => { getRefresh() }}>刷新</button>
    <Child childRef={childRef} />
  )
}
```

### 保存数据(跨组件周期)

即使组件重新渲染，保存的数据仍然存在，保存的数据被更改不会触发组件重新渲染

```js
import React, { useState, useEffect, useRef } from 'react'

function App () {
  const [count, setCount] = useState(0)
  let timerId = useRef()

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCount(count => count +1)
    }, 1000)
  }, [])

  const stopCount = () => {
    clearInterval(timerId.current)
  }

  return (
    <div>
      {count}
      <button onClick={ () => { stopCount() } }></button>
    </div>
  )
}
```

## useCallback()

性能优化、缓存函数，使组件重新渲染时得到相同的函数实例

```js
import React, { useState } from 'react'

function App (props) {
  const [count, setCount] = useState(0)
  const resetCount = useCallback(() => {
    setCount(0)
  }, [setCount])
  return (
    <div>
      <div>
        <span>{count}</span>
        <button onClick={ () => { setCount(count + 1) } }>+ 1</button>
      </div>
      <Test resetCount={resetCount} />
    </div>
  )
}
```

## useContext()

## useMemo()

类似`vue`中的计算属性,可以监测某个值的变化，根据变化值计算新值

会缓存计算结果，如果监测值没有发生变化，即使组件重新渲染，也不会重新计算。此行为可以避免在每个渲染上进行昂贵的计算

```js
import React, { useState, useMemo } from 'react'

function App () {
  const [count, setCount] = useState(0)
  const [bool, setBool] = useState(true)
  const result = useMemo(() => {
    console.log('test')
    return count * 2
  }, [count])

  return (
    <div>
      <span>{count}{result}</span>
      <span>{ bool ? '真' : '假' }</span>
      <button onCLick={() => { setCount(count + 1) }}>+1</button>
      <button onCLick={() => { setBool(!bool) }}>setBool</button>
    </div>
  )
}
```

## memo

性能优化。如果本组件中的数据没有发生变化，阻止组件更新。

```js
import React, { memo } from 'react'

const Counter = () => {
  return (
    <div>counter</div>
  )
}
export default memo(Counter)
```

## 路由Hooks

```js
import { useHistory, useLocation, 
useRouteMatch, useParams } from 'react-router-dom'
```
