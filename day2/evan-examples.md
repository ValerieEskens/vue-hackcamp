Day 2 Examples

Transition example

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


Hash Router Exercise

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

Hash Router (completed)

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

vue-router example

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

Route hooks example
(full docs at https://router.vuejs.org/en/advanced/navigation-guards.html)

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

Settings.vue

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

Routing Exercise

* Use https://jsonplaceholder.typicode.com/ 's API
* Home page should display a list of posts
* Clicking on a post should navigate to a post page with comments
* Which data-fetching strategy to use is up to you, but it should have proper loading indicators in all cases.

