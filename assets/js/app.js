(function() {
    'use strict';
    var app = angular.module('MainController', [
        'ui.router'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
            url: '/home',
            templateUrl: 'content.html'
        });

    });
})();
