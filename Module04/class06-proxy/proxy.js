"use strict";

const Event = require("events");

const event = new Event();

const eventName = "counter";

event.on(eventName, (msg) => console.log("counter update", msg));

const myCounter = {
  counter: 0,
};

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;
    return true;
  },
  get: (object, prop) => {
    //console.log("called", { object, prop });
    return object[prop];
  },
});

// run in a loop every defined time until terminated
setInterval(function () {
  proxy.counter += 1;
  console.log("[3]: setInterval");
  if (proxy.counter === 10) clearInterval(this);
}, 200);

// the people use setTimeout passing 0 to execute now,
// but this is a bad pratice.
// because the funciton of setTimeout is to use in the future
/*
setTimeout(() => {
  proxy.counter = 4;
  console.log("setTimeout");
}, 0);
*/

//correct way to use setTimeout to define a funtion
// to execute in future
setTimeout(() => {
  proxy.counter = 4;
  console.log("[2]: setTimeout");
}, 100);

// execute now, but broken the node's life cycle order
// the nextTick is executed first of all
// this is a bad pratice.
process.nextTick(() => {
  proxy.counter = 2;
  console.log("[0]: nextTick");
});

// if want execute now, use the function setImediate
setImmediate(() => {
  proxy.counter = 3;
  console.log("[1]: setImmediate");
});
