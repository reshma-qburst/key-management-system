(function() {
    'use strict';
    var app = angular.module('keyManagement', ['ui.router','mainController']);

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state("home", {
                url: "/",
                controller : "mainController",
                views: {
                  header: {
                    templateUrl: "min_partials/header.html"
                  },
                  left: {
                    templateUrl: "min_partials/leftMenu.html"
                  },
                  content: {
                    templateUrl: "min_partials/content.html"
                  },
                  footer: {
                    templateUrl:"min_partials/footer.html"
                  }
                }
              });
})

})();
