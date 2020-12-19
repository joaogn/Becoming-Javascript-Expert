const assert = require("assert");

// --- keys
const uniqueKey = Symbol("userName");
const user = {};

user["userName"] = "value for normal Objects";
user[uniqueKey] = "value for Symbol";

// console.log("getting normal Objects:", user.userName);
assert.deepStrictEqual(user.userName, "value for normal Objects");

// ever unique on memory Address
// console.log("getting Symbol:", user[Symbol["userName"]]);
// console.log("getting Symbol:", user[uniqueKey]);
assert.deepStrictEqual(user[Symbol["userName"]], undefined);
assert.deepStrictEqual(user[uniqueKey], "value for Symbol");

// its hard to get, but not is secret
// console.log("symbols", Object.getOwnPropertySymbols(user)[0]);
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass using symbol for - bad Pratice (not have on node codebase)
user[Symbol.for("password")] = 123;
// console.log("Symbol.for", user[Symbol.for("password")]);
assert.deepStrictEqual(user[Symbol.for("password")], 123);

//Well Known Symbols

// this is function* do internally
const obj = {
  // interators
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(),
      };
    },
  }),
};

//console.log("item", [...obj]);
assert.deepStrictEqual([...obj], ["a", "b", "c"]);

// create a "private" method on javascript object
const kItems = Symbol("kItems");
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError();

    const itens = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    );
    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(itens);
  }
  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }
  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }
  get [Symbol.toStringTag]() {
    return "what?";
  }
}

const myDates = new MyDate([2020, 11, 05], [1991, 02, 01]);

//[object Object] in this case the Object is called toString tag
// if add get [Symbol.toStringTag]() on class change this value
// console.log(Object.prototype.toString.call(myDate));
assert.deepStrictEqual(
  Object.prototype.toString.call(myDates),
  "[object what?]"
);
// console.log("myDate + 1", myDate + 1); // throw a typeError
assert.throws(() => myDates + 1, TypeError);

// explicit corceion to call the toPrimitive
assert.deepStrictEqual(
  String(myDates),
  "05 de dezembro de 2020 e 01 de março de 1991"
);

const expectedDates = [new Date(2020, 11, 05), new Date(1991, 02, 01)];

// to be implement with interator need add Symbol interator on class
//console.log([...myDates]);
assert.deepStrictEqual([...myDates], expectedDates);

(async () => {
  const dates = [];

  for await (const date of myDates) {
    dates.push(date);
  }

  const expectedDatesInISOString = expectedDates.map((item) =>
    item.toISOString()
  );

  assert.deepStrictEqual(dates, expectedDatesInISOString);
})();
