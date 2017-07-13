# sst.js

> Simple Set(Timeout || Interval) for Javascript.

`sst.js` is very easy to write `setTimeout` and `setInterval` process for Javascript.

```javascript
// with sst.js
sst(1, "min").once(function() {
  // do, after a minute
});

// with basic setTimeout
setTimeout(function(){
  // do, after minute
}, 60000);
```
```javascript
// available method chaining
sst(2, "s")
  .immediate(() => {
    console.log("run, immediately");
  })
  .once(() => {
    console.log("just a time");
  })
  .times(4, () => {
    console.log("run, 4 times");
  })
  .repeat(() => {
    console.log("run, per second");
  });
```

> Working with Browser and Node.js

## Installation

```bash
# npm
npm install sstjs --save
# yarn
yarn add sstjs
```

## import sst.js

```javascript
// CommonJS
const sst = require('sstjs')
// ES6
import sst from 'sstjs';
// browser
<script src="dist/sst.min.js"></script>
```

## Methods

### constructor(num, unit)

The constructor, you can set a time with human readable.

```javascript
// millisecond: ms, millisecond, milliseconds
sst(200, 'ms') // 200 milliseconds
// second: s, sec, second, seconds
sst(2, "sec") //  2 seconds
// minute: m, min, minute, minutes
sst(2, "min") // 2 minitues
```

### `.once(callback)`

The `.once` method is equivalent to `setTimeout`.

```javascript
sst(2, "sec")
  .once(function() {
    // run, after 2 seconds
  });
```

### `.times(num, callback)`

The `.times` method is equivalent to `setTimeout`. but iterate callback with **NUM** times, you defined.

```javascript
sst(2, "sec")
  .times(4, function () {
      // run, after 2 seconds, but iterate 4 times
    });
```

### `.after(beforeCallback, afterCallback)`

The `.after` method is equivalent to `setTimeout`. but run `afterCallback (**second arguments**)` after exexuted `beforeCallback (first argument)`.

```javascript
sst(2, "sec")
  .after(
    function() {
      // rum immediately
    },
    function() {
      // run, after 2 seconds
    }
  );
```

### `.repeat(callback)`

The `.repeat` method is equivalent to `setInterval`.

```javascript
sst(2, "sec")
  .repeat(function () {
      // run, after per 2 seconds
  });
```

### `.immediate(callback)`

The `.immediate` method is immediate function.

```javascript
sst(2, "sec")
  .immediate(function () {
    // rum immediately
  })
  .repeat(function () {

  });
```

## LICENCE

MIT
