/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fetch = __webpack_require__(1);

	var _fetch2 = _interopRequireDefault(_fetch);

	var _render = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import {renderArticles, renderFullArticle, renderFullArticles} from './render'
	var state = {
	  articles: [],
	  selectedSource: ""
	};

	// When a user clicks on the correct title
	document.querySelector('body').addEventListener('click', function (event) {
	  if (event.target.matches('h3')) {
	    var _popUp = document.querySelector('#popUp');
	    // Remove the loader class
	    _popUp.classList.toggle('hidden');
	    // Insert the correct article
	    _popUp.classList.remove('loader');
	    // Insert correct article
	    var article = state.articles.find(function (article) {
	      return article.display_title === event.target.innerHTML;
	    });
	    if (state.selectedSource === "Mashable") {
	      document.querySelector('#popUp .container').innerHTML = (0, _render.renderFullArticleMashable)(article);
	    }
	  }

	  if (event.target.matches('.closePopUp')) {
	    popUp.classList.toggle('hidden');
	  }
	  // When a user selects something from the dropdown
	  if (event.target.matches('.navitem')) {
	    // Save what they have selected in the state
	    state.selectedSource = event.target.innerHTML;

	    // Fetch articles from the new source
	    (0, _fetch2.default)(state.selectedSource).then(function (articles) {
	      console.log(articles);
	      state.articles = articles;
	    }).then(function () {
	      var renderedArticles = [];
	      state.articles.forEach(function (article) {
	        var rendered = (0, _render.renderArticle)(state.selectedSource, article);
	        renderedArticles.push(rendered);
	      });
	      document.querySelector('#main').innerHTML = renderedArticles.join('\n');
	    });
	  }
	});

	// PSEUDO Switch source
	// When a user selects something from the dropdown
	// Save what they have selected in the state
	// Fetch articles from the new source
	// Render the articles in our list

	// TODO:
	// Make sure our full article view works with different source.

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = fetchArticles;
	function fetchArticles(selectedSource) {
	  var url = "";
	  var parse = function parse(x) {
	    return x;
	  };

	  console.log(selectedSource);

	  switch (selectedSource) {
	    case 'Mashable':
	      url = "http://mashable.com/stories.json";
	      parse = function parse(data) {
	        return data.hot;
	      };
	      break;

	    case 'Reddit':
	      url = "https://www.reddit.com/top.json";
	      parse = function parse(data) {
	        return data.data.children;
	      };
	      break;

	    case 'Digg':
	    default:
	      url = "http://digg.com/api/news/popular.json";
	      parse = function parse(data) {
	        return data.data.feed;
	      };
	  }

	  return fetch("https://accesscontrolalloworiginall.herokuapp.com/" + url).then(function (res) {
	    return res.json();
	  }).then(parse);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderArticle = renderArticle;
	exports.renderFullArticleMashable = renderFullArticleMashable;
	exports.renderFullArticleReddit = renderFullArticleReddit;
	exports.renderFullArticleDigg = renderFullArticleDigg;
	function renderArticle(selectedSource, article) {
	  var render = function render(x) {
	    return '';
	  };
	  switch (selectedSource) {
	    case 'Mashable':
	      render = function render(article) {
	        return '\n  <article class="article">\n    <section class="featuredImage">\n      <img src="' + article.feature_image + '" alt="" />\n    </section>\n    <section class="articleContent">\n        <a href="#"><h3>' + article.display_title + '</h3></a>\n        <h6>' + article.channel_label + '</h6>\n    </section>\n    <section class="impressions">\n      ' + article.shares.total + '\n    </section>\n    <div class="clearfix"></div>\n  </article>\n      ';
	      };
	      break;

	    case 'Reddit':
	      render = function render(article) {
	        return '\n  <article class="article">\n  <section class="featuredImage">\n  <img src="' + article.data.thumbnail + '" alt="" />\n  </section>\n  <section class="articleContent">\n    <a href="#"><h3>' + article.data.title + '</h3></a>\n    <h6>' + article.data.subreddit + '</h6>\n  </section>\n  <section class="impressions">\n  ' + article.data.ups + '\n  </section>\n  <div class="clearfix"></div>\n  </article>\n  ';
	      };
	      break;

	    case 'Digg':
	    default:
	      render = function render(article) {
	        return '\n  <article class="article">\n  <section class="featuredImage">\n  <img src="' + (article.content.media.images[0].image_url || article.content.media.images[0].url) + '" alt="" />\n  </section>\n  <section class="articleContent">\n    <a href="#"><h3>' + article.content.title + '</h3></a>\n    <h6>' + article.content_type + '</h6>\n  </section>\n  <section class="impressions">\n  ' + article.diggs.count + '\n  </section>\n  <div class="clearfix"></div>\n  </article>\n  ';
	      };
	  }

	  return render(article);
	}

	function renderFullArticleMashable(article) {
	  return '\n<h1>' + article.display_title + '</h1>\n<p>\n  ' + article.content.plain + '\n</p>\n<a href="' + article.link + '" class="popUpAction" target="_blank">Read more from source</a>\n  ';
	}

	function renderFullArticleReddit(article) {
	  return '\n<h1>' + article.display_title + '</h1>\n<p>\n  ' + article.content.plain + '\n</p>\n<a href="' + article.link + '" class="popUpAction" target="_blank">Read more from source</a>\n  ';
	}

	function renderFullArticleDigg(article) {
	  return '\n<h1>' + article.display_title + '</h1>\n<p>\n  ' + article.content.plain + '\n</p>\n<a href="' + article.link + '" class="popUpAction" target="_blank">Read more from source</a>\n  ';
	}

	// export function renderFullArticleMashable (article) {
	//   return`
	// <h1>${article.display_title}</h1>
	// <p>
	//   ${article.content.plain}
	// </p>
	// <a href="${article.link}" class="popUpAction" target="_blank">Read more from source</a>
	//   `
	// }
	//
	// export function renderFullArticleMashable (article) {
	//   return`
	// <h1>${article.display_title}</h1>
	// <p>
	//   ${article.content.plain}
	// </p>
	// <a href="${article.link}" class="popUpAction" target="_blank">Read more from source</a>
	//   `
	// }

/***/ }
/******/ ]);