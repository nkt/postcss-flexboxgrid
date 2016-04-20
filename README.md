# postcss-flexboxgrid

Flexbox grid system based on css properties.

## Installation

```
npm install --save-dev postcss-flexboxgrid
```

## Usage

```js
const postcss = require('postcss');

postcss([
  require('postcss-flexboxgrid')({ columns: 12, gutter: 30 }), //  default values
  require('autoprefixer')() // you should add autoprefixer after this plugin
]);
```

---

### flex-container

```css
/* before */

.container {
  flex-container: auto;
}

.container-fluid {
  flex-container: fluid;
}

/* after */

.container {
  margin-left: auto;
  margin-right: auto;
}

.container-fluid {
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
}
```

---

### flex-row

```css
/* before */

.row {
  flex-row: auto;
}

/* after */

.row {
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
}
```

---

### flex-row

```css
/* before */

.col-xs {
  flex-column: auto;
}

.col-xs-1 {
  flex-column: 1;
}

.col-xs-12 {
  flex-column: 12;
}

/* after */

.col-xs {
  box-sizing: border-box;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1 0 0;
  max-width: 100%;
}

.col-xs-1 {
  box-sizing: border-box;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 8.333%;
  max-width: 8.333%;
}

.col-xs-12 {
  box-sizing: border-box;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 100%;
  max-width: 100%;
}
```

License
-------

[MIT](LICENSE)
