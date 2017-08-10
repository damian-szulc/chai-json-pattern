<!-- version -->
# 1.0.0 API Reference
<!-- versionstop -->

<!-- TOC -->

- [1.0.0 API Reference](#100-api-reference)
    - [`extend(extension)`](#extendextension)
    - [`chai matchPattern`](#chai-matchpattern)
        - [`objects validation`](#objects-validation)
            - [`Object`](#object)
            - [`PlainObject`](#plainobject)
            - [`'...' key`](#-key)
            - [`"key"?`](#key)
        - [`arrays validation`](#arrays-validation)
            - [`Array`](#array)
            - [`minLength(limit)`](#minlengthlimit)
            - [`maxLength(limit)`](#maxlengthlimit)
            - [`length(limit)`](#lengthlimit)
            - [`'...'  key`](#--key)
        - [`strings validation`](#strings-validation)
            - [`String`](#string)
            - [`minLength(limit)`](#minlengthlimit-1)
            - [`maxLength(limit)`](#maxlengthlimit-1)
            - [`length(limit)`](#lengthlimit-1)
            - [`regex(pattern)`](#regexpattern)
            - [`alphanum`](#alphanum)
            - [`lowercase`](#lowercase)
            - [`uppercase`](#uppercase)
            - [`startsWith(target)`](#startswithtarget)
            - [`endsWith(target)`](#endswithtarget)
        - [`numbers validation`](#numbers-validation)
            - [`Number`](#number)
            - [`Integer`](#integer)
            - [`SafeInteger`](#safeinteger)
            - [`positive`](#positive)
            - [`negative`](#negative)
            - [`min(limit)`](#minlimit)
            - [`min(limit)`](#minlimit-1)
            - [`greater(limit)`](#greaterlimit)
            - [`less(limit)`](#lesslimit)
            - [`range(start, end)`](#rangestart-end)
        - [`booleans validation`](#booleans-validation)
            - [`Boolean`](#boolean)
            - [`truthy`](#truthy)
            - [`falsy`](#falsy)
        - [`dates validation`](#dates-validation)
            - [`Date`](#date)
            - [`dateString`](#datestring)
        - [`other`](#other)
            - [`Symbol`](#symbol)
            - [`any`](#any)
            - [`null`](#null)
            - [`NaN`](#nan)
            - [`undefined`](#undefined)
            - [`nill`](#nill)
            - [`empty`](#empty)
            - [`AND/OR logical operators`](#andor-logical-operators)

<!-- /TOC -->
---

## `extend(extension)`
Allows to add custom validation functions.

`extension` must be an object, where:
- key is the name of validator
- value is a validation function

Name must consists only of letters.

Validation functions as first argument receive element that is validating. Next arguments can be passed if user specify them.

If validatior name already exists, it will be overwritten (except base ChaiJsonPattern validator).

Example:
```js
import chai from 'chai';
import chaiJsonPattern from 'chai-json-pattern';

const extension = {
    customValidator(target) {
        // do some stuff
        // return boolean
    },
};

chaiJsonPattern.extend(extension);

chai.use(chaiJsonPattern);
```
## `chai matchPattern`
Example:
```js
import chai from 'chai';
import chaiJsonPattern from 'chai-json-pattern';

chai.use(chaiJsonPattern);

expect({ a: 2 }).to.matchPattern(`{ "a": 2 }`);
```
### `objects validation`
To validate objects, you can use JSON format:

```js
const value = {
    user: {
        id: 12,
        name: "Tom",
    }
};

expect(value).to.matchPattern(`{
    "user": {
        "id": 12,
        "name": "Tom",
    },
}`);
```
Additionally you can extend validation capabilities by using methods presented below.

By default, all keys have to be included (expect situation, when you will use `...` operator):

Trailing commas in objects are allowed.

#### `Object`
Determines if the value is the language type of Object. (e.g. arrays, objects, new Number(0), ...).

```js
const value = {
    item: {}
};

expect(value).to.matchPattern(`{
    "item": Object,
}`);
```

#### `PlainObject`
Determines if the value is a plain object (object created by the Object constructor or one with a [[Prototype]] of null)


```js
const value = {
    item: {}
};

expect(value).to.matchPattern(`{
    "item": Object,
}`);
```

####  `'...' key`
If you want to validate only few keys, than you can use `...`. In result, all unspecified in pattern keys, will be ignored.

```js
const value = {
    names: {
        id: 12,
        test: 'one'
    }
};

expect(value).to.matchPattern(`{
    "names": {
        "test": "one",
        ...
    }
}`);
```

#### `"key"?`
With `?` you can mark optional key. If the key occurs in target object, it will be validated against provided pattern.

```js
const value = {
    names: {
        id: 12,
        name: "Mark"
    }
};

expect(value).to.matchPattern(`{
    "names": {
        "id": 12,
        "name"?: "Mark"
        "test"?: "test"
    }
}`);
```

### `arrays validation`
To validate arrays, you can use JSON format:

```js
const value = [
    "Mark",
    "Tom",
    "Robert"
];

expect(value).to.matchPattern(`[
    "Mark",
    "Tom",
    "Robert"
]`);
```
Additionally you can extend validation capabilities by using methods presented below.

By default, all keys have to be included (expect situation, when you will use `...` operator):

Trailing commas in objects are not allowed.
#### `Array`
Determines if the value is classified as an Array object.

```js
const value = {
    item: []
};

expect(value).to.matchPattern(`{
    "item": Array,
}`);
```

#### `minLength(limit)`
Specifies the minimum number of items in the array where:

- `limit` is the lowest number of allowed array items.

```js
const value = {
    item: []
};

expect(value).to.matchPattern(`{
    "item": Array AND minLength(3),
}`);
```

#### `maxLength(limit)`
Specifies the minimum number of items in the array where:

- `limit` is the highest number of allowed array items.

```js
const value = {
    item: []
};

expect(value).to.matchPattern(`{
    "item": Array AND maxLength(7),
}`);
```

#### `length(limit)`
Specifies the exact number of items in the array where:

- `limit` is number of allowed array items.

```js
const value = {
    item: [ 'test' ]
};

expect(value).to.matchPattern(`{
    "item": Array AND length(1),
}`);
```

#### `'...'  key`
`...` allow to validate `n` first or last elements of an array. Rest of array elements will be ignored.

Validating two first elements of array
```js
const value = {
    names: [
        'John',
        'Max',
        'Tom'
    ]
};

expect(value).to.matchPattern(`{
    "names": [
        'John',
        'Max',
        ...
    ],
}`);
```

### `strings validation`
To validate strings, you can use JSON format:

```js
expect("Test").to.matchPattern("Test");
```
Additionally you can extend validation capabilities by using provided methods presented below.

#### `String`
Determines if the value is classified as a String primitive or object.

```js
const value = {
    item: "book"
};

expect(value).to.matchPattern(`{
    "item": String,
}`);
```

#### `minLength(limit)`
Specifies the minimum number of string characters where:

- `limit` is the lowest number of allowed string characters.

```js
const value = {
    item: "book"
};

expect(value).to.matchPattern(`{
    "item": String AND minLength(1),
}`);
```

#### `maxLength(limit)`
Specifies the minimum number of string characters where:

- `limit` is the highest number of allowed string characters.

```js
const value = {
    item: "book"
};

expect(value).to.matchPattern(`{
    "item": String AND maxLength(25),
}`);
```

#### `length(limit)`
Specifies the exact number of string characters where:

- `limit` is number of allowed string characters.

```js
const value = {
    item: "book"
};

expect(value).to.matchPattern(`{
    "item": String AND length(4),
}`);
```

#### `regex(pattern)`
Defines a regular expression rule:

- `pattern` string regular expression the string value must match against

```js
const value = {
    item: "book"
};

expect(value).to.matchPattern(`{
    "item": String AND regex("/[a-z]+$/"),
}`);
```

#### `alphanum`
Determines whether the value contain only a-z, A-Z, 0-9 characters

```js
const value = {
    item: "book1"
};

expect(value).to.matchPattern(`{
    "item": alphanum,
}`);
```

#### `lowercase`
Determines whether the value is all lowercase.

```js
const value = {
    item: "book"
};

expect(value).to.matchPattern(`{
    "item": lowercase,
}`);
```

#### `uppercase`
Determines whether the value is all uppercase.

```js
const value = {
    item: "BOX"
};

expect(value).to.matchPattern(`{
    "item": uppercase,
}`);
```

#### `startsWith(target)`
Determines whether the value starts with the given target string.

```js
const value = {
    item: "searchbox"
};

expect(value).to.matchPattern(`{
    "item": startsWith("search"),
}`);
```

#### `endsWith(target)`
Determines whether the value ends with the given target string.

```js
const value = {
    item: "searchbox"
};

expect(value).to.matchPattern(`{
    "item": endsWith("box"),
}`);
```

### `numbers validation`
To validate numbers, you can use JSON format:

```js
const value = {
    id: 123
};

expect(value).to.matchPattern(`{
    "id": 123,
}`);
```
Additionally you can extend validation capabilities by using methods presented below.

#### `Number`
Determines if the value is classified as a Number primitive or object.

```js
const value = {
    item: 27.5
};

expect(value).to.matchPattern(`{
    "item": Number,
}`);
```

#### `Integer`
Determines if the value is an integer.

```js
const value = {
    item: 12
};

expect(value).to.matchPattern(`{
    "item": Integer,
}`);
```

#### `SafeInteger`
Determines if the value is a safe integer. An integer is safe if it's an IEEE-754 double precision number which isn't the result of a rounded unsafe integer.

```js
const value = {
    item: 12
};

expect(value).to.matchPattern(`{
    "item": SafeInteger,
}`);
```

#### `positive`
Determines if the value is a positive Number.

```js
const value = {
    item: 17
};

expect(value).to.matchPattern(`{
    "item": positive,
}`);
```

#### `negative`
Determines if the value is a negative Number.

```js
const value = {
    item: -12
};

expect(value).to.matchPattern(`{
    "item": negative,
}`);
```

#### `min(limit)`
Specifies the minimum value, where:

- `limit` the minimum allowed value.

```js
const value = {
    item: 124
};

expect(value).to.matchPattern(`{
    "item": min(999),
}`);
```

#### `min(limit)`
Specifies the maximum value, where:

- `limit` the maximum allowed value.

```js
const value = {
    item: 124
};

expect(value).to.matchPattern(`{
    "item": max(999),
}`);
```

#### `greater(limit)`
Specifies that the value must be greater than `limit`;

```js
const value = {
    item: 124
};

expect(value).to.matchPattern(`{
    "item": greater(100),
}`);
```

#### `less(limit)`
Specifies that the value must be less than `limit`;

```js
const value = {
    item: 124
};

expect(value).to.matchPattern(`{
    "item": greater(200),
}`);
```

#### `range(start, end)`
Specifies that the value must be between `start` and up to, but not including, `end`. If end is not specified, it's set to `start` with `start` then set to 0. If `start` is greater than `end` the params are swapped to support negative ranges.

```js
const value = {
    item: 37
};

expect(value).to.matchPattern(`{
    "item": range(10, 100),
}`);
```

### `booleans validation`
To validate booleans, you can use JSON format:

```js
const value = {
    test: true,
    test2: false
};

expect(value).to.matchPattern(`{
    "test": true,
    "test2": false,
}`);
```
Additionally you can extend validation capabilities by using methods presented below.

#### `Boolean`
Determines if the value is classified as a boolean primitive or object.

```js
const value = {
    item: true
};

expect(value).to.matchPattern(`{
    "item": Boolean,
}`);
```

#### `truthy`
Determines if the value is truthy.

```js
const value = {
    item: 21
};

expect(value).to.matchPattern(`{
    "item": truthy,
}`);
```

#### `falsy`
Determines if the value is falsy.

```js
const value = {
    item: ''
};

expect(value).to.matchPattern(`{
    "item": falsy,
}`);
```

### `dates validation`
To validate dates, you can use methods presented below.
#### `Date`
Determines if the value is classified as a Date object.

```js
const value = {
    item: new Date
};

expect(value).to.matchPattern(`{
    "item": Date,
}`);
```

#### `dateString`
Determines if the value is parsable into a valid date.

```js
const value = {
    created: 'Dec 25, 1995'
    updated: 'Wed, 09 Aug 1995 00:00:00 GMT'
};

expect(value).to.matchPattern(`{
    created: dateString,
    updated: dateString,
}`);
```


### `other`

#### `Symbol`
Determines if the value is classified as a Symbol primitive or object.

```js
const value = {
    test: Symbol('test')
};

expect(value).to.matchPattern(`{
    "test": Symbol,
}`);
```

#### `any`
Determines if the value matches any data type.

```js
const value = {
    test: 17.5
};

expect(value).to.matchPattern(`{
    "test": any,
}`);
```

#### `null`
Determines if the value is null.

```js
const value = {
    test: null
};

expect(value).to.matchPattern(`{
    "test": null,
}`);
```

#### `NaN`
Determines if the value is NaN.

```js
const value = {
    test: NaN
};

expect(value).to.matchPattern(`{
    "test": NaN,
}`);
```

#### `undefined`
Determines if the value is undefined.

```js
const value = {
    test: undefined
};

expect(value).to.matchPattern(`{
    "test": undefined,
}`);
```

#### `nill`
Determines if the value is null or undefined.

```js
const value = {
    test: null
};

expect(value).to.matchPattern(`{
    "test": nill,
}`);
```

#### `empty`
Determines if the value is an empty object, collection, map, or set.

```js
const value = {
    test: {}
};

expect(value).to.matchPattern(`{
    "test": Object AND empty,
}`);
```

#### `AND/OR logical operators`
`AND` and `OR` along with prentices, allows you to create more complex condtions.

```js
const value = {
    test: 12,
    name: "Mark"
};

expect(value).to.matchPattern(`{
    "test": Number AND ( range(10, 20) OR range(40, 50) ),
    "name": "Mark" OR "Tom"
}`);
```
