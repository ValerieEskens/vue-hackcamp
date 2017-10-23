# Testing

## Jest

Preprocessor needed to have single file components.

## Mocha-webpack

```
webpack tests-input.js output.js && mocha output.js
```
input to output virtually, immediately tested by mocha without writing on disc.

# Custom directives

Use when you really have no other choice but directly touching the DOM

# Virtual DOM

Virtual DOM = json

```
{ tag: 'div', data: { attrs: {}, ... }, children: [] }
```

`<transition>` or `<template>` elements are in virtual DOM, but not in actual DOM.

## Performance

Virtual DOM comparing and stuff is a lot CPU.
Although building actual DOM and throwing it away is even more work.

Create actual DOM: js jumps to c++ to create DOM.
<-> virtual dom stays in js -> THAT's why it's cheaper.

Changes in real DOM: element or so has to be alocated.
Solution to change it all? Much more expensive and less customer friendly (input focus lost).

```html
<div>{{ foo }}</div>
```
same as 
```javascript
render (createElement) {
    return createElement('div', {}, [
        this.foo
    ])
}
```

## Render function

```javascript
new Vue({
    components: App,
    render: h => h(App)
})
```
same as
```javascript
render (h) {
    return h(App)
}
```

h = hyperscript <= hyper text <= HTML

## JSX

= extra layer on js
= language feature, but not part of the js language

like react:
```javascript
let h = <input/>
```

# Advanced component patterns

## Functional components

Functional components don't have instances.
If a component is used a lot, there's all new instances for the usages of them, that's expensive.
This can all be avoided with functional components.

Why not make all components functional?
It doesn't have `this`, so no lifecycle: no created function, no private state (= data object).

Evan recommends to not start creating functional components. But create the whole app first.
And then go over it and see which components don't have a private state, in that case they can be converted to functional components. And then you're improving the performance in your app.

## Async component

```javascript
const Foo = () => import './foo'
```

## Higher-order component

functions level: 

```javascript
function add (a, b) {
    return a + b
}
add(foo, 1)
add(bar, 1)
add(baz, 1)

function addOne (a) {
    return add(a, 1)
}
addOne(foo)
addOne(bar)
addOne(baz)


function addFactory(a) {
    return function (b) {
        return add(a, b)
    }
}
const addOne = addFactory(1)
const addTwo = addFactory(2)

```

For components this would mean you would wrap an existing component in a custom component which gives the existing component some default functionality. For example wrap the `<transition>` component in a custom `<my-transition>` component and pass some default enter and leave functions you would want to use everywhere so you don't have to repeat it everywhere where you use the `<transition>`component.

