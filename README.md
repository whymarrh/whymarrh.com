whymarrh.com
============

The source files for my personal site, [whymarrh.com][1]. The site is simply static content, plain old HTML & CSS, compiled with [Metalsmith][2] (which is really nifty if I may say so).

### Build

Install dependencies by running the usual `npm install`.

To compile:

```bash
$ node metalsmith.js
```

### Aside

The style of JavaScript used in this repository is not indicative of my views on how JavaScript is *properly* written. This is me playing around with the limits of the language, its [ASI][3], and global variables everywhere (all of which are just awful). My personal [style guide][4] outlines how I try to write JavaScript.

  [1]:https://whymarrh.com
  [2]:http://metalsmith.io
  [3]:http://www.ecma-international.org/ecma-262/5.1/#sec-7.9
  [4]:src/style/js.md
