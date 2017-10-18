# Testing

## Jest

Preprocessor needed to have single file components.

## Mocha-webpack

```
webpack tests-input.js output.js && mocha output.js
```
input to output virtually, immediately tested by mocha without writing on disc.

# Custom directives

Use when you really have no other choice but directly touching the DOM

# Virtual DOM

Virtual DOM = json

```
{ tag: 'div', data: { attrs: {}, ... }, children: [] }
```

## Performance

Virtual DOM comparing and stuff is a lot CPU.
Although building actual DOM and throwing it away is even more work.

create actual DOM: js jumps to c++ to create DOM.
<-> virtual dom stays in js -> THAT's why it's cheaper.

Changes in real DOM: element or so has to be alocated.
Solution to change it all? Much more expensive and less customer friendly (input focus lost).

```html
<div>{{ foo }}</div>
```
same as 
```javascript
render (createElement) {
    return createElement('div', {}, [
        this.foo
    ])
}
```

## Render function

```javascript
new Vue({
    components: App,
    render: h => h(App)
})
```
same as
```javascript
render (h) {
    return h(App)
}
```

h = hyperscript <= hyper text <= HTML

## JSX

= extra layer on js
= language feature, but not part of the js language

like react:
```javascript
let h = <input/>
```