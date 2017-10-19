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