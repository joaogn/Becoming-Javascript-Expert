const assert = require("assert");

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];

const arr3 = arr1.concat(arr2);
//console.log("arr3", arr3.sort());
assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"]);

// by default the set not able add repeated values on array
const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

//console.log("set", set);
//console.log("set array", Array.from(set));
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);
// with rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  "0",
  "1",
  "2",
  "3",
]);

//console.log("set.keys", set.keys());
//console.log("set.values", set.values()); // exist to be compatible with map

// on "normal array", to know if item exists
// [].indexOf('1') !== -1 or [0,1].includes(0)
// console.log(set.has("2"));
assert.ok(set.has("2"));

// same teory of Map, but work with all list
// not have get, so if the item you want exist or not in the list
// on documentation there are examples, how make intersetion, if exist
// and others..

//Intersetion between two arrays

const users01 = new Set(["Fulano", "Siclano", "John Doe"]);

const users02 = new Set(["Beltrano", "Sicrano", "John Doe"]);

const intersetion = new Set([...users01].filter((user) => users02.has(user)));

// console.log("intersetion", Array.from(intersetion));
assert.deepStrictEqual(Array.from(intersetion), ["John Doe"]);

// Diference between two arrays

const diference = new Set([...users01].filter((user) => !users02.has(user)));
//console.log("diference", Array.from(diference));
assert.deepStrictEqual(Array.from(diference), ["Fulano", "Siclano"]);

// weakSet

// same idea of WeakMap
// not interable
// work ony keys how reference
// thera are only simple methods add, delete, has

const user = { id: 123 };
const user2 = { id: 456 };
const weakSet = new WeakSet();
weakSet.add(user);
weakSet.add(user2);
weakSet.delete(user);
// console.log("has", weakSet.has(user));
// console.log("not has", weakSet.has(user2));
assert.deepStrictEqual(weakSet.has(user), false);
assert.ok("weakSet", weakSet.has(user2));
