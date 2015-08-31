'use strict';
var REVEAL_CDN = 'https://cdn.jsdelivr.net/reveal.js/3.0.0/';
Reveal.initialize({
	width: 1280,
	height: 720,
	margin: 0.1,

	center: true,
	controls: false,
	help: true,
	history: true,
	overview: false,
	progress: true,
	transition: 'none',
	viewDistance: 1,

	math: {
		mathjax: 'https://cdn.mathjax.org/mathjax/latest/MathJax.js',
		config: 'TeX-AMS_HTML-full'
	},

	dependencies: [{
		src: REVEAL_CDN + 'plugin/math/math.js',
		async: true
	}, {
		src: REVEAL_CDN + 'plugin/highlight/highlight.js',
		async: true,
		callback: function cb() {
			hljs.initHighlightingOnLoad();
		}
	}, {
		src: REVEAL_CDN + 'plugin/notes/notes.js',
		async: true
	}]
});
