9999999999999999 //16
// 10000000000000000
true + 2
// 3
'21' + true
// '21true'
'21' - true
//20
'21' - - 1
// 22
0.1 + 0.2
// 0.30000000000000004
0.1 + 0.2 === 0.3
// false
3 > 3 > 1
// false
3 > 2 >=1
// true
"B" + "a" + + "a" + "a"
//'BaNaNa'
'1' == 1 //implicit coercion 
'1' === 1 //Not convert value

//------------------------------

console.assert(String(123) === '123', "explict convertion to string");
console.assert(123 + '' === '123', "implicit convertion to string");

console.assert(('hello' || 123) === 'hello', '|| returns the first element if both true');
console.assert(('hello' && 123) === 123, '&& returns the last element if both true');


//------------------------------

const item = { 
    name: "joaogn",
    age: 29,
}

const itemReturninOnlyToString = { 
    ...item,
        // For a non Primitive type the object try return the toString(), if not exit the toString() it return the valueOf(),
    // if not exist the toString() and valueOf() it return [object Object]
    toString() {
        return `Name: ${this.name}, Age: ${this.age}`
    }
}

const itemReturninValueOfAndToString = { 
    ...itemReturninOnlyToString,
    // For a Primitive type the object try return the valueOf(), if not exit the valueOf() it return the toString(),
    // if not exist the valueOf() and toString() it return [object Object]
    valueOf() {
        return 007
    }
}


// console.log('item', item + 0) //item [object Object]0
// console.log('itemReturninOnlyToString', itemReturninOnlyToString + 0) //item Name: joaogn, Age: 290 //return the strinf and concar with 0
// console.log('itemReturninValueOfAndToString', itemReturninValueOfAndToString + 1) //itemReturninValueOfAndToString 8
// console.log('itemReturninValueOfAndToString', `${itemReturninValueOfAndToString}`) //itemReturninValueOfAndToString Name: joaogn, Age: 29
// console.log('valueOf', Number(itemReturninValueOfAndToString)) //valueOf 7
// console.log('toString',String(itemReturninValueOfAndToString)) //toString Name: joaogn, Age: 29

const itemReturningType = { 
    ...itemReturninValueOfAndToString,
    // it have priority on stop
    [Symbol.toPrimitive](coercionType) {
        console.log('trying to convert to', coercionType)
    }
}

// console.log('toString',String(itemReturningType))
// console.log('valueOf', Number(itemReturningType)) 
// trying to convert to string
// toString undefined
// trying to convert to number
// valueOf NaN


const completItem = { 
    ...itemReturninValueOfAndToString,
    [Symbol.toPrimitive](coercionType) {
        console.log('trying to convert to', coercionType)
        const types = {
            string: JSON.stringify(this),
            number: '0007'
        }

        return types[coercionType] || types.string
    }
}


// console.log('toString',String(completItem))
// console.log('valueOf', Number(completItem))
// trying to convert to string
// toString {"name":"joaogn","age":29}
// trying to convert to number
// valueOf 7


// call the convertion default! - boolean
// console.log('Date', new Date(completItem))


// console.log('!!item is true?', !!completItem)
// trying to convert to default
// !!item is true? true


// console.log('string concat', `Hey${completItem}`)
// trying to convert to string
// string concat Hey{"name":"joaogn","age":29}


// console.log('implicit + explict coercion (using ==)', completItem == String(completItem))
// trying to convert to string
// trying to convert to default
// implicit + explict coercion (using ==) true


console.assert(completItem + 0 === '{"name":"joaogn","age":29}0')
console.assert(!!completItem)
console.assert(`Hey${completItem}`, 'Hey{"name":"joaogn","age":29}')
console.assert(completItem == String(completItem), true)

