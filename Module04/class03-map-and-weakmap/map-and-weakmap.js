const myMap = new Map();

const assert = require("assert");
// can have anything on key
myMap
  .set(1, "one")
  .set("João", { teste: "oj" })
  .set(true, () => "hello");

// using a constructor
const myMapWithConstructor = new Map([
  ["1", "str"],
  [1, "number"],
  [true, "boolean"],
]);

//console.log(myMap);
//console.log("myMap.get(1)", myMap.get(1));
assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("João"), { teste: "oj" });
assert.deepStrictEqual(myMap.get(true)(), "hello");

//In objects the keys can only be string or symbol (number is coverted in string)
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: "João Graça" });

//console.log("get with object", myMap.get({ id: 1 }));
//console.log("get with reference", myMap.get(onlyReferenceWorks));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "João Graça" });

//utilitaries

// Get size
// - On object, Object.keys({a:1}).length
// console.log("map size", myMap.size);
assert.deepStrictEqual(myMap.size, 4);

// Verify if exist item
// - On object, if(item.key) or item.hasOwnProperty('name')
// console.log("verify if exist", myMap.has(onlyReferenceWorks));
assert.ok(myMap.has(onlyReferenceWorks));

//Remove one item
// delete item.id, isn't performatic

myMap.delete(onlyReferenceWorks);
//console.log("verify if deleted", myMap.has(onlyReferenceWorks));
assert.deepStrictEqual(myMap.has(onlyReferenceWorks), false);

// Use a interactor
// can't use a interactor in Objects directly
// must transform using Object.entries(item)
// console.log("Is a array of array", [...myMap]);

// for (const [key, value] of myMap) {
//   console.log(key, value);
// }

assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, "one"],
    ["João", { teste: "oj" }],
    [true, () => {}],
  ])
);

// Object is insecure,because depends on key name, can change any comportament
// ({}).toString => '[object Object]'
// ({toString: () => 'Hello'}) change the original toString function

// any key can colide with the inherited property, like
// constructor, toString, valueOf and others.

const actor = { name: "NaMaria", toString: "Queen: NaMaria" };

// not have restriction on keys name
myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// not able clean a Obj without reasigne
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// --- WeakMap

// can be colected after lost the reference
// is used in special cases

// there are the mostly beneficts of Map
// but can't use interactor and the key
// uses knwoledge references
// is ligther then Map, it predict the memory leak,
// in the map is the memory reference get out mantain the copy
// on weekmap when the reference get out he lost the reference too

const weakMap = new WeakMap();
const hero = { name: "flash" };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);
