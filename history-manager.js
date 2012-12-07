/**
 * @fileoverview Gets and sets the HTML5 History. If support is not available,
 * 		manages via hashtags.
 */

var HistoryManager = {};

/**
 * An array of functions to call when the history changes.
 *
 * @type {Array}
 */
HistoryManager.callbackFunctionArray = [];

/**
 * Sets up the class.
 *
 * @param {Function} callbackFunction a function to fire
 * 		when the "address" changes.
 */
HistoryManager.init = function(callbackFunction) {
	HistoryManager.callbackFunctionArray.push(callbackFunction);
		
	if (window.history && window.history.pushState) {
		window.onpopstate = respondToUrl;
	} else {
		window.onhashchange = respondToUrl;
	}
}

/**
 * Called everytime the history or the url hash changes.
 */
HistoryManager.respondToUrl = function() {
  var value = window.location.hash;
	if (window.location.hash.length < 1) {
		value = window.location.pathname;
	}
	
	for (var i = 0; i < HistoryManager.callbackFunctionArray.length; i++) {
		HistoryManager.callbackFunctionArray[i](value);
	}
}

/**
 * Adds a function that will fire when the url changes.
 *
 * @param {Function} listenerFunction A function that will fire when the url
 *		changes.
 */
HistoryManager.addListenerFunction = function(listenerFunction) {
	HistoryManager.callbackFunctionArray.push(listenerFunction);
}

/**
 * Removes a function that fires when the url changes.
 *
 * @param {Number} functionIteration The iteration in the array of the
 *	functions to remove.
 */
HistoryManager.removeListenerFunction = function(functionIteration) {
	for (var i = 0; i < HistoryManager.callbackFunctionArray.length; i++) {
		if (i == functionIteration) {
			HistoryManager.callbackFunctionArray.splice(i, 1);
		}
	}
}

/**
 * Returns the an array of the url sections after the root.
 *
 * @return an array of the url parts, split at "/".
 */
HistoryManager.getPathArray = function() {
	var url = window.location.hash;
	if (window.location.hash.length < 1) {
		url = window.location.pathname;
	}

	var adArray = url.split("#").join("").split("/");
	adArray.shift();

	return adArray;
}

/**
 * Returns the path, after the root.
 *
 * @return the "path" string.
 */
HistoryManager.getPath = function() {
	var url = window.location.hash;
	if (window.location.hash.length < 1) {
		url = window.location.pathname;
	}

	if (!url) {
		url = "";
	}

	url = url.split("#").join("");

	return url;
}

/**
 * Either adds to the HTML5 history or sets the hash mark,
 * 		depending on browser support.
 *
 * @param {String} path the path to set as the "address".
 */
HistoryManager.setPath = function(path) {
	if (window.history && window.history.pushState) {
	  window.history.pushState(null, null, path);
	  window.onpopstate();
	} else {
	  window.location.hash = "#" + path;
	}
}