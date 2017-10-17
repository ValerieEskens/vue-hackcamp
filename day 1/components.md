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

Make sure to destroy things that are not vue-related, that you have ut in a vue component, like a timer.

## Props

Props are passed by reference, but should not me changed inside a component. It does not sync back to the parent.
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