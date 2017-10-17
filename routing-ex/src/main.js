import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Posts from './posts.vue'
import Post from './post.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/posts" },
    { path: "/posts", component: Posts },
    { path: "/post/:id", component: Post }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
