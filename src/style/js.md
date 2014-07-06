---
template: style-guide.html
---

JavaScript Style Guide
======================

This document outlines my personal style for writing in JavaScript.

TL;DR: Use tabs, double quotes, semicolons, and put braces around *everything*.

Contents
--------

Important stuff:

1. [Whitespace](#whitespace)
1. [Semicolons](#semicolons)

Other stuff:

1. [Arrays](#arrays)
1. [Blocks](#blocks)
1. [Casting and coercion](#casting-and-coercion)
1. [Comments](#comments)
1. [Conditionals](#conditionals)
1. [Functions](#functions)
1. [Modules and files](#modules-and-files)
1. [Naming conventions](#naming-conventions)
1. [Objects](#objects)
1. [Properties](#properties)
1. [Strings](#strings)
1. [Variables](#variables)

Whitespace
----------

1. Tabs vs. spaces? Use tabs for indentaion, spaces for alignment
1. Place 1 space before the leading brace
1. Place 1 space between function arguments
1. Set off operators with spaces (unless you&rsquo;re an animal)
1. Add a trailing newline to the end of each file
1. Don&rsquo; have more than one empty line in succession

One of the better examples I can think of regarding tabs and spaces:

```js
if (
	   a == b
	&& c == d
	&& e == f
	&& g == h
) {
	something = false;
}
```

More examples:

```js
// Bad
var x = 3*(2-4);

// Good
var x = 3 * (2 - 4);

// Bad
var zero = Math.pow(Math.E,(i*Math.PI))+1;

// Good
var zero = Math.pow(Math.E, (i * Math.PI)) + 1;
```

Semicolons
----------

1. Use them. Always.

Arrays
------

1. Use the literal syntax for array declaration
1. Prefer `arr.push()` to `arr[arr.length]`

Blocks
------

1. Always. Use. Braces.

Example:

```js
// Bad
if (something)
	stuff();

// Good
if (something) {
	stuff();
}
```

See also: [whitespace](#whitespace).

Casting and coercion
--------------------

TODO.

Comments
--------

1. Use `//` for single line comments
1. Place single space between the forward slashes and the following text

Example:

```js
//Bad
// Good
```

See also: [whitespace](#whitespace).

Conditionals
------------

1. Don&rsquo;t use `===` just for the sake of it
1. Use shortcuts liberally (e.g. `if (x)` instead of `if (x != '')`)
1. `if` is not a function call, put space between the `if` keyword and parentheses

Example:

```js
// Bad
if(foo){
	go();
}

// Good
if (foo) {
	go();
}
```

See also: [whitespace](#whitespace).

Functions
---------

1. Prefer function expressions to function declarations
1. Prefer named functions expressions to anonymous function expressions

Example:

```js
// Good
var foo = function foo() {
	return stuff;
};
```

Modules and files
-----------------

1. Always declare `"use strict";` at the top of a module or file

Naming conventions
------------------

1. Use camelCase when naming objects, functions, and instances
1. Use PascalCase when naming constructors or classes
1. Use a leading underscore `_` when naming private properties
1. When saving a reference to `this` use `self`

```js
// Bad
var OBJEcttsssss = {};
var this_is_my_object = {};
var u = new user({
	"name": "Bob Parr"
});

// Good
var thisIsMyObject = {};
var user = new User({
	"name": "Bob Parr"
});

// Bad
this.__firstName__ = "Panda";
this.firstName_ = "Panda";

// Good
this._firstName = "Panda";
```

See also: [whitespace](#whitespace) and [functions](#functions).

Objects
-------

1. Use the literal syntax for object declaration,
1. Quote keys as string.

Example:

```js
// Bad
var item = new Object();

// Good
var item = {
	"delete": 3,
	"foo": "bar",
	"bar": "baz"
};
```

Properties
----------

1. Prefer dot notation when accessing properties
1. Use subscript notation `[]` when accessing properties with a variable

Example:

```js
// Bad
var bar = foo["bar"];

// Good
var bar = foo.bar;
```

Strings
-------

1. Use double quotes

Example:

```js
// Bad
var s = 'foo bar';

// Good
var s = "foo bar";
```

Variable declarations
---------------------

1. Declare one variable per line, using the `var` keyword each time.

Example:

```js
var foo = '3';
var bar = 'a';
var baz = {
	"qux": [2, 1, 1]
};
```
