# Basics

## Compiling Vue

```javascript
const vm = new Vue({
    data: {
        msg: 'hello'
    }
})

vm.$mount('#app')
```

or

```javascript
const vm = new Vue({
    data: {
        msg: 'hello'
    }
}).$mount('#app')
```

`el:"app"` = same as `vm.$mount('#app')`

## Vue script

`http://unpkg.com/vue` includes template compiler, templates are compiled inside the browser.
= very fast!

## Vue attributes

anything that starts with v- can contain javascript

```html
<div v-html="someContent + '!!'"></div>
```

## v-directive-argument

```html
<div v-bind:id="someId + 123"></div>
```

`v-` -> vue

`bind` -> name of the directive

`:id` -> argument

short:
```html
<div :id="someId + 123"></div>
```

## :class

```html
<div :class="{ active }">div</div>
```

same as 

```html
<div :class="{ active: active }">div</div>
```

-> applies class `active` (first 'active') if property `active` is true

## template element

```html
<template v-if="show">
    <div>some content</div>
</template>
```

`template` is no container. So if `show` is true, html will be:

```html
<div>some content</div>
```

## v-for

```html
<div v-for="nr of arr"></div>
```

same as

```html
<div v-for="nr in arr"></div>
```

-> works for array and object

## key attribute

When DOM changes, inner text changes by default. Nothing moves around.
If you actually want to move things around, you use the key attribute. For example when you want the elements to keep their state.

## v-on

```html
<button v-on:click>Click</div>
```
same as
```html
<button @click>Click</div>
```

## Computed

Computed properties only recalculate when used variables are updated.

```javascript
new Vue({
    el: '#app',
    data: {
        foo: 'foo',
        bar: 'bar'
        now: Date.now()
    },
    computed: {
        reversedFoo () {
            return this.foo.split('').reverse().join('') + this.now;
        }
    }
})
```

`reversedFoo` will only recalculate when `foo` (=dependency) changes, not when `bar` changes.

It will not recalculate when Date.now() changes since it's not a vue dependency.
Solution: add `Date.now()` as a vue data variable.

Computed = derived state. Does not come from a database or so, but from other data variables.

## Watch

Side effects = event that doesn't fit in the Vue lifecycle.
Use watchers to take these into account.

### Watch arrays

```javascript
new Vue({
    el: '#app',
    data: {
        arr: [1, 2, 3]
    },
    watch: {
        arr (newVal, oldVal) {
            // side effects
        }
    }
})
```

In the example above: if you do `this.arr.push(4)` oldVal and nexVal will be the same.
Use `this.arr = this.arr.concat(5)` in order to have a different new and old value, since a new array is created.

# Components

## key attribute

If key attribute is not used with v-for, data variables may mix up.

Example: 
```html
<todo v-for="todo in todos" :todo="todo.desc" key=":todo.id">
```
```javascript
Vue.component('todo',  {
    template: "<div @click="editMode = !editMode">{{todo.desc}}</div>"
    data() {
        editMode: false
    }
})

vm = new Vue({
    data: {
        todos: [
            {id: 0, desc: "todo 1"},
            {id: 1, desc: "todo 2"}
        ]
    }
})
```

If you click on todo 1 to put it in editMode.
Without key: `vm.todos.reverse()` will reload the text of the todo element. So todo 2 will be first, then todo 1.
But editMode will still be true on the first element (which is now todo 2), and false on the second element (which is nox todo 1).
Key solves this problem because it changes the order of the elements instead of reloading the inner HTML.

## Destroy

Make sure to destroy things that are not vue-related, that you have put in a vue component, like a timer.

## Props

Props are passed by reference, but should not be changed inside a component. It does not sync back to the parent.
How to sync with parent? $emit --> syntax sugar: `:foo.sync`

```html
<my-component :foo.sync="foo"></my-component>
```

```javascript
Vue.component('my-component', {
    props: {
        foo: string
    },
    template: `<div @click="foo = 123">`
})

vm = new Vue({
    data: {
        foo:"foo"
    }
})
```

## v-model

```html
<my-input v-model="inputValue"></my-input>
```
```javascript
Vue.component('my-input', {
    props: ['value'],
    template: `<input :value="value">`
})
```

Use of `v-model` sets up an event listener for you.

```html
<my-input :value="inputValue" @input="inputValue = arguments[0]"></my-input>
```

If you just use `:value="inputValue"`, inputValue will not be updated towards the parent.

## Slots

```html
<div id="app">
    <app>
        <div slot="header">header {{msg}}</div>
        <div slot="footer">footer</div>
        <div slot="content">content</div>
        <span slot=header>another header</span>
    </app>
</div>
```

```javascript
Vue.component('app', {
    template: `
        <div>
        <slot name="header"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
        </div>`
})

new Vue({
  el: "#app",
  data: {
    msg: 'hello'
  }
})
```

will result in

```html
<div>header hello</div>
<span>another header</span>
<div>content</div>
<div>footer</div>
```

# Transition

## Key

```html
<transition name="fade">
    <div v-if="ok" key="ok">ok</div>
    <div v-else key="nok">not ok</div>
</transition>
```

Key needed to see the animation. Without key the content of the div changes, so not the visibility of the div.

# Vue-cli

## Render Vue

```javascript
new Vue({
    el: "#el",
    render: h => h(App)
})
```
same as
```javascript
new Vue({
    el: "#el",
    components: [ App ],
    template: `<app/>`
})
```

`template` and `components` need template compiler.

`render` function renders the template itself, so doesn't need the template compiler anymore.

## Import

```javascript
import App from './App.vue'
```

Always specify `.vue` for vue files!


# Vuex

```javascript
new Vuex.store({
    state: {},
    actions: {},
    mutations: {},
    getters: {}
})
```

Store is a mini client-side database.
- actions: make changes to the database
- mutations: writing in the database
- getters: query from database (like computed on component level)

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

