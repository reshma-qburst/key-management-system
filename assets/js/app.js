(function() {
    'use strict';
    var app = angular.module('keyManagement', ['ui.router','mainController']);

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
.state('home', {
    url: "/",
    views: {
      'header': {
        template:'min_partials/header.html'
      },
      'content': {
        template:'min_partials/content.html'
      },
      'footer': {
        template:'min_partials/footer.html'
      }
    },
          resolve: {
            test: function(){
              console.log("test")
            }
          }
  })
  .state('home.one', {
    template:'sup'
  })
  .state('home.two', {
    template:'22'
  })
})
.run(function($state) {
  $state.go('home.one');
})

})();
