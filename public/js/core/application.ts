///<reference path="../../../typings/tsd.d.ts" />

((): void => {
    'use strict';

    Parse.initialize("Mw0dWtJQYVzYlA4vHybSNmuyLJSjzpEpTarhZMEQ", "gXEJhvTtHQcSNrryJ7u9IK4euVWOu00QEGnaK7ow");

    angular.module('services', []);
    angular.module('controllers', []);
    angular.module('filters', []);
    angular.module('directives', []);

    var modules = ['services', 'controllers', 'filters', 'directives', 'ngRoute', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngTweets'];

    angular.module('app', modules);

})();