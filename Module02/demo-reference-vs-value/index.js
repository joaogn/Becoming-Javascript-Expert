const { deepStrictEqual } = require('assert');
let counter = 0;
let counter2 = counter;

const item = { counter: 0 };
const item2 = item;

//The primitive type, generate a copy in memory
counter2 ++;
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

//The reference type, copy the memory address
//and apoint to the same place
item2.counter++
deepStrictEqual(item, { counter: 1 })
deepStrictEqual(item2, { counter: 1 })