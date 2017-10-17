import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Settings from './settings.vue'

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
      <li><router-link to="/mail/1">mail 1</router-link></li>
      <li><router-link to="/mail/2">mail 2</router-link></li>
      <li><router-link to="/mail/3">mail 3</router-link></li>
    </ul>
  ` }

const InboxMail = { 
  template: `
    <div class="mail">email {{$route.params.id}}</div>
  ` }

const Settingss = { 
  template: `
    <div>some settings</div>
  ` }
  
const NotFound = { template: `<div>Page not found</div>` }

// install router components
Vue.use(VueRouter)

// create new router instance
const router = new VueRouter({
  mode: 'history', // no hash in the route: http://localhost:8080/bar
  routes: [
    // define routes
    // order mathers: higher route has higher priority
    // * first -> all routes will go there
    { path: '/', redirect: '/foo' },
    { 
      path: '/inbox', 
      component: Inbox,
      children: [
        { path: '', component: InboxMails },
        { path: '/mail/:id', component: InboxMail }
      ]
    },
    { path: '/settings', component: Settings },
    { path: '*', component: NotFound }
  ]
})

new Vue({
  el: '#app',
  router, // inject into root instance
  render: h => h(App)
})
