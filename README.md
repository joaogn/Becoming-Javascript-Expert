# Becoming Javascript Expert

Content about Javascript Expert Course by EW.IT

- ## Module 01 - Javascript Testing

  - **Mocks**

    Mocks are objects to simulate real object, example testing point B without testing point A.

  - **Stubs**

    Substitute external comportaments like api, to statics object. Example if external api is paid you no need pay to test.

  - **Spies**

    Monitors the functions and validates how many times it was called or whats parameters are used and results. Extremly useful in recursive functions or complex algorithims.

  - **E2E**

    Ensures the software behaviour using the User point of view. Frontend simulate the User comportament. Backend test the routes. If you software not have unit tests this is better way to test it.

  - **Coverage**

    The coverage is a tool to verify how many code lines was tested and some stuffs.

  - **TDD**

    TDD (Test Driven Development): First write the test after write the code, repeat until the function satisfact the rules, Advantages you thin about your problem before start programming and your functions ever be tests.

  - **BDD**

    BDD (Behavior Driven Development): The test its near to busines team, the test not using techninal vocabulary and the developers using part of this vocabulary to write test ans this test stay more detallhed and semantics.

- ## Module 02 - Javascript Life Cycle Concepts

  - **Use Strict**

    Added on Javascript in 2015, you can put `'use strict'` on top of the javascript file, the objective is to avoid developers making mistakes like using nonexistent variables, create variables using keywords reserved, force remove instances in memory and [more](https://www.w3schools.com/js/js_strict.asp).

  - **Call Stack**

    This a operation stack stores the sequence of software actions, this is used to stores the next execution using first in/first out, stores all primitive value like `int`, `string`..., and stores appointments

  - **Memory Heap**

    Called too Memory Call work like the Call Stack, but here can store the dynamics values like arrays, objects, functions, and anything can be increased dynamically, this values they are appointed by Call Stack [more](https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204)

  - **Value Type VS Reference Type**

    The value type its a primitive value when copy the value it create other on memory because it use a Call Stack, when use a dinamics value like object it create a appointment in memmory because it use a Memory Heap.

  - **Type Coercion**

    This is the process to convert types, in javascript all types can be converted, but exist only 3 types of conversion string, boolean or number. Exist 2 types of coercion there is implicit or explicit, the implicit coercion is used by operators like comparing with `==` or summing string with a number, this type of coercion usually cause some issues to see the table below.

    ![== Table](<images/comparatorWith(==).png>)

    To avoid these issues is interesting comparing with `===` and convert the types before the use, using `toString`, `valueOf`, `String()`, `Number()`...

    ![=== Table](<images/comparatorWith(===).png>)

    To more [here](https://dorey.github.io/JavaScript-Equality-Table/) and [here](https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/).

  - **Prototype Chain**

    This is how the inheritance works in javascript each Object receives in your prototype the prototype of Object father, and each object has a chain of prototypes, and the two last prototypes are the javascript Object prototype and null. The Class in javascript is a Syntax Sugar to a Prototype Chain.

  - **Bind**

    The bind is used to pass the context `this` to a function, when this function is out of context and lost its own context the bind is mostly used to pass the Class "this" to function, but can be used any `this`.

  - **Call and Apply**

    The Call and Apply can pass the `this` together with the arguments, the difference between these is in the second param is the Apply the arguments are passed in the array is more semantic and on call the arguments are passed one by one on function.

  - **Object arguments**

    Can get the arguments can be passed by Call and Apply or not, this use this object is a bad practice because you can lose the control from function arguments.

- ## Module 03 - Javascript ECMASript modules

  - **esmodules**

    To import or export modules on javascript using NodeJS its necessary use `module.exports` and `require()` in the browser is necessary to use the tags `<script />` to import these modules to solve these problems its necessary use transpilers like babel, typescript and other, since 2019 can use the new method to manipulate the modules is called ECMAScript modules (esmodules), the esmodule not only change how the import and export are called but change the logic and management was changed completely, in NodeJs since version 14.3 the esmodule can be used. But the esmodules isn't complete and need there so much caution when using the esmodules on NodeJS, see the project on Module03 for more details.

- ## Module 04 - Advanced Javascript Data Types

  - **Generators and Interactors**

    Interactors are objects that implement the protocol interactor on javascript, basically, this object returns the method next, this method returns the value and a done key, this done key can see if the interactor as finished.
    The generators transform the function into interactors, the objective is to return the data on-demand using next. See the project to how to use.
    To more [here](https://javascript.info/async-iterators-generators) and [here](https://jakearchibald.com/2017/async-iterators-and-generators/).

  - **Symbol**

    Is a javascript's primitive type and there are powerful properties like create object keys, create private functions in a class, use the symbol property to intercept default compartments like "toPrimitive", "interactor", "asyncInteractor" in objects, and other things, see the project for more details. To more [here](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/) and [here](https://blog.risingstack.com/async-iterators-in-node-js/).

  - **Map and Weakmap**

    The map can be an alternative for Object, Map is better in cases if you want to add and remove keys with frequency, need validate keys with semantics and when you need that the object works like database and when you need clear the reference after use. But when you need only remove and add keys with frequency and search key by id you can use weakMap its the same as the Map but limited and most performatic, because when you clean the data is wiped from memory. In the project, there is some example of how to use both. References [1](https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373), [2](https://dmitripavlutin.com/maps-vs-plain-objects-javascript/), [3](https://medium.com/@leonardobrunolima/javascript-tips-map-and-weakmap-f38f9c4ed2b6).

  - **Set and Weakset**

    Set this is a List with unique item it is good when you need compare two list, on Set documentation there are some examples like whats itens repteat, how concat two list without repeat item, how see whats items are equals in two list and other things. the weakMap there are the same caracteristcs of the weakMap. See the project for more details. References [1](https://medium.com/@leonardobrunolima/javascript-tips-set-and-weakset-53be9d264fb1), [2](https://medium.com/front-end-weekly/es6-set-vs-array-what-and-when-efc055655e1a), [3](https://javascript.info/map-set).

  - **Reflect**

    Can intercept the behavior of function or object's life cycle to add customized functionalities, the Reflect arrived to solve semantics problems in javascript. See the project for details. [more](https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-2-reflect/)

  - **Proxy**

    Proxy works like the Observer Partner, you can add Observers, and when anything changes all observers will be notified, which is good when working with events. See the project for more details. [more](https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-3-proxies/)
