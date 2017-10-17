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

`template` and `components` need template compiler
`render` function renders the template itself, so doesn't need the template compiler anymore.

## Import

```javascript
import App from './App.vue'
```

Always specify `.vue` for vue files!


