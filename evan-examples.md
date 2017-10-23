# Day 1 Examples

## Form Bindings

```html
<script src="https://unpkg.com/vue"></script>

<div id="app">
  <input v-model="msg">

  <br>

  <input type="checkbox" v-model="checked">
  {{ checked }}

  <br>

  <input type="radio" value="one" v-model="radio">
  <input type="radio" value="two" v-model="radio">
  <input type="radio" value="three" v-model="radio">

  {{ radio }}

  <br>

  <input type="checkbox" value="one" v-model="multipleCheck">
  <input type="checkbox" value="two" v-model="multipleCheck">
  <input type="checkbox" value="three" v-model="multipleCheck">

  {{ multipleCheck }}

  <br>

  <select v-model="selected" multiple>
    <option>one</option>
    <option>two</option>
    <option>three</option>
  </select>

  {{ selected }}
</div>

<script>
const vm = new Vue({
  data: {
    msg: 'hello',
    checked: true,
    radio: 'three',
    multipleCheck: [],
    selected: 'one'
  }
}).$mount('#app')
</script>
```

## Todo List

 ```html
<script src="https://unpkg.com/vue"></script>
<style>
.done {
  text-decoration: line-through;
}
</style>

<div id="app">
  <p>
    <label v-for="m in modes">
      <input type="radio" :value="m" v-model="mode"> {{ m }}
    </label>
  </p>
  <input
    v-model="newTodo"
    @keyup.enter="addNewTodo">
  <ul>
    <li v-for="todo in filteredTodos"
      :class="{ done: todo.done }"
      @click="toggleTodo(todo)">
      {{ todo.text }}
    </li>
  </ul>
</div>

<script>
const vm = new Vue({
  data: {
    modes: ['all', 'done', 'not done'],
    newTodo: '',
    // Source state
    mode: 'all',
    todos: [
      { text: 'Learn JavaScript', done: true  },
      { text: 'Learn Vue', done: false  }
    ]
  },
  computed: {
    // Derived state
    filteredTodos () {
      switch (this.mode) {
        case 'done':
          return this.todos.filter(todo => todo.done)
        case 'not done':
          return this.todos.filter(todo => !todo.done)
        default:
          return this.todos
      }
    }
  },
  methods: {
    toggleTodo (todo) {
      todo.done = !todo.done
    },
    addNewTodo () {
      const newTodo = {
        text: this.newTodo,
        done: false
      }
      this.todos.push(newTodo)
      this.newTodo = ''
    }
  }
}).$mount('#app')
</script>
```

## Todo as Component (basic)

```html
<div id="app">
  <todo
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
    @toggle="toggleTodo(todo)">
  </todo>
</div>

<script>
Vue.component('todo', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isEditing: false
    }
  },
  template: `
    <div :class="{ done: todo.done }" @click="isEditing = !isEditing">
      {{ todo.text }} / isEditing: {{ isEditing }}
    </div>
  `
})

const vm = new Vue({
  el: '#app',
  data: {
    todos: [
      { id: 0, text: 'hello', done: true },
      { id: 1, text: 'bye', done: false }
    ]
  },
  methods: {
    toggleTodo (todo) {
      todo.done = !todo.done
    }
  }
})
</script>
```

## Todo as Component (completed)

```html
<script src="https://unpkg.com/vue"></script>
<style>
.done {
  text-decoration: line-through;
}
</style>

<div id="app">
  <p>
    <label v-for="m in modes">
      <input type="radio" :value="m" v-model="mode"> {{ m }}
    </label>
  </p>
  <my-input
    v-model="newTodo"
    @keyup.enter="addNewTodo">
  </my-input>
  <ul>
    <todo-item
      v-for="todo in todos"
      :todo="todo"
      @toggle="toggleTodo"
      @edit="editTodo">
    </todo-item>
  </ul>
</div>

<template id="todo-template">
  <li :class="{ done: todo.done }">
    <input type="checkbox"
      :checked="todo.done"
      @change="$emit('toggle', todo)">
    <span v-if="!isEditing"
      @dblclick="isEditing = true">
      {{ todo.text }}
    </span>
    <input v-else
      :value="todo.text"
      @keyup.enter="onEditDone"
      @blur="isEditing = false">
  </li>
</template>

<script>
Vue.component('todo-item', {
  template: '#todo-template',
  props: {
    todo: { type: Object, required: true }
  },
  data () {
    return {
      isEditing: false
    }
  },
  methods: {
    onEditDone (event) {
      this.$emit('edit', this.todo, event.target.value)
      this.isEditing = false
    }
  }
})

const vm = new Vue({
  data: {
    modes: ['all', 'done', 'not done'],
    newTodo: '',
    // Source state
    mode: 'all',
    todos: [
      { text: 'Learn JavaScript', done: true  },
      { text: 'Learn Vue', done: false  }
    ]
  },
  computed: {
    // Derived state
    filteredTodos () {
      switch (this.mode) {
        case 'done':
          return this.todos.filter(todo => todo.done)
        case 'not done':
          return this.todos.filter(todo => !todo.done)
        default:
          return this.todos
      }
    }
  },
  methods: {
    toggleTodo (todo) {
      todo.done = !todo.done
    },
    editTodo (todo, newValue) {
      todo.text = newValue
    },
    addNewTodo () {
      const newTodo = {
        text: this.newTodo,
        done: false
      }
      this.todos.push(newTodo)
      this.newTodo = ''
    }
  }
}).$mount('#app')
</script>
```

## Form Component Wrapper

```html
<div id="el">
  <my-input v-model="foo" label="hello"></my-input>
</div>

<script>
Vue.component('my-input', {
  props: ['value', 'label'],
  template: `
    <div>
      <span>{{ label }}</span>
      <input
        :value="value"
        @input="$emit('input', $event.target.value)">
    </div>
  `
})

var vm = new Vue({
  el: '#el',
  data: {
    foo: 'bar'
  }
})
</script>
```

## Slots
 
 ```html
<div id="el">
  <child>
    <div slot-scope="data">
      {{ msg }}
      {{ data.msg }}
    </div>
  </child>
</div>

<script>
Vue.component('child', {
  data () {
    return {
      msg: 'from child'
    }
  },
  template: `
    <div class="child-root">
      <slot :msg="msg" static-msg="hello" />
    </div>
  `
})

var vm = new Vue({
  el: '#el',
  data: {
    msg: 'from root'
  }
})
```

# Day 2 Examples

## Transition example

```html
<!-- <link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"> -->
<script src="../dist/vue.js"></script>
<style>
.fade-leave, .fade-enter-to {
  opacity: 1;
}
.fade-leave-to, .fade-enter {
  opacity: 0;
}
.fade-leave-active, .fade-enter-active {
  transition: opacity 0.5s ease;
}
</style>

<div id="el">
  <transition name="fade" mode="out-in">
    <!-- <component :is="currentView"></component> -->
    <div v-if="ok" key="ok">ok</div>
    <div v-else key="not ok">not ok</div>
  </transition>
  <button @click="ok = !ok">toggle</button>
</div>

<script>
var vm = new Vue({
  el: '#el',
  data: {
    ok: true
  }
})

// higher-order transition component
Vue.component('my-transition', {
  template: `
    <transition @enter="onEnter">
      <slot/>
    </transition>
  `,
  methods: {
    onEnter (el, done) {
      // custom animation logic
    }
  }
})
</script>
```

## Hash Router Exercise

```html
<script src="https://unpkg.com/vue"></script>
<script>
// goal:
// - display foo when url is at #foo
// - display bar when url is at #bar
// - display 404 when url is neither #foo nor #bar

// to access the current hash:
//   window.location.hash
// to listen for hash changes:
//   window.addEventListener('hashchange', () => {
//     read hash and update app
//   })
</script>

<div id="app">
  <!-- render main view here -->
  <a href="#foo">foo</a>
  <a href="#bar">bar</a>
</div>

<script>
window.addEventListener('hashchange', () => {
  // Implement this!
})

const app = new Vue({
  el: '#app',
  // Implement this!
})
</script>
```

## Hash Router (completed)

```html
<div id="app">
  <!-- render main view here -->
  <component :is="currentView"></component>
  <a href="#foo">foo</a>
  <a href="#bar">bar</a>
  <a href="#baz">baz</a>
</div>

<script>
const Foo = {
  template: `<div>This is foo</div>`
}

const Bar = {
  template: `<div>This is bar</div>`
}

const NotFound = {
  template: `<div>This page does not exist</div>`
}

const routingTable = {
  foo: Foo,
  bar: Bar
}

function getCurrentView () {
  const hash = window.location.hash.slice(1)
  return routingTable[hash] || NotFound
}

window.addEventListener('hashchange', () => {
  // Implement this!
  app.currentView = getCurrentView()
})

const app = new Vue({
  el: '#app',
  data: {
    currentView: getCurrentView()
  }
})
</script>
```

## vue-router example

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// 1. install
Vue.use(VueRouter)

const Foo = { template: `<div>This is foo</div>` }
const Bar = { template: `<div>This is bar</div>` }
const NotFound = { template: `<div>Not Found</div>` }

// /posts/123 => { path: '/posts/123', params: { id: 123 }}
const Post = {
  props: ['id'],
  template: `
    <div>
      This is post with id: {{ id }}
    </div>
  `
}

// 2. create a router instance
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/foo' },
    {
      name: 'posts',
      path: '/posts/:id',
      component: Post,
      props: true
    },
    { path: '/bar', component: Bar },
    { path: '*', component: NotFound }
  ]
})

new Vue({
  el: '#app',
  // 3. inject into root instance
  router,
  render: h => h(App)
})
```

## Route hooks example
(full docs at [https://router.vuejs.org/en/advanced/navigation-guards.html](https://router.vuejs.org/en/advanced/navigation-guards.html))

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Settings from './Settings.vue'

// 1. install
Vue.use(VueRouter)

const Inbox = {
  template: `
    <div class="inbox">
      <aside>This is the inbox sidebar</aside>
      <router-view></router-view>
    </div>
  `
}

const InboxMails = {
  template: `
    <ul class="mails">
      <li>
        <router-link to="/inbox/mail/123">mail/123</router-link>
      </li>
      <li>
        <router-link to="/inbox/mail/234">mail/234</router-link>
      </li>
      <li>
        <router-link to="/inbox/mail/345">mail/345</router-link>
      </li>
    </ul>
  `
}

const InboxMail = {
  props: ['id'],
  created () {
    // fetch-after-navigation strategy
    console.log('loading...')
    setTimeout(() => {
      console.log('data loaded')
      this.isLoading = false
    }, 1000)
  },
  data () {
    return {
      isLoading: true
    }
  },

  // fetch-before-navigation strategy

  // beforeRouteEnter (to, from, next) {
  //   console.log('fetching data...')
  //   setTimeout(() => {
  //     next(vm => {
  //       // set data here
  //     })
  //   }, 1000)
  // },

  // called when component is reused
  beforeRouteUpdate (to, from, next) {
    console.log('route updated')
    next()
  },
  template: `
    <div class="mail">
      {{ isLoading ? 'loading...' : 'content for mail' }}
    </div>
  `
}

// 2. create a router instance
const router = window.router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/inbox',
      component: Inbox,
      children: [
        { path: '', component: InboxMails },
        { path: 'mail/:id', component: InboxMail, props: true }
      ]
    },
    {
      path: '/settings',
      component: Settings,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.meta.auth) {
    if (true) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  // 3. inject into root instance
  router,
  render: h => h(App)
})
```

## Settings.vue
 
```html
<template>
  <div>
    <h1>Settings!</h1>
    <p>{{ isSaved ? 'saved' : 'not saved' }}</p>
    <button @click="isSaved = true">save</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSaved: false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.isSaved || confirm('Are you sure?')) {
      next()
    } else {
      next(false)
    }
  }
}
</script>
```

## Routing Exercise

* Use https://jsonplaceholder.typicode.com/ 's API
* Home page should display a list of posts
* Clicking on a post should navigate to a post page with comments
* Which data-fetching strategy to use is up to you, but it should have proper loading indicators in all cases.

# Day 3 Examples

Unit Testing Example Repo:
https://github.com/vuejs/vue-test-utils-mocha-webpack-example

## Custom directive example

```html
<div id="app">
  <p v-color="color">
    {{ color }}
  </p>
</div>

<script>
Vue.directive('color', {
  bind (el, binding, vnode) {
    el.style.color = binding.value
  },
  // inserted () {

  // },
  update (el, binding, vnode) {
    if (binding.value !== binding.oldValue) {
      el.style.color = binding.value
    }
  },
  // componentUpdated () {

  // },
  unbind () {

  }
})

const vm = new Vue({
  el: '#app',
  data: {
    color: 'red'
  }
})
</script>
```

## Plugin example

```html
<div id="app" :style="{ border: '1px solid ' + (warnings.length ? 'red' : 'transparent') }">
  <input type="number" v-model="value">

  <ul v-if="warnings.length">
    <li v-for="warning in warnings">
      {{ warning }}
    </li>
  </ul>
</div>

<script>
const ValidationMixin = {
  data () {
    return {
      warnings: []
    }
  },
  created () {
    const validations = this.$options.validate
    if (validations) {
      Object.keys(validations).forEach(key => {

        const { assert, message } = validations[key]

        this.$watch(key, value => {
          const result = assert(value)
          if (!result) {
            // console.error(message(key, value))
            this.warnings.push(message(key, value))
          }
        })
      })
    }
  }
}

const ValidationMixin2 = {
  computed: {
    warnings () {
      const warnings = []
      const validations = this.$options.validate
      if (validations) {
        Object.keys(validations).forEach(key => {
          const value = this[key]
          const { assert, message } = validations[key]
          const result = assert(value)
          if (!result) {
            // console.error(message(key, value))
            warnings.push(message(key, value))
          }
        })
      }
      return warnings
    }
  }
}

const Plugin = {
  install (Vue) {
    Vue.mixin(ValidationMixin2)
  }
}

Vue.use(Plugin)

const vm = new Vue({
  el: '#app',
  data: {
    value: 1
  },
  validate: {
    value: {
      assert: newValue => newValue > 1,
      message: (key, value) => `${key} must be greater than 1, but got ${value}`
    }
  }
})
</script>
```

## Render Function exercise

```html
<div id="app">
  <render-fn :tags="['div', 'span', 'p']"></render-fn>
</div>

<!-- Expected output:

<div id="app">
  <div>
    <div>0</div>
    <span>1</span>
    <p>2</p>
  </div>
</div>

-->

<script>
Vue.component('render-fn', {
  props: {
    tags: Array
  },
  render (h) {
    // implement this
  }
})

new Vue({
  el: '#app'
})
</script>
```

## Higher Order Component

```html
<div id="app">
  <my-transition>
    <div v-if="ok">foo</div>
  </my-transition>
</div>

<script>
const enter = (el, done) => {
  console.log('enter')
  done()
}
const leave = (el, done) => {
  console.log('leave')
  done()
}

Vue.component('my-transition', {
  functional: true,
  render (h, ctx) {
    return h('transition', {
      ...ctx.data,
      on: {
        ...ctx.data.on,
        enter,
        leave
      }
    }, ctx.children)
  }
})

const vm = new Vue({
  el: '#app',
  data: {
    ok: true
  }
})

// function add (a, b) {
//   return a + b
// }

// add(foo, 1, 2, 3, 4)
// add(bar, 1, 2, 3, 4)
// add(baz, 1, 2, 3, 4)

// addALot(foo)
// addALot(bar)
// addALot(baz)

// function addALot (a) {
//   return add(a, 1, 2, 3, 4)
// }
</script>
```

## Abstract Component (ErrorBoundary)

```html
<div id="app">
  <error-boundary>
    <foo></foo>
  </error-boundary>
</div>

<script>
Vue.component('ErrorBoundary', {
  data () {
    return {
      error: null
    }
  },
  errorCaptured (err) {
    this.error = err.message

  },
  render (h) {
    if (this.error) {
      return h(
        'div',
        { style: { color: 'red' }},
        `error from children: ${this.error}`
      )
    }
    return this.$slots.default[0]
  }
})

Vue.component('foo', {
  render (h) {
    throw new Error('oops')
    return h('div', 'hello from foo')
  }
})

new Vue({
  el: '#app',
  data: {
    ok: true
  }
})
</script>
```

## Fetch and Higher-Order Fetch

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/lodash"></script>

<div id="app">
  <!-- <fetch url="https://api.github.com/users/yyx990803">
    <template slot-scope="{ status, data, error }">
      <div v-if="data">{{ data }}</div>
      <div v-else-if="status === 'error'">Something went wrong: {{ error }}</div>
      <div v-else>loading....</div>
    </template>
  </fetch> -->

  <my-fetch url="https://api.github.com/users/yyx990803">
    <div slot-scope="data">{{ data }}</div>
  </my-fetch>
</div>

<script>
// base fetch:
// abstract away fetching state logic
Vue.component('fetch', {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data () {
    const res = {
      status: 'pending',
      data: null,
      error: null
    }

    let activePromise = null

    const fetchData = _.debounce(url => {
      if (!url) {
        return
      }

      const currentPromise = activePromise = fetch(url)
      res.status = 'pending'

      currentPromise.then(response => {
        if (activePromise != currentPromise) {
          return
        }
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          activePromise = null
          res.status = 'error'
          res.data = null
          res.error = response.status
        }
      }).then(data => {
        if (activePromise != currentPromise) {
          return
        }
        activePromise = null
        res.status = 'success'
        res.data = data
        res.error = null
      }).catch(error => {
        if (activePromise != currentPromise) {
          return
        }
        activePromise = null
        res.status = 'error'
        res.data = null
        res.error = error
      })
    }, 300)

    setTimeout(() => {
      this.$watch(() => this.url, fetchData, { immediate: true })
    }, 0)

    return { res }
  },

  render () {
    const res = this.$scopedSlots.default(this.res)
    return Array.isArray(res) ? res[0] : res
  }
})

// higher-order fetch:
// abstracting away boilerplate for rendering loading and error
Vue.component('my-fetch', {
  functional: true,
  render (h, ctx) {
    return h('fetch', {
      props: { url: ctx.props.url },
      scopedSlots: {
        default: ({ status, data, error }) => {
          console.log(status, data, error)
          if (status === 'error') {
            return h('div', error)
          } else if (status === 'pending') {
            return h('div', 'loading')
          } else {
            return ctx.data.scopedSlots.default(data)
          }
        }
      }
    })
  }
})

new Vue({
  el: '#app'
})
</script>
```