"use strict";

function sst(num, unit) {
  /**
    * @param { Integer } num
    * @return : Integer
    */
  let __isValidNum = num => {
    if (typeof num !== "number") throw new Error("Invalid Format : num");

    return num;
  };

  /**
    * @param { Function } func
    * @return : Bool
    */
  let __isFunction = func => {
    if (typeof func !== "function")
      throw new Error("Invalid Type : callback should be Function");

    return true;
  };

  /**
  * @param { String } unit
  * @return : Integer
  */
  let __detectUnit = unit => {
    let response;

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
  let __createArray = (time, count) => {
    let arr = [];

    for (let i = 1; i < count + 1; i++) {
      arr.push(time * i);
    }

    return arr;
  };

  let _this = sst;

  _this.num = __isValidNum(num);

  _this.millisecond = _this.num * __detectUnit(unit);

  /**
  * @param { Function } callback
  * @return : Function
  */
  _this.immediate = callback => {
    __isFunction(callback);

    callback();
    return _this;
  };

  /**
  * @param { Function } callback
  * @return : Function
  */
  _this.once = callback => {
    __isFunction(callback);

    setTimeout(() => {
      callback();
    }, _this.millisecond);

    return _this;
  };

  /**
  * @param { Integer } times
  * @param { Function } callback
  * @return : Function
  */
  _this.times = (times, callback) => {
    __isValidNum(times);
    __isFunction(callback);

    let arr = __createArray(_this.millisecond, times);

    for (let i = 0; i < arr.length; i++) {
      setTimeout(() => {
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
  _this.after = (beforeCallback, afterCallback) => {
    __isFunction(beforeCallback);
    __isFunction(afterCallback);

    let flag = false;

    beforeCallback();

    flag = true;

    if (flag === true)
      setTimeout(() => {
        afterCallback();
      }, _this.millisecond);

    return _this;
  };

  /**
  * @param { Function } callback
  * @return : Function
  */
  _this.repeat = callback => {
    __isFunction(callback);

    setInterval(() => {
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
