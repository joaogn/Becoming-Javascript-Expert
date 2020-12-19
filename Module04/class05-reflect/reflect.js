"use strict";

const assert = require("assert");

// granted semantic and security in objects

// ---- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

//console.log(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]));
assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// a rare problem that can happens
// the malicius lib can change you function prototype
// and get information to malicius use

// Function.prototype.apply = () => { throw new TypeError("Bum")}

// this is more common
myObj.add.apply = function () {
  throw new TypeError("Boom");
};

assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "Boom",
});

// using reflect

// ---- apply
// not throw the error!!
const result = Reflect.apply(myObj.add, { arg1: 10, arg2: 20 }, [200]);
//console.log(result);
assert.deepStrictEqual(result, 230);

// ---- defineProperty
// semantics questions
function MyDate() {}

// Object add prop to function? its a Code Smell
Object.defineProperty(MyDate, "withObject", { value: () => "Hey there" });
// is more semantics
Reflect.defineProperty(MyDate, "withReflection", { value: () => "Hey Dude" });
//console.log(MyDate.withObject());
//console.log(MyDate.withReflection());
assert.deepStrictEqual(MyDate.withObject(), "Hey there");
assert.deepStrictEqual(MyDate.withReflection(), "Hey Dude");

// ---- deleteProperty
const withDelete = { user: "Mucilon" };
// imperformatic, should be avoid ever
delete withDelete.user;
//console.log(withDelete.hasOwnProperty("user"));
assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

// new we respect the javascript lifecycle
const withReflection = { user: "Muciloiro" };
Reflect.deleteProperty(withReflection, "user");
//console.log(withDelete.hasOwnProperty("user"));
assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

// ---- get
// shoud fo a get only in reference instance
//console.log((1)["userName"]);
// the result is undefined but must be return the error
// because no make sense get property on primitive value
assert.deepStrictEqual((1)["userName"], undefined);
//with reflection, it throws an exception
// Reflect.get(1, "userName");
assert.throws(() => Reflect.get(1, "userName"), TypeError);

// ---- has
//console.log("superman" in { superman: "" });
// looks like a interator and not if has a property
assert.ok("superman" in { superman: "" });
//console.log(Reflect.has({ superman: "" }, "superman"));
assert.ok(Reflect.has({ superman: "" }, "superman"));

// ---- ownKeys
// its is used to do a secure copy from object
const user = Symbol("user");
const dataUser = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "João Graça",
};
// with the Object methods, we must do 2 requests
const objectKeys = [
  ...Object.getOwnPropertyNames(dataUser),
  ...Object.getOwnPropertySymbols(dataUser),
];
//console.log(objectKeys);
assert.deepStrictEqual(objectKeys, ["id", Symbol.for("password"), user]);
//
assert.deepStrictEqual(Reflect.ownKeys(dataUser), [
  "id",
  Symbol.for("password"),
  user,
]);
