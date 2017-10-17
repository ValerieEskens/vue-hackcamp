<template>
  <div id="app">
    <router-link to="/inbox">Inbox</router-link>
    <router-link to="/settings">Settings</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  border: 1px solid red;
}

#app, .inbox, .mails, .mail {
  margin: 10px;
}

.inbox {
  border: 1px solid green;
}

.mails {
  border: 1px solid cyan;
}

.mail {
  border: 1px solid blue;
}

h1, h2 {
  font-weight: normal;
}


a {
  color: #42b983;
}
</style>
