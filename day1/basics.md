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