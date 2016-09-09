(function() {
    'use strict';
    var app = angular.module('keyManagement', ['ui.router', 'ngTable']);

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
