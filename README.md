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

        Added on Javascript in 2015, you can put 'use strict' on top of the javascript file, the objective is to avoid developers making mistakes like using nonexistent variables, create variables using keywords reserved, force remove instances in memory and [more](https://www.w3schools.com/js/js_strict.asp).
    - **Call Stack** 

        This a operation stack stores the sequence of software actions, this is used to stores the next execution using first in/first out, stores all primitive value like int, string..., and stores appointments
    - **Memory Heap**

        Called too Memory Call work like the Call Stack, but here can store the dynamics values like arrays, objects, functions, and anything can be increased dynamically, this values they are appointed by Call Stack [more](https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204)
    - **Value Type VS Reference Type**

        The value type its a primitive value when copy the value it create other on memory because it use a Call Stack, when use a dinamics value like object it create a appointment in memmory because it use a Memory Heap.
    - **Type Coercion**
        
        This is the process to convert types, in javascript all types can be converted, but exist only 3 types of conversion string, boolean or number. Exist 2 types of coercion there is implicit or explicit, the implicit coercion is used by operators like comparing with '=='  or summing string with a number, this type of coercion usually cause some issues to see the table below.

        ![== Table](images/comparatorWith(==).png) 

        To avoid these issues is interesting comparing with  '===' and convert the types before the use, using toString, valueOf, String(), Number()...

        ![=== Table](images/comparatorWith(===).png) 

        To more [here](https://dorey.github.io/JavaScript-Equality-Table/) and [here](https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/).

    - **Prototype Chain**

        This is how the inheritance works in javascript each Object receives in your prototype the prototype of Object father, and each object has a chain of prototypes, and the two last prototypes are the javascript Object prototype and null. The Class in javascript is a Syntax Sugar to a Prototype Chain.



