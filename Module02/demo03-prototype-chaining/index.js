const assert = require('assert');

const obj = {};
const arr = [];
const fn  = () => {};

//internally, literal objects become explict functions

console.log('new Object is {}', new Object().__proto__ === {}.__proto__);
assert.deepStrictEqual(new Object().__proto__,{}.__proto__)

//__proto__ is the object referency that has the properties in it
console.log('obj.__proto__ === Object.prototype',obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__,Object.prototype)


console.log('arr.__proto__ === Array.prototype',arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__,Array.prototype)

console.log('fn.__proto__ === Function.prototype',fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__,Function.prototype)

// the __proto__ of Object.prototype is null
console.log('obj.__proto__.__proto__ === null',obj.__proto__.__proto__ === null)
assert.deepStrictEqual(obj.__proto__.__proto__,null)

//-------
console.log("_______________")

function Employee() {}
Employee.prototype.salary = () => "salary**"

function Supervisor() {}
// inherit the employee instance
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => "profitShare**";


function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**";

// We call by prototype,if directly call it gives an error
console.log(Manager.prototype.salary());
// console.log(Manager.salary());

// if not call 'new', the first __proto__ to be aways
// the Function instance, without inherit our classes
// to access the classes without nre, can assecces directly by prototype

console.log("Manager.prototype.__proto__ === Supervisor.prototype",Manager.prototype.__proto__ === Supervisor.prototype);
assert.deepStrictEqual(Manager.prototype.__proto__,Supervisor.prototype);

console.log("_______________")

// when we call the 'new' the __proto__ receive the actualy prototype

console.log(`manager.__proto__: ${new Manager().__proto__}, manager.salary(): ${ new Manager().salary()}`);
console.log(Supervisor.prototype === new Manager().__proto__.__proto__)
assert.deepStrictEqual(Supervisor.prototype,new Manager().__proto__.__proto__)

console.log("_______________")

const manager = new Manager();
console.log('manager.salary()',manager.salary())
console.log('manager.profitShare()',manager.profitShare())
console.log('manager.monthlyBonuses()',manager.monthlyBonuses())

assert.deepStrictEqual(manager.__proto__,Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__,Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__,Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__,Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__,null)

console.log("_______________")
// the class is a Syntax Sugar to object prototype chaining.
class T1 {
    ping() {return 'ping'}
}

class T2  extends T1 {
    pong() {return 'pong'}
}

class T3  extends T2 {
    shoot() {return 'shoot'}
}

const t3 = new T3();
console.log('t3.ping()',t3.ping())
console.log('t3.pong()',t3.pong())
console.log('t3.shoot()',t3.shoot())


assert.deepStrictEqual(t3.__proto__,T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__,T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__,T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__,Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__,null)