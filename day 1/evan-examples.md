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