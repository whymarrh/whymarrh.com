whymarrh.com
============

This repo contains the source files for [whymarrh.com][1] – plain ol' HTML and CSS, compiled with [Metalsmith][2].

  [1]:https://whymarrh.com
  [2]:http://metalsmith.io

## Build

- Install dependencies by running the usual: `npm install`
- Compile: `node metalsmith.js`
- Build files and watch for changes: `node metalsmith.js --watch`
- To upload site to S3: `npm run deploy`
