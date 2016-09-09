(function() {
    'use strict';
    var app = angular.module('keyManagement', ['ui.router', 'ngTable']);

    angular.module('keyManagement', ['ui.router', 'ngTable']).config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
            url: '/home',
            templateUrl: 'min_partials/content.html'
        });

    });
})();
