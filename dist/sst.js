;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.sst = factory();
  }
}(this, function() {
"use strict";

function sst(num, unit) {
  /**
    * @param { Integer } num
    * @return : Integer
    */
  var __isValidNum = function __isValidNum(num) {
    if (typeof num !== "number") throw new Error("Invalid Format : num");

    return num;
  };

  /**
    * @param { Function } func
    * @return : Bool
    */
  var __isFunction = function __isFunction(func) {
    if (typeof func !== "function") throw new Error("Invalid Type : callback should be Function");

    return true;
  };

  /**
  * @param { String } unit
  * @return : Integer
  */
  var __detectUnit = function __detectUnit(unit) {
    var response = void 0;

    switch (unit) {
      case "ms":
      case "millisecond":
      case "milliseconds":
        response = 1;
        break;
      case "s":
      case "sec":
      case "second":
      case "seconds":
        response = 1000;
        break;
      case "m":
      case "min":
      case "minute":
      case "minutes":
        response = 60000;
        break;
      default:
        throw new Error("Invalid Format : unit");
        return;
    }

    return response;
  };

  /**
  * @param { Integer } time
  * @param { Integer } count
  * @return : Array
  */
  var __createArray = function __createArray(time, count) {
    var arr = [];

    for (var i = 1; i < count + 1; i++) {
      arr.push(time * i);
    }

    return arr;
  };

  var _this = sst;

  _this.num = __isValidNum(num);

  _this.millisecond = _this.num * __detectUnit(unit);

  /**
  * @param { Function } callback
  * @return : Function
  */
  _this.immediate = function (callback) {
    __isFunction(callback);

    callback();
    return _this;
  };

  /**
  * @param { Function } callback
  * @return : Function
  */
  _this.once = function (callback) {
    __isFunction(callback);

    setTimeout(function () {
      callback();
    }, _this.millisecond);

    return _this;
  };

  /**
  * @param { Integer } times
  * @param { Function } callback
  * @return : Function
  */
  _this.times = function (times, callback) {
    __isFunction(callback);

    var count = times === undefined ? 1 : times;

    var arr = __createArray(_this.millisecond, count);

    for (var i = 0; i < arr.length; i++) {
      setTimeout(function () {
        callback();
      }, arr[i]);
    }

    return _this;
  };

  /**
  * @param { Function } beforeCallback
  * @param { Function } afterCallback
  * @return : Function
  */
  _this.after = function (beforeCallback, afterCallback) {
    __isFunction(beforeCallback);
    __isFunction(afterCallback);

    var flag = false;

    beforeCallback();

    flag = true;

    if (flag === true) setTimeout(function () {
      afterCallback();
    }, _this.millisecond);

    return _this;
  };

  /**
  * @param { Function } callback
  * @return : Function
  */
  _this.repeat = function (callback) {
    __isFunction(callback);

    setInterval(function () {
      callback();
    }, _this.millisecond);

    return _this;
  };

  return {
    immediate: _this.immediate,
    once: _this.once,
    times: _this.times,
    after: _this.after,
    repeat: _this.repeat
  };
}
return sst;
}));
